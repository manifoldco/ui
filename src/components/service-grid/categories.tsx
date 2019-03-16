import { Component, Prop, Element, Watch } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { themeIcons } from '../../assets/icons';
import { categories, formatCategoryLabel } from './utils';

@Component({ tag: 'sorted-categories', shadow: false })
export class Categories {
  @Element() root: HTMLElement;
  @Prop() observeCategory: (el?: HTMLElement) => void;
  @Prop() activeCategory?: string;

  componentDidLoad() {
    if (this.activeCategory && this.root.shadowRoot) {
      const heading = this.root.shadowRoot.querySelector(`#category-${this.activeCategory}`);

      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  render() {
    return (
      <Tunnel.Consumer>
        {(state: State) => {
          const categoryMap = categories(state.services);
          const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));
          return (
            <div>
              {sortedCategories.map(tag => (
                <div class="category-container">
                  <h3 class="category" id={`category-${tag}`} ref={this.observeCategory}>
                    <mf-icon icon={themeIcons[tag]} marginRight />
                    {formatCategoryLabel(tag)}
                  </h3>
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
                </div>
              ))}
            </div>
          );
        }}
      </Tunnel.Consumer>
    );
  }
}
