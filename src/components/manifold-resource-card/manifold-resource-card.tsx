import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-card' })
export class ManifoldResourceCard {
  @Element() el: HTMLElement;
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;

  @Prop() resourceId?: string;
  @Prop() label?: string;
  @Prop() resourceLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() resource?: Gateway.Resource;

  @Watch('resourceId') resourceIdChange(newResourceId: string) {
    this.fetchResourceId(newResourceId);
  }
  @Watch('label') resourceLabelChange(newlabel: string) {
    this.fetchResourceLabel(newlabel);
  }

  componentWillLoad() {
    if (this.resourceId) {
      this.fetchResourceId(this.resourceId);
    } else if (this.label) {
      this.fetchResourceLabel(this.label);
    }
  }

  async fetchResourceId(resourceId: string) {
    if (!this.connection) {
      return;
    }

    const response = await fetch(
      `${this.connection.gateway}/resources/${resourceId}`,
      withAuth(this.authToken)
    );
    this.resource = await response.json();
  }

  async fetchResourceLabel(resourceName: string) {
    if (!this.connection) {
      return;
    }

    const response = await fetch(
      `${this.connection.gateway}/resources/me/${resourceName}`,
      withAuth(this.authToken)
    );
    const resources: Gateway.Resource[] = await response.json();
    if (resources.length) {
      // eslint-disable-next-line prefer-destructuring
      this.resource = resources[0];
    }
  }

  render() {
    return this.resource ? (
      <manifold-resource-card-view
        label={this.resource.label}
        name={this.resource.name}
        logo={this.resource.product && this.resource.product.logo_url}
        resourceId={this.resource.id}
        resourceStatus={this.resource.state}
        resourceLinkFormat={this.resourceLinkFormat}
        preserveEvent={this.preserveEvent}
      />
    ) : (
      // ☠
      <manifold-resource-card-view label="loading" loading={true} />
    );
  }
}

Tunnel.injectProps(ManifoldResourceCard, ['connection', 'authToken']);
