import { FunctionalComponent } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { themeIcons } from '../../assets/icons';
import { categories, formatCategoryLabel } from './utils';

interface CategoriesProps {
  observeCategory: (el?: HTMLElement) => void;
  serviceLink?: string;
  featured?: string;
}

export const Categories: FunctionalComponent<CategoriesProps> = ({
  observeCategory,
  featured,
  serviceLink,
}) => (
  <Tunnel.Consumer>
    {(state: State) => {
      const categoryMap = categories(state.services);
      const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));
      return (
        <div>
          {sortedCategories.map(tag => (
            <div class="category-container">
              <h3 class="category" id={`category-${tag}`} ref={observeCategory}>
                <mf-icon icon={themeIcons[tag]} marginRight />
                {formatCategoryLabel(tag)}
              </h3>
              <marketplace-results
                services={categoryMap[tag]}
                featured={featured}
                service-link={serviceLink}
              >
                <service-card
                  description={`Add your own ${formatCategoryLabel(tag)} service`}
                  label={'bring-your-own'}
                  logo={themeIcons[tag]}
                  name={`Bring your own ${formatCategoryLabel(tag)} service`}
                  is-custom={true}
                  is-featured={false}
                  slot="custom-card"
                />
              </marketplace-results>
            </div>
          ))}
        </div>
      );
    }}
  </Tunnel.Consumer>
);
