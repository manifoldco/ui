import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ResourceWithOwnerQuery } from '../../types/graphql';
import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldResourceCredentials } from './manifold-resource-credentials';
import { ManifoldCredentials } from '../manifold-credentials/manifold-credentials';
import { ManifoldCredentialsView } from '../manifold-credentials-view/manifold-credentials-view';

global.setTimeout = jest.fn();

interface Props {
  gqlData?: ResourceWithOwnerQuery['resource'];
  loading?: boolean;
  ownerId?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldResourceCredentials, ManifoldCredentials, ManifoldCredentialsView],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-resource-credentials');
  component.gqlData = props.gqlData;
  component.loading = props.loading;
  component.ownerId = props.ownerId;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-resource-credentials>', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
    fetchMock.mock('begin:https://api.manifold.co', 200);
  });

  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[loading]: renders spinner', async () => {
      const { page } = await setup({ loading: true });
      const credentials = page.root && page.root.querySelector('manifold-credentials-view');
      const spinner =
        credentials &&
        credentials.shadowRoot &&
        credentials.shadowRoot.querySelector('[data-testid="spinner"]');
      expect(spinner).not.toBeNull();
    });

    it('[gqlData]: button not disabled if present', async () => {
      const { page } = await setup({ gqlData: resource as ResourceWithOwnerQuery['resource'] });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).toBeNull();
    });

    it('[owner-id]: passes to child', async () => {
      const { page } = await setup({
        gqlData: resource as ResourceWithOwnerQuery['resource'],
        loading: false,
        ownerId: 'my-owner-id',
      });
      const credentials = page.root && page.root.querySelector('manifold-credentials');
      expect(credentials && credentials.ownerId).toBe('my-owner-id');
    });
  });
});
