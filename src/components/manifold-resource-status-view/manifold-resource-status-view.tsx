import { h, Component, Prop } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';

const AVAILABLE = 'available';
const OFFLINE = 'offline';
const PROVISIONING = 'provision';
const DEGRADED = 'degraded';

const message: { [s: string]: string } = {
  [AVAILABLE]: 'Available',
  [OFFLINE]: 'Offline',
  [PROVISIONING]: 'Provision',
  [DEGRADED]: 'Degraded',
};

@Component({
  tag: 'manifold-resource-status-view',
  styleUrl: 'manifold-resource-status-view.css',
  shadow: true,
})
export class ManifoldResourceStatusView {
  @Prop() loading?: boolean = false;
  @Prop() resourceState?: string = OFFLINE;
  @Prop() size?: 'small' | 'medium' = 'medium';

  status(resourceState = this.resourceState) {
    if (resourceState && message[resourceState]) {
      return resourceState;
    }
    return OFFLINE;
  }

  statusMessage(resourceState = this.resourceState) {
    if (resourceState && message[resourceState]) {
      return message[resourceState];
    }
    return message[OFFLINE];
  }

  render() {
    if (this.loading) {
      return (
        <div class="loading" data-size={this.size} data-status={this.status(this.resourceState)}>
          <manifold-icon icon={refresh_cw} />
          Loading
        </div>
      );
    }

    return (
      <div class="status" data-size={this.size} data-status={this.status(this.resourceState)}>
        <div class="inner">{this.statusMessage(this.resourceState)}</div>
      </div>
    );
  }
}
