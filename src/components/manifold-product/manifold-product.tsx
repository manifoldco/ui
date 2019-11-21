import { h, Component, Prop, State, Element, Watch, Event, EventEmitter } from '@stencil/core';

import { ProductQuery, ProductQueryVariables } from '../../types/graphql';
import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';

import productQuery from './product.graphql';
import { Unpack } from '../../types/unpack';

export type PartialProduct = Unpack<ProductQuery, 'product'>;

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() productLabel?: string;
  @State() product?: PartialProduct;
  @Event({ eventName: 'manifold-product-load' }) loaded: EventEmitter<
    PartialProduct | undefined | null
  >;

  @Watch('productLabel') productChange(newLabel: string) {
    this.fetchProduct(newLabel);
  }

  @loadMark()
  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.graphqlFetch) {
      return;
    }

    const variables: ProductQueryVariables = { productLabel };
    const { data } = await this.graphqlFetch<ProductQuery>({
      query: productQuery,
      variables,
      element: this.el,
    });

    this.product = (data && data.product) || undefined;
    this.loaded.emit(data && data.product);
  };

  @logger()
  render() {
    return (
      <manifold-product-page product={this.product}>
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-product-page>
    );
  }
}
