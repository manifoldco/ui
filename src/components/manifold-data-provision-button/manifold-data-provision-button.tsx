import { Component, Prop, Element, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

/* eslint-disable no-console */

@Component({ tag: 'manifold-data-provision-button' })
export class ManifoldDataProvisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Product to provision (slug) */
  @Prop() productLabel: string;
  /** Name of new resource */
  @Prop() resourceName: string;
  @Prop() features: UserFeatures = {};
  @Prop() planId: string = '';
  @Prop({ mutable: true }) productId: string = '';
  @Prop() regionId?: string = globalRegion.id;
  @Watch('productLabel') productLabelChanged(newLabel: string) {
    this.fetchProductId(newLabel);
  }

  componentWillLoad() {
    this.fetchProductId();
  }

  provision() {
    const body: Gateway.ResourceCreateRequest = {
      label: this.resourceName,
      owner: {
        id: '',
        type: 'user',
      },
      plan_id: this.planId,
      product_id: this.productId,
      region_id: this.regionId,
      source: 'catalog',
    };

    if (Object.keys(this.features).length) body.features = this.features;

    fetch(
      `${this.connection.gateway}/resource/`,
      withAuth({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    );
  }

  fetchProductId(productLabel: string = this.productLabel) {
    fetch(`${this.connection.catalog}/products/?label=${productLabel}`, withAuth())
      .then(response => response.json())
      .then((products: Catalog.Product[]) => {
        if (products.length === 1) {
          this.productId = products[0].id;
        } else {
          console.error(`${productLabel} product not found`);
        }
      });
  }

  render() {
    return (
      <button type="button" onClick={() => this.provision()}>
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataProvisionButton, ['connection']);
