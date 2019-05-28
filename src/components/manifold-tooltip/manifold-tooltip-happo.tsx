import { lock } from '@manifoldco/icons';

import toHTML from '../../../test-utils/to-html';

export const primary = () => {
  const content = `
    <manifold-tooltip labelText="This is a tooltip">
      <span class="value" data-value="42" data-locked>
        <manifold-icon class="icon" icon="${lock}" marginRight></manifold-icon>
        42
      </span>
  `;

  document.body.appendChild(toHTML(content));
};
