import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

import connection from '../../state/connection';
import { Gateway } from '../../types/gateway';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-resource-card' })
export class ManifoldResourceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;

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

  @loadMark()
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
      const resource = await this.restFetch<Gateway.Resource[]>({
        service: 'gateway',
        endpoint: `/resources/me/${label}`,
      });

      if (resource) {
        // eslint-disable-next-line prefer-destructuring
        this.resource = Array.isArray(resource) ? resource[0] : resource;
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
