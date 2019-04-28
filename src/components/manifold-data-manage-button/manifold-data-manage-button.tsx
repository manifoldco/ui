import { Component, Prop, State, Element, Event, EventEmitter, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

/* eslint-disable no-console */

interface SuccessMessage {
  features: Gateway.FeatureMap;
  planName: string;
  message: string;
}

interface ErrorMessage {
  features: Gateway.FeatureMap;
  message: string;
}

@Component({ tag: 'manifold-data-manage-button' })
export class ManifoldDataManageButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Name of resource */
  @Prop() resourceName: string;
  @Prop() features: Gateway.FeatureMap = {};
  @Prop() planId: string = '';
  @Prop({ mutable: true }) productId: string = '';
  @Prop() regionId?: string = globalRegion.id;
  @State() resourceId: string = '';
  @Event({ eventName: 'manifold-manageButton-click', bubbles: true })
  clickEvent: EventEmitter;
  @Event({ eventName: 'manifold-manageButton-error', bubbles: true }) errorEvent: EventEmitter;
  @Event({ eventName: 'manifold-manageButton-success', bubbles: true })
  successEvent: EventEmitter;
  @Watch('resourceName') resourceChange(newResource: string) {
    this.fetchResourceId(newResource);
  }

  componentWillLoad() {
    if (this.resourceName) this.fetchResourceId(this.resourceName);
  }

  async fetchResourceId(resourceName: string) {
    const { gateway } = this.connection;
    const response = await fetch(`${gateway}/resources/me/${resourceName}`, withAuth());
    const resource: Gateway.Resource = await response.json();
    console.log(resource);
    if (resource.id) this.resourceId = resource.id;
  }

  async update() {
    this.clickEvent.emit({ planId: this.planId });
    const req: Gateway.ResourceUpdateRequest = { plan_id: this.planId };

    if (Object.keys(this.features).length) req.features = this.features;

    const response = await fetch(
      `${this.connection.gateway}/id/resource/${this.resourceId}`,
      withAuth({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
    );

    const body = await response.json();

    // If successful, this will return 200 and stop here
    if (response.status >= 200 && response.status < 300) {
      const planName = body.plan && body.plan.name;
      const success: SuccessMessage = {
        message: `${this.resourceName} successfully updated to ${planName}`,
        planName,
        features: body.features,
      };
      this.successEvent.emit(success);
    } else {
      // Sometimes messages are an array, sometimes they aren’t. Different strokes!
      const message = Array.isArray(body) ? body[0].message : body.message;
      const error: ErrorMessage = {
        message,
        features: this.features,
      };
      this.errorEvent.emit(error);
    }
  }

  render() {
    return (
      <button type="button" onClick={() => this.update()}>
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataManageButton, ['connection']);
