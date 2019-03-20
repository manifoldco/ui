import { Component, Prop } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { themeIcons } from '../../assets/icons';
import { categories, formatCategoryLabel } from '../../utils/marketplace';

@Component({ tag: 'sorted-categories' })
export class Categories {
  @Prop() observeCategory: (el?: HTMLElement) => void;

  render() {
    return (
      <Tunnel.Consumer>
        {(state: State) => {
          const categoryMap = categories(state.services);
          const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));
          return (
            <div>
              {sortedCategories.map(tag => (
                <service-category
                  categoryLoaded={this.observeCategory}
                  icon={themeIcons[tag]}
                  name={tag}
                  label={formatCategoryLabel(tag)}
                >
                  <marketplace-results
                    services={categoryMap[tag]}
                    featured={state.featured}
                    service-link={state.serviceLink}
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
                </service-category>
              ))}
            </div>
          );
        }}
      </Tunnel.Consumer>
    );
  }
}
