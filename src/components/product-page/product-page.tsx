import { Component, Prop, State } from '@stencil/core';
import { Plan } from 'types/Plan';
import { Product } from 'types/Product';
import { Provider } from 'types/Provider';

@Component({
  tag: 'product-page',
  styleUrl: 'product-page.css',
  shadow: true,
})
export class ProductPage {
  @Prop() label: string;
  @State() plans?: Plan[];
  @State() product?: Product;
  @State() provider?: Provider;

  componentWillLoad() {
    return fetch(`https://api.catalog.manifold.co/v1/products?label=${this.label}`)
      .then(response => response.json())
      .then(data => {
        this.product = { ...data[0] };
      });
  }

  renderSidebar = () => {
    const { name, logo_url, tags, support_email, documentation_url } = this.product.body;

    return (
      <aside class="sidebar">
        <div class="sidebar-inner">
          <featured-service name={name} logo={logo_url} backgroundColor="#003b6e">
            {/* TODO get provider name */}
          </featured-service>
          {tags && (
            <div class="sidebar-section">
              {tags.map(tag => (
                <div class="category" style={{ '--categoryColor': 'orange' }}>
                  <mf-icon icon={tag} marginRight />
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div class="sidebar-section">
            <h4>Provider Links</h4>
            <div class="provider-link">
              <a href="#plan_pricing">
                <mf-icon icon="dollar_sign" color="--mf-c-gray" marginRight />
                Pricing
              </a>
            </div>
            <div class="provider-link">
              <a href={`mailto:${support_email}`} target="_blank" rel="noopener noreferrer">
                <mf-icon icon="life_buoy" color="--mf-c-gray" marginRight />
                Support
                <mf-icon icon="arrow_up_right" color="--mf-c-grayLight" marginLeft />
              </a>
            </div>
            <div class="provider-link">
              <a href={documentation_url} target="_blank" rel="noopener noreferrer">
                <mf-icon icon="book" color="--mf-c-gray" marginRight />
                Documentation
                <mf-icon icon="arrow_up_right" color="--mf-c-grayLight" marginLeft />
              </a>
            </div>
          </div>
          {/* TODO badges */}
        </div>
      </aside>
    );
  };

  render() {
    return (
      <div class="wrapper" itemscope itemtype="http://schema.org/Product">
        <section class="grid">
          {this.renderSidebar()}
          <product-details product={this.product} />
          {/* TODO <product-plans /> */}
        </section>
      </div>
    );
  }
}
