import { Component, Prop, State, Element, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import newID from '../../utils/new-id';

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
  @State() features: UserFeatures = {};
  @State() planId: string = '';
  @State() productId: string = '';
  @State() regionId?: string = globalRegion.id;
  @Watch('productLabel') productLabelChanged(newLabel: string) {
    this.fetchProductId(newLabel);
  }

  componentWillLoad() {
    this.fetchProductId();
  }

  provision() {
    const id = newID('resource');

    const body = {
      id,
      type: 'operation',
      version: 1,
      body: {
        features: this.features,
        label: this.resourceName,
        message: '',
        name: this.resourceName,
        product_id: this.productId,
        region_id: this.regionId,
        state: 'provision',
        type: 'provision',
        user_id: '',
      },
    };

    fetch(
      `${this.connection.provisioning}/operations/${id}`,
      withAuth({
        method: 'PUT',
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
