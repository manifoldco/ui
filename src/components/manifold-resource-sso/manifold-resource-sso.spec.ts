import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Resource } from '../../types/graphql';
import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldResourceSso } from './manifold-resource-sso';
import { ManifoldDataSsoButton } from '../manifold-data-sso-button/manifold-data-sso-button';

describe('<manifold-resource-sso>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceSsoElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourceSso, ManifoldDataSsoButton],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-sso');
  });

  it('Renders a loading button if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const button = element.querySelector('manifold-data-sso-button');
    expect(button).toBeDefined();

    if (button) {
      expect(button.loading).toBeTruthy();
    }
  });

  it('Renders a complete button if not loading', async () => {
    element.loading = false;
    element.gqlData = resource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const button = element.querySelector('manifold-data-sso-button');
    expect(button).toBeDefined();

    if (button) {
      expect(button.loading).toBeFalsy();
      expect(button.resourceId).toEqual(resource.id);
      expect(button.resourceLabel).toEqual(resource.label);
    }
  });
});
