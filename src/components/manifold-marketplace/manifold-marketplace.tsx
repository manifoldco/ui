import { h, Component, Prop, State, Element } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import { Query, ProductEdge, ProductState } from '../../types/graphql';
import fetchAllPages from '../../utils/fetchAllPages';
import skeletonProducts from '../../data/marketplace';
import { Catalog } from '../../types/catalog';

function transformSkeleton(skel: Catalog.Product): ProductEdge {
  return {
    cursor: skel.id,
    node: {
      id: skel.id,
      displayName: skel.body.name,
      documentationUrl: skel.body.documentation_url,
      label: skel.body.label,
      logoUrl: skel.body.logo_url,
      tagline: skel.body.tagline,
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: skel.body.support_email,
      termsUrl: '',
      valueProps: [],
      valuePropsHtml: '',
      categories: skel.body.tags
        ? skel.body.tags.map(t => ({
            label: t,
            products: {
              edges: [],
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
            },
          }))
        : [],
    },
  };
}

const productQuery = gql`
  query PRODUCTS($first: Int!, $after: String!) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          label
          tagline
          logoUrl
          displayName
          categories {
            label
          }
          plans(first: 1, free: true) {
            edges {
              node {
                free
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Comma-separated list of featured products (labels) */
  @Prop() featured?: string;
  /** Hide categories & side menu? */
  @Prop() hideCategories?: boolean = false;
  /** Hide search? */
  @Prop() hideSearch?: boolean = false;
  /** Hide template cards? */
  @Prop() hideTemplates?: boolean = false;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  /** Product link structure, with `:product` placeholder */
  @Prop() productLinkFormat?: string;
  /** Comma-separated list of shown products (labels) */
  @Prop() products?: string;
  /** Template format structure, with `:product` placeholder */
  @Prop() templateLinkFormat?: string;
  @Prop() hideUntilReady?: boolean = false;
  @State() parsedFeatured: string[] = [];
  @State() parsedProducts: string[] = [];
  @State() services: ProductEdge[];
  @State() isLoading: boolean = false;

  componentWillLoad(): Promise<void> | void {
    this.parseProps();
    const call = this.fetchProducts();

    if (this.hideUntilReady) {
      return call;
    }
  }

  async fetchProducts() {
    this.isLoading = true;
    this.services = await fetchAllPages({
      query: productQuery,
      nextPage: { first: 25, after: '' },
      getConnection: (q: Query) => q.products,
      graphqlFetch: this.graphqlFetch,
    });
    this.isLoading = false;
  }

  private parse(list: string): string[] {
    return list.split(',').map(item => item.trim());
  }

  private parseProps() {
    if (typeof this.featured === 'string') {
      this.parsedFeatured = this.parse(this.featured);
    }
    if (typeof this.products === 'string') {
      this.parsedProducts = this.parse(this.products);
    }
  }

  @logger()
  render() {
    return (
      <manifold-marketplace-grid
        featured={this.parsedFeatured}
        hideCategories={this.hideCategories}
        hideSearch={this.hideSearch}
        hideTemplates={this.hideTemplates}
        preserveEvent={this.preserveEvent}
        productLinkFormat={this.productLinkFormat}
        products={this.parsedProducts}
        skeleton={this.isLoading}
        services={this.isLoading ? skeletonProducts.map(transformSkeleton) : this.services}
        templateLinkFormat={this.templateLinkFormat}
      />
    );
  }
}
