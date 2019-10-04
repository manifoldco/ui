import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Resource } from '../../types/graphql';
import { resource } from '../../spec/mock/graphql';
import { ManifoldResourcePlan } from './manifold-resource-plan';

describe('<manifold-resource-product>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceProductElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourcePlan],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-plan');
  });

  it('Renders a skeleton if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    expect(element).toEqualHtml(`
      <manifold-resource-plan>
        <manifold-plan-details data-test-loading="true"></manifold-plan-details>
      </manifold-resource-plan>
    `);
  });

  it('Renders a product card if not loading', async () => {
    element.loading = false;
    element.gqlData = resource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    expect(element).toEqualHtml(`
     <manifold-resource-plan>
       <manifold-plan-details data-test-loading="false" data-test-plan-label="quaco"></manifold-plan-details>
     </manifold-resource-plan>
    `);
  });
});
