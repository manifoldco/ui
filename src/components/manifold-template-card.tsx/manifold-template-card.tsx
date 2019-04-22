import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { categoryIcon } from '../../utils/marketplace';
import serviceTemplates from '../../data/templates';

interface EventDetail {
  category: string;
}

@Component({
  tag: 'manifold-template-card',
  styleUrl: 'manifold-template-card.css',
  shadow: true,
})
export class ManifoldTemplateCard {
  @Event({ eventName: 'manifold-template-click', bubbles: true }) templateClick: EventEmitter;
  @Prop() category: string;
  @Prop() linkFormat?: string;

  get formattedLink(): string {
    if (this.linkFormat !== 'string') return '';
    return this.linkFormat.replace(/:product/gi, this.category);
  }

  onClick = (e: Event): void => {
    if (!this.linkFormat) {
      e.preventDefault();
      const detail: EventDetail = { category: this.category };
      this.templateClick.emit(detail);
    }
  };

  get templates() {
    return serviceTemplates.filter(({ category }) => category === this.category);
  }

  render() {
    if (this.templates.length === 0) {
      return null;
    }

    return (
      <a
        class="wrapper"
        role="button"
        itemscope
        itemtype="https://schema.org/Product"
        itemprop="url"
        href={this.formattedLink}
        onClick={this.onClick}
      >
        <h4 class="heading">
          <manifold-icon icon={categoryIcon[this.category] || categoryIcon.uncategorized} />
          Use any external account
        </h4>
        <p class="body">
          <span>Choose a configuration template</span>
          <div class="service-list-container">
            <ul class="service-list">
              {this.templates.map(({ image, name }) => (
                <li>
                  <img src={image} alt={name} />
                </li>
              ))}
            </ul>
          </div>
        </p>
      </a>
    );
  }
}
