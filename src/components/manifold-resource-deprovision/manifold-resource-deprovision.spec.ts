import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Resource } from '../../types/graphql';
import resource from '../../spec/mock/graphql/resource';
import { ManifoldResourceDeprovision } from './manifold-resource-deprovision';
import { ManifoldDataDeprovisionButton } from '../manifold-data-deprovision-button/manifold-data-deprovision-button';

describe('<manifold-resource-deprovision>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceDeprovisionElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourceDeprovision, ManifoldDataDeprovisionButton],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-deprovision');
  });

  it('Renders a skeleton if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const button = element.querySelector('manifold-data-deprovision-button');
    expect(button).toBeDefined();

    if (button) {
      expect(button.loading).toBeTruthy();
    }
  });

  it('Renders a product card if not loading', async () => {
    element.loading = false;
    element.gqlData = resource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const button = element.querySelector('manifold-data-deprovision-button');
    expect(button).toBeDefined();

    if (button) {
      expect(button.loading).toBeFalsy();
      expect(button.resourceId).toEqual(resource.id);
      expect(button.resourceLabel).toEqual(resource.label);
    }
  });
});
