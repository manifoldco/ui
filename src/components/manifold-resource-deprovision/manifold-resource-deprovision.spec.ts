import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { GetResourceQuery } from '../../types/graphql';
import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldResourceDeprovision } from './manifold-resource-deprovision';
import { ManifoldDataDeprovisionButton } from '../manifold-data-deprovision-button/manifold-data-deprovision-button';

interface Props {
  disabled?: boolean;
  gqlData?: GetResourceQuery['resource'];
  loading?: boolean;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldResourceDeprovision, ManifoldDataDeprovisionButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-resource-deprovision');
  component.disabled = props.disabled;
  component.gqlData = props.gqlData;
  component.loading = props.loading;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-resource-deprovision>', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
    fetchMock.mock('begin:https://api.manifold.co', 200);
  });

  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[disabled]: disables button', async () => {
      const { page } = await setup({ disabled: true });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[loading]: disables button', async () => {
      const { page } = await setup({ loading: true });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[gqlData]: button disabled if missing', async () => {
      const { page } = await setup({});
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[gqlData]: button not disabled if present', async () => {
      const { page } = await setup({ gqlData: resource as GetResourceQuery['resource'] });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).toBeNull();
    });
  });
});
