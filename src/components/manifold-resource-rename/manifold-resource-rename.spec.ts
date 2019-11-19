import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { GetResourceQuery } from '../../types/graphql';
import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldResourceRename } from './manifold-resource-rename';
import { ManifoldDataRenameButton } from '../manifold-data-rename-button/manifold-data-rename-button';

interface Props {
  disabled?: boolean;
  gqlData?: GetResourceQuery['resource'];
  loading?: boolean;
  newLabel?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldResourceRename, ManifoldDataRenameButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-resource-rename');
  component.disabled = props.disabled;
  component.gqlData = props.gqlData;
  component.loading = props.loading;
  component.newLabel = props.newLabel;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-resource-rename>', () => {
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

    it('[gqlData]: button disabled if missing', async () => {
      const { page } = await setup({});
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[loading]: button disabled ', async () => {
      const { page } = await setup({ loading: true });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[newLabel]: button not disabled if present', async () => {
      const { page } = await setup({
        newLabel: 'my-new-resource',
        gqlData: resource as GetResourceQuery['resource'],
      });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).toBeNull();
    });
  });
});
