import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataSsoButton } from './manifold-data-sso-button';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { ResourceSsoByIdQuery } from '../../types/graphql';

const graphqlEndpoint = 'http://test.com/graphql';
const resourceSSOUrl = 'https://test.com/sso';

interface Props {
  disabled?: boolean;
  loading?: boolean;
  ownerId?: string;
  resourceId?: string;
  resourceLabel?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldDataSsoButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-sso-button');
  component.disabled = props.disabled;
  component.loading = props.loading;
  component.ownerId = props.ownerId;
  component.resourceId = props.resourceId;
  component.resourceLabel = props.resourceLabel;
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-sso-button>', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      const { variables } = JSON.parse(body);
      const errors: GraphqlError[] = [{ message: 'something went wrong' }];
      if (body.includes('error')) {
        return { data: null, errors };
      }
      const data: ResourceSsoByIdQuery = {
        resource: {
          id: variables.resourceId,
          label: variables.resourceLabel,
          ssoUrl: resourceSSOUrl,
        },
      };
      return { data };
    });
  });
  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[loading]: disables button if true', async () => {
      const resourceLabel = 'loading-label';
      const resourceId = 'loading-id';
      const { page } = await setup({ resourceLabel, resourceId, loading: true });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[loading]: button isn’t disabled if not set', async () => {
      const resourceLabel = 'loading-label';
      const resourceId = 'loading-id';
      const { page } = await setup({ resourceLabel, resourceId });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).toBeNull();
    });

    it('[owner-id]: uses if passed', async () => {
      const { page } = await setup({
        resourceLabel: 'my-resource',
        resourceId: 'my-resource-id',
        ownerId: 'my-owner-id',
      });

      // simulate button click
      const button = page.root && page.root.querySelector('button');
      if (button) {
        button.click();
      }
      await page.waitForChanges();

      const [[_, firstRequest]] = fetchMock.calls();
      const body = JSON.parse(`${firstRequest && firstRequest.body}`);
      const { variables } = body;

      expect(variables.owner).toBe('my-owner-id');
    });
  });

  describe('v0 events', () => {
    it('click', async () => {
      const resourceLabel = 'resource-click-label';
      const resourceId = 'resource-click-id';
      const { page } = await setup({ resourceLabel, resourceId });
      if (!page.root) {
        throw new Error('<manifold-sso-button> not found in document');
      }

      const onClick = jest.fn();
      page.doc.addEventListener('manifold-ssoButton-click', onClick);

      const button = page.root && page.root.querySelector('button');
      if (button) {
        button.click();
      }
      await page.waitForChanges();

      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { resourceLabel, resourceId },
        })
      );
    });

    it('error', async () => {
      const resourceId = 'resource-error-id';
      const resourceLabel = 'resource-error-label';
      const { page } = await setup({ resourceId, resourceLabel });

      const onError = jest.fn();
      page.doc.addEventListener('manifold-ssoButton-error', onError);

      const button = page.root && page.root.querySelector('button');
      if (button) {
        button.click();
      }
      await page.waitForChanges();

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: 'something went wrong',
            resourceLabel,
            resourceId,
          },
        })
      );
    });

    it('success', async () => {
      const resourceId = 'resource-success-id';
      const resourceLabel = 'resource-success-label';

      const { page } = await setup({ resourceId, resourceLabel });

      const onSuccess = jest.fn();
      page.doc.addEventListener('manifold-ssoButton-success', onSuccess);

      const button = page.root && page.root.querySelector('button');
      if (button) {
        button.click();
      }
      await page.waitForChanges();

      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: `${resourceLabel} successfully authenticated`,
            resourceLabel: undefined, // we queried by ID (ID takes priority) so don’t know the label
            resourceId,
            redirectUrl: resourceSSOUrl,
          },
        })
      );
    });
  });
});
