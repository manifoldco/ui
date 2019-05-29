import { lock } from '@manifoldco/icons';

import toHTML from '../../../test-utils/to-html';

export const primary = () => {
  const content = `
    <manifold-tooltip label-text="This is a tooltip">
      <span class="value" data-value="42" data-locked>
        <manifold-icon class="icon" icon="${lock}" margin-right></manifold-icon>
        42
      </span>
  `;

  const tooltip = toHTML(content) as HTMLManifoldTooltipElement;
  document.body.appendChild(tooltip);

  return tooltip.componentOnReady();
};
