import { h, Component, Prop, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import { arrow_up_right, book, life_buoy } from '@manifoldco/icons';
import graphqlFetch from '../../utils/graphqlFetch';
import { Product, Provider } from '../../types/graphql';
import skeletonProduct from '../../data/product';
import Tunnel from '../../data/connection';
// import { withAuth } from '../../utils/auth';
import { categoryIcon } from '../../utils/marketplace';
import { Connection, connections } from '../../utils/connections';

const query = gql`
  query PRODUCT_PAGE($productId: String!) {
    product(id: $productId) {
      displayName
      documentationUrl
      supportEmail
      label
      logoUrl
      categories {
        label
      }
      provider {
        displayName
      }
    }
  }
`;

@Component({
  tag: 'manifold-product-page',
  styleUrl: 'manifold-product-page.css',
  shadow: true,
})
export class ManifoldProductPage {
  @Prop() product?: Product;
  @Prop() productId?: string;
  @Prop() provider?: Provider;
  @Prop() connection?: Connection = connections.prod;
  @Prop() authToken?: string;
  @Watch('productId') productChange(newProduct: string) {
    this.fetchProdProv(newProduct);
  }

  // get providerName() {
  //   if (!this.product || !this.provider) return undefined;
  //   return (
  //     (this.provider.body.name !== this.product.body.name && this.provider.body.name) || undefined
  //   );
  // }

  componentWillLoad() {
    if (this.productId) {
      this.fetchProdProv(this.productId);
    }
  }

  fetchProdProv = async (productId: string) => {
    if (!this.connection) {
      return;
    }

    this.product = undefined;
    this.provider = undefined;
    const variables = { productId };
    const { data, error } = await graphqlFetch({ query, variables });
    if (error) {
      console.error(error);
    }
    this.product = data.product;
    this.provider = data.product.provider;
  };

  render() {
    if (this.product) {
      const {
        documentationUrl,
        supportEmail,
        displayName,
        label,
        logoUrl,
        categories,
      } = this.product;
      const gradient = `var(--manifold-g-${label}, var(--manifold-g-default))`;

      return (
        <div class="wrapper" itemscope itemtype="http://schema.org/Product">
          <section class="grid">
            <aside class="sidebar">
              <div class="sidebar-inner">
                <div class="sidebar-card" style={{ '--background-gradient': gradient }}>
                  <div class="product-logo">
                    <img src={logoUrl} alt={displayName} itemprop="logo" />
                  </div>
                  <h2 class="product-name" itemprop="name">
                    {displayName}
                  </h2>
                  <p class="provider-name">
                    {this.provider && this.provider.displayName && (
                      <span itemprop="brand">from {this.provider.displayName}</span>
                    )}
                  </p>
                </div>
                <div class="sidebar-cta">
                  <slot name="cta" />
                </div>
                {categories && (
                  <div class="sidebar-section">
                    <h4>Category</h4>
                    {categories.map(category => (
                      <div
                        class="category"
                        style={{ '--categoryColor': `var(--manifold-c-${category})` }}
                      >
                        <manifold-icon
                          icon={categoryIcon[category.label] || categoryIcon.uncategorized}
                          margin-right
                        />
                        {category}
                      </div>
                    ))}
                  </div>
                )}
                <div class="sidebar-section">
                  <h4>Links</h4>
                  <div class="provider-link">
                    <a href={documentationUrl} target="_blank" rel="noopener noreferrer">
                      <manifold-icon icon={book} margin-right />
                      Docs
                      <manifold-icon class="external-link-icon" icon={arrow_up_right} margin-left />
                    </a>
                  </div>
                  <div class="provider-link">
                    <a href={`mailto:${supportEmail}`} target="_blank" rel="noopener noreferrer">
                      <manifold-icon icon={life_buoy} margin-right />
                      Support
                      <manifold-icon class="external-link-icon" icon={arrow_up_right} margin-left />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
            <manifold-product-details product={this.product} />
          </section>
        </div>
      );
    }

    // 💀
    const {
      body: { name },
    } = skeletonProduct;

    return (
      <div class="wrapper">
        <section class="grid">
          <aside class="sidebar">
            <div class="sidebar-inner">
              <div
                class="sidebar-card"
                style={{ '--background-gradient': 'var(--manifold-g-default)' }}
              >
                <div class="product-logo">
                  <manifold-skeleton-img />
                </div>
                <h2 class="product-name" itemprop="name">
                  <manifold-skeleton-text>{name}</manifold-skeleton-text>
                </h2>
              </div>
              <div class="sidebar-section">
                <h4>Category</h4>
                <div class="category">
                  <manifold-skeleton-text>Database</manifold-skeleton-text>
                </div>
              </div>
            </div>
          </aside>
          <manifold-product-details />
        </section>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldProductPage, ['connection', 'authToken']);
