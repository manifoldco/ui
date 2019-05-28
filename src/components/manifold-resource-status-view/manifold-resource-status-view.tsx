import { h, Component, Prop } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';

import { ResourceState } from '../../data/resource';

const AVAILABLE = 'AVAILABLE';
const OFFLINE = 'OFFLINE';

const message = {
  [AVAILABLE]: 'Available',
  [OFFLINE]: 'Offline',
};

@Component({
  tag: 'manifold-resource-status-view',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldResourceStatusView {
  @Prop() resourceState: ResourceState = { loading: false, data: undefined };

  status(resourceState = this.resourceState) {
    if (resourceState.data) {
      return AVAILABLE;
    }
    return OFFLINE;
  }

  statusMessage(resourceState = this.resourceState) {
    if (resourceState.data) {
      return message[AVAILABLE];
    }
    return message[OFFLINE];
  }

  render() {
    if (this.resourceState.loading) {
      return (
        <div class="loading" data-status={this.status(this.resourceState)}>
          <manifold-icon icon={refresh_cw} />
          Loading
        </div>
      );
    }

    return (
      <div class="status" data-status={this.status(this.resourceState)}>
        <div class="inner">{this.statusMessage(this.resourceState)}</div>
      </div>
    );
  }
}
