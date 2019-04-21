import { Component, Prop } from '@stencil/core';

import { categories, formatCategoryLabel, categoryIcon } from '../../utils/marketplace';
import Tunnel, { State } from '../../data/marketplace';

@Component({ tag: 'manifold-sorted-categories' })
export class ManifoldSortedCategories {
  @Prop() observeCategory: (el?: HTMLElement) => void = () => {};

  render() {
    return (
      <Tunnel.Consumer>
        {(state: State) => {
          const categoryMap = categories(state.services);
          const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));
          const nonEmptyCategories = sortedCategories.filter(category =>
            state.hideCustom ? categoryMap[category].length : true
          );
          return (
            <div>
              {nonEmptyCategories.map(tag => (
                <manifold-service-category
                  categoryLoaded={this.observeCategory}
                  icon={categoryIcon[tag]}
                  name={tag}
                  label={formatCategoryLabel(tag)}
                >
                  <manifold-marketplace-results
                    services={categoryMap[tag]}
                    featured={state.featured}
                    linkFormat={state.linkFormat}
                  >
                    {!state.hideCustom && (
                      <manifold-template-card
                        slot="custom-card"
                        linkFormat={state.linkFormat}
                        category={tag}
                      />
                    )}
                  </manifold-marketplace-results>
                </manifold-service-category>
              ))}
            </div>
          );
        }}
      </Tunnel.Consumer>
    );
  }
}
