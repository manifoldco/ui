import fetchMock from 'fetch-mock';
import { newSpecPage } from '@stencil/core/testing';
import { ManifoldDataResizeButton } from './manifold-data-resize-button';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { resource } from '../../spec/mock/graphql';

interface Props {
  planId?: string;
  resourceLabel?: string;
  resourceId?: string;
}

const graphqlEndpoint = 'http://test.com/graphql';

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldDataResizeButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-resize-button');
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
  component.planId = props.planId;
  component.resourceLabel = props.resourceLabel;
  component.resourceId = props.resourceId;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-resize-button>', () => {
  beforeEach(async () => {
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      const { variables } = JSON.parse(body);
      // return id in response
      const newResource = {
        ...resource,
        id: variables.resourceId || resource.id,
      };
      const errors: GraphqlError[] = [{ message: 'something went wrong' }];
      if (body.includes('mutation ResourceChangePlan')) {
        return body.includes('error')
          ? { data: null, errors }
          : { data: { updateResourcePlan: { data: newResource } } };
      }
      if (body.includes('query RESOURCE_ID')) {
        return body.includes('error') ? { data: null, errors } : { data: newResource };
      }
      return { data: null, errors };
    });
  });

  afterEach(() => fetchMock.restore());

  describe('v0 props', () => {
    it('[resource-label]: fetches ID', async () => {
      await setup({ resourceLabel: 'my-resource' });
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });
  });

  describe('v0 events', () => {
    it('click', async () => {
      const planId = 'plan-id';
      const resourceLabel = 'click-resource-label';
      const resourceId = 'click-resource-id';

      const { page } = await setup({ planId, resourceId, resourceLabel });
      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      const mockClick = jest.fn();
      page.doc.addEventListener('manifold-resizeButton-click', mockClick);
      button.click();
      await page.waitForChanges();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            planId,
            resourceLabel,
            resourceId,
          },
        })
      );
    });

    it('error', async () => {
      const planId = 'plan-id';
      const resourceLabel = 'error-resource-label';
      const resourceId = 'error-resource-id';

      const { page } = await setup({ planId, resourceId, resourceLabel });
      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      const mockClick = jest.fn();
      page.doc.addEventListener('manifold-resizeButton-error', mockClick);
      button.click();
      await page.waitForChanges();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message: 'something went wrong',
            planId,
            resourceId,
            resourceLabel,
          },
        })
      );
    });

    it('success', async () => {
      const planId = 'plan-id';
      const resourceLabel = 'success-resource-label';
      const resourceId = 'success-resource-id';

      const { page } = await setup({ planId, resourceId, resourceLabel });
      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      const mockClick = jest.fn();
      page.doc.addEventListener('manifold-resizeButton-success', mockClick);
      button.click();
      await page.waitForChanges();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message: `${resource.label} successfully updated to ${planId}`,
            planId,
            resourceId,
            resourceLabel: resource.label, // we’re mocking the response here so it’ll be different
          },
        })
      );
    });
  });
});
