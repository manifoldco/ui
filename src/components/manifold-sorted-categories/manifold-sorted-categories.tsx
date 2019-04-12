import { Component, Prop } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { themeIcons } from '../../assets/icons';
import { categories, formatCategoryLabel, customCardExcludeList } from '../../utils/marketplace';

type Observer = (el?: HTMLElement) => void;
const noop: Observer = () => {};

@Component({ tag: 'manifold-sorted-categories' })
export class ManifoldSortedCategories {
  @Prop() observeCategory: Observer = noop;

  render() {
    return (
      <Tunnel.Consumer>
        {(state: State) => {
          const categoryMap = categories(state.services);
          const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));
          return (
            <div>
              {sortedCategories.map(tag => (
                <manifold-service-category
                  categoryLoaded={this.observeCategory}
                  icon={themeIcons[tag]}
                  name={tag}
                  label={formatCategoryLabel(tag)}
                >
                  <manifold-marketplace-results
                    services={categoryMap[tag]}
                    featured={state.featured}
                    serviceLink={state.serviceLink}
                  >
                    {!customCardExcludeList.includes(tag) && (
                      <manifold-service-card
                        description={`Add your own ${formatCategoryLabel(tag)} service`}
                        isCustom={true}
                        isFeatured={false}
                        label={'bring-your-own'}
                        logo={themeIcons[tag]}
                        name={`Bring your own ${formatCategoryLabel(tag)} service`}
                        slot="custom-card"
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
