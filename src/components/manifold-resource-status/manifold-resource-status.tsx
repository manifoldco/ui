import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

const AVAILABLE = 'AVAILABLE';
const OFFLINE = 'OFFLINE';

const message = {
  [AVAILABLE]: 'Available',
  [OFFLINE]: 'Offline',
};

@Component({
  tag: 'manifold-resource-status',
  styleUrl: 'manifold-resource-status.css',
  shadow: true,
})
export class ManifoldResourceStatus {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Resource name for this status */
  @Prop() resourceName?: string;
  @State() loading: boolean = false;
  @State() resource: Gateway.Resource;
  @Watch('resourceName') resourceChange(newResource: string) {
    this.fetchResourceByName(newResource);
  }

  componentWillLoad() {
    if (this.resourceName) this.fetchResourceByName(this.resourceName);
  }

  fetchResourceByName(resourceName: string) {
    this.loading = true;
    fetch(`${this.connection.gateway}/resources/me/${resourceName}`, withAuth())
      .then(response => response.json())
      .then((resource: Gateway.Resource) => {
        this.loading = false;
        this.resource = resource;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  status(resource: Gateway.Resource = this.resource) {
    if (resource) {
      return AVAILABLE;
    }
    return OFFLINE;
  }

  statusMessage(resource: Gateway.Resource = this.resource) {
    if (resource) {
      return message[AVAILABLE];
    }
    return message[OFFLINE];
  }

  render() {
    if (this.loading) {
      return (
        <div class="loading" data-status={this.status(this.resource)}>
          <manifold-icon icon={refresh_cw} />
          Loading
        </div>
      );
    }

    return (
      <div class="status" data-status={this.status(this.resource)}>
        <div class="inner">{this.statusMessage(this.resource)}</div>
      </div>
    );
  }
}
Tunnel.injectProps(ManifoldResourceStatus, ['connection']);
