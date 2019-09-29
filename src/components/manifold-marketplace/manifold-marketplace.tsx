import { h, Component, Prop, State, Element } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// TODO: fix the freePlans query in GraphQL
const TEMPORARY_FREE_PRODUCTS = [
  'blitline',
  'bonsai-elasticsearch',
  'cloudamqp',
  'cloudcube',
  'custom-recognition',
  'degraffdb-generators-stage',
  'elegant-cms',
  'generic-tagging',
  'hypdf',
  'informant',
  'logdna',
  'mailgun',
  'memcachier-cache',
  'pdfshift',
  'piio',
  'posthook',
  'prefab',
  'scaledrone',
  'scoutapp',
  'till',
  'timber-logging',
  'timber-logging-staging',
  'valence',
  'websolr',
];

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

  @loadMark()
  componentWillLoad() {
    this.parseProps();
    const call = this.fetchProducts();

    if (this.hideUntilReady) {
      return call;
    }

    return Promise.resolve();
  }

  async fetchProducts() {
    this.isLoading = true;
    this.services = await fetchAllPages({
      query: productQuery,
      nextPage: { first: 50, after: '' },
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
    const accurateSkeletonCount =
      this.products && this.products.length < skeletonProducts.length
        ? skeletonProducts.splice(0, this.products.length)
        : skeletonProducts;

    return (
      <manifold-marketplace-grid
        featured={this.parsedFeatured}
        freeProducts={TEMPORARY_FREE_PRODUCTS}
        hideCategories={this.hideCategories}
        hideSearch={this.hideSearch}
        hideTemplates={this.hideTemplates}
        preserveEvent={this.preserveEvent}
        productLinkFormat={this.productLinkFormat}
        products={this.parsedProducts}
        skeleton={this.isLoading}
        services={this.isLoading ? accurateSkeletonCount.map(transformSkeleton) : this.services}
        templateLinkFormat={this.templateLinkFormat}
      />
    );
  }
}
