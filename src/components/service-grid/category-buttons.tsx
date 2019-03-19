import { FunctionalComponent } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { categories, formatCategoryLabel } from './utils';

interface CategoryButtonsProps {
  activeCategory?: string;
  categoryClick: (e?: Event) => void;
}

export const CategoryButtons: FunctionalComponent<CategoryButtonsProps> = ({
  categoryClick,
  activeCategory,
}) => (
  <Tunnel.Consumer>
    {(state: State) => {
      const categoryMap = categories(state.services);
      const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));
      return (
        <div class="category-buttons">
          {sortedCategories.map(tag => (
            <button
              class={`category-button${activeCategory === tag ? ' is-active' : ''}`}
              onClick={categoryClick}
              data-category={tag}
            >
              {formatCategoryLabel(tag)}
            </button>
          ))}
        </div>
      );
    }}
  </Tunnel.Consumer>
);
