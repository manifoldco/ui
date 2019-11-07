import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource } from '../../types/graphql';
import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldResourceCredentials } from './manifold-resource-credentials';
import { ManifoldCredentials } from '../manifold-credentials/manifold-credentials';
import { ManifoldCredentialsView } from '../manifold-credentials-view/manifold-credentials-view';

global.setTimeout = jest.fn();
fetchMock.mock('begin:https://analytics.manifold.co', 200);

describe('<manifold-resource-credentials>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceCredentialsElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourceCredentials, ManifoldCredentials, ManifoldCredentialsView],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-credentials');
  });

  it('Renders a skeleton if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const view = element.querySelector('manifold-credentials-view');
    expect(view).toBeDefined();

    if (view && view.shadowRoot) {
      expect(view.shadowRoot.querySelector('span[class="spin"]')).toBeDefined();
    }
  });

  it('Renders a product card if not loading', async () => {
    element.loading = false;
    element.gqlData = resource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const view = element.querySelector('manifold-credentials-view');
    expect(view).toBeDefined();

    if (view && view.shadowRoot) {
      expect(view.shadowRoot.querySelector('manifold-button[color="black"]')).toEqualText(
        'Show credentials'
      );
    }
  });
});
