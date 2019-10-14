import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataDeprovisionButton } from './manifold-data-deprovision-button';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import resource from '../../spec/mock/elegant-cms/resource';

interface Props {
  resourceId?: string;
  resourceLabel?: string;
}

const graphqlEndpoint = 'http://test.com/graphql';

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldDataDeprovisionButton],
    html: '<div></div>',
  });
  const component = page.doc.createElement('manifold-data-deprovision-button');
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });
  component.resourceId = props.resourceId;
  component.resourceLabel = props.resourceLabel;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-deprovision-button>', () => {
  beforeEach(async () => {
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      const { variables } = JSON.parse(body);
      const errors: GraphqlError[] = [{ message: 'something went wrong' }];
      if (body.includes('mutation DeleteResource')) {
        // return new label in response
        const newResource = {
          ...resource,
          id: variables.resourceId || resource.id,
        };
        return body.includes('error')
          ? { data: null, errors }
          : { data: { deleteResource: { data: newResource } } };
      }
      if (body.includes('query RESOURCE_ID')) {
        return body.includes('error') ? { data: null, errors } : { data: resource };
      }
      return { data: null, errors };
    });
  });

  afterEach(() => fetchMock.restore());

  describe('v0 props', () => {
    it('[resource-label]: fetches ID', async () => {
      await setup({ resourceLabel: 'resource-label' });
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });

    it('[resource-id]: doesn’t fetch ID if set', async () => {
      await setup({ resourceId: 'resource-id', resourceLabel: 'resource-label' });
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(false);
    });
  });

  describe('v0 events', () => {
    it('click', async () => {
      const resourceLabel = 'click-label';

      const { page } = await setup({ resourceId: resource.id, resourceLabel });
      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      const mockClick = jest.fn();
      page.doc.addEventListener('manifold-deprovisionButton-click', mockClick);
      button.click();
      await page.waitForChanges();

      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            resourceLabel,
            resourceId: resource.id,
          },
        })
      );
    });

    it('error', async () => {
      const resourceId = 'error-id';
      const resourceLabel = 'error-label';

      const { page } = await setup({ resourceId, resourceLabel });
      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const mockClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        mockClick.mockImplementation(() => resolve());
        page.doc.addEventListener('manifold-deprovisionButton-error', mockClick);
        button.click();
      });

      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
      expect(mockClick).toHaveBeenCalledWith(
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
      const resourceId = 'success-id';
      const { page } = await setup({ resourceId, resourceLabel: 'success-label' });
      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const mockClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        mockClick.mockImplementation(() => resolve());
        page.doc.addEventListener('manifold-deprovisionButton-success', mockClick);
        button.click();
      });

      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: `${resource.label} successfully deleted`,
            resourceLabel: resource.label,
            resourceId,
          },
        })
      );
    });
  });
});
