import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Gateway } from '../../types/gateway';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-card' })
export class ManifoldResourceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;

  @Prop() resourceId?: string;
  @Prop() label?: string;
  @Prop() resourceLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() resource?: Gateway.Resource;

  @Watch('resourceId') resourceIdChange(newResourceId: string) {
    this.fetchResource({ id: newResourceId });
  }
  @Watch('label') resourceLabelChange(newlabel: string) {
    this.fetchResource({ label: newlabel });
  }

  componentWillLoad() {
    this.fetchResource({ id: this.resourceId, label: this.label });
  }

  async fetchResource({ id, label }: { id?: string; label?: string }) {
    if (!this.restFetch) {
      return;
    }

    if (id) {
      const response = await this.restFetch<Gateway.Resource>({
        service: 'gateway',
        endpoint: `/resources/${id}`,
      });

      if (response instanceof Error) {
        console.error(response);
        return;
      }
      this.resource = response;
    } else if (label) {
      const response = await this.restFetch<Gateway.Resource[]>({
        service: 'gateway',
        endpoint: `/resources/me/${label}`,
      });

      if (response && response.length) {
        // eslint-disable-next-line prefer-destructuring
        this.resource = response[0];
      }
    }
  }

  @logger()
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

Tunnel.injectProps(ManifoldResourceCard, ['restFetch']);
