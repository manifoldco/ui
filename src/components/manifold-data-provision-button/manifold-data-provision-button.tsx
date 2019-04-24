import { Component, Prop, Element, State, Watch } from '@stencil/core';
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
  /** Name of `<label>` for input */
  @Prop() formLabel: string = 'Resource name';
  @Prop() features: UserFeatures = {};
  @Prop() inputId: string = 'manifold-provision-resource';
  @Prop() ownerId: string = '';
  @Prop() planId: string = '';
  @Prop({ mutable: true }) productId: string = '';
  @Prop() regionId?: string = globalRegion.id;
  @State() errorMsg?: string | undefined;
  @State() successMsg?: string | undefined;
  @State() resourceName: string = '';
  @Watch('productLabel') productLabelChanged(newLabel: string) {
    this.fetchProductId(newLabel);
  }

  componentWillLoad() {
    this.fetchProductId();
  }

  provision() {
    this.errorMsg = undefined;
    this.successMsg = undefined;

    const req: Gateway.ResourceCreateRequest = {
      label: this.resourceName,
      owner: {
        id: this.ownerId,
        type: 'user',
      },
      plan_id: this.planId,
      product_id: this.productId,
      region_id: this.regionId,
      source: 'catalog',
    };

    if (Object.keys(this.features).length) req.features = this.features;

    fetch(
      `${this.connection.gateway}/resource/`,
      withAuth({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.successMsg = `${this.resourceName} successfully provisioned`;
        }
        return response.json();
      })
      .then(([message]) => {
        if (message.type === 'error') {
          this.errorMsg = message.message;
        } else {
          this.successMsg = message.message;
        }
      })
      .catch(e => {
        this.errorMsg = e;
      });
  }

  fetchProductId(productLabel: string = this.productLabel) {
    if (!productLabel) return;
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

  handleInput(e: Event) {
    if (!e.target) return;
    this.errorMsg = undefined;
    const { value } = e.target as HTMLInputElement;
    this.resourceName = value;

    if (value.length && !this.validate(value))
      this.errorMsg =
        'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.';
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  render() {
    return [
      <input
        autocapitalize="off"
        data-error={typeof this.errorMsg === 'string'}
        id={this.inputId}
        name="resource-name"
        onChange={e => this.handleInput(e)}
        pattern="^[a-z][a-z0-9-]*"
        required
        type="text"
        value={this.resourceName}
      />,
      <button type="button" onClick={() => this.provision()}>
        <slot />
      </button>,
      typeof this.errorMsg === 'string' && (
        <div role="alert" data-type="error">
          {this.errorMsg}
        </div>
      ),
      typeof this.successMsg === 'string' && (
        <div role="alert" data-type="success">
          {this.successMsg}
        </div>
      ),
    ];
  }
}

Tunnel.injectProps(ManifoldDataProvisionButton, ['connection']);
