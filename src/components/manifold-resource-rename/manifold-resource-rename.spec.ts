import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Resource } from '../../types/graphql';
import { resource } from '../../spec/mock/graphql';
import { ManifoldResourceRename } from './manifold-resource-rename';
import { ManifoldDataRenameButton } from '../manifold-data-rename-button/manifold-data-rename-button';

describe('<manifold-resource-rename>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceRenameElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourceRename, ManifoldDataRenameButton],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-rename');
  });

  it('Renders a skeleton if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const button = element.querySelector('manifold-data-rename-button');
    expect(button).toBeDefined();

    if (button) {
      expect(button.loading).toBeTruthy();
    }
  });

  it('Renders if not loading', async () => {
    element.loading = false;
    element.gqlData = resource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    const button = element.querySelector('manifold-data-rename-button');
    expect(button).toBeDefined();

    if (button) {
      expect(button.loading).toBeFalsy();
      expect(button.resourceId).toEqual(resource.id);
      expect(button.resourceLabel).toEqual(resource.label);
    }
  });
});
