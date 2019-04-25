import { Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
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
  @State() resourceName: string = '';
  @Event({ eventName: 'manifold-provisionButton-invalid', bubbles: true })
  invalidEvent: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-error', bubbles: true }) errorEvent: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-success', bubbles: true })
  successEvent: EventEmitter;
  @Watch('productLabel') productLabelChanged(newLabel: string) {
    this.fetchProductId(newLabel);
  }

  componentWillLoad() {
    this.fetchProductId();
  }

  async provision() {
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

    const response = await fetch(
      `${this.connection.gateway}/resource/`,
      withAuth({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
    );

    const body = await response.json();

    // If successful, this will return 200 and stop here
    if (response.status >= 200 && response.status < 300) {
      this.successEvent.emit({
        createdAt: body.created_at,
        message: `${this.resourceName} successfully provisioned`,
        resourceId: body.id,
        resourceName: body.label,
      });
    } else if (Array.isArray(body)) {
      this.errorEvent.emit({
        message: body[0].message,
        resourceName: this.resourceName,
      });
    } else {
      this.errorEvent.emit({
        message: body.message,
        resourceName: this.resourceName,
      });
    }
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
    const { value } = e.target as HTMLInputElement;
    this.resourceName = value;

    if (value.length && !this.validate(value))
      this.invalidEvent.emit({
        value: this.resourceName,
        message:
          'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.',
      });
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  render() {
    return [
      <input
        autocapitalize="off"
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
    ];
  }
}

Tunnel.injectProps(ManifoldDataProvisionButton, ['connection']);
