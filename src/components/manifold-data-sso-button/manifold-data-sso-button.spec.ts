import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataSsoButton } from './manifold-data-sso-button';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';

const graphqlEndpoint = 'http://test.com/graphql';
const resourceSSOUrl = 'https://test.com/sso';

interface Props {
  loading?: boolean;
  resourceId?: string;
  resourceLabel?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldDataSsoButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-sso-button');
  component.loading = props.loading;
  component.resourceLabel = props.resourceLabel;
  component.resourceId = props.resourceId;
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-sso-button>', () => {
  beforeEach(() =>
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      const { variables } = JSON.parse(body);
      const errors: GraphqlError[] = [{ message: 'something went wrong' }];
      return body.includes('error')
        ? { data: null, errors }
        : {
            data: {
              resource: {
                id: variables.resourceId,
                label: variables.resourceLabel,
                ssoUrl: resourceSSOUrl,
              },
            },
          };
    })
  );
  afterEach(() => fetchMock.restore());

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
            resourceLabel,
            resourceId,
            redirectUrl: resourceSSOUrl,
          },
        })
      );
    });
  });
});
