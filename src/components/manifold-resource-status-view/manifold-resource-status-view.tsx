import { h, Component, Prop } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

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
  @Prop() size?: 'xsmall' | 'small' | 'medium' = 'medium';

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

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    const status = this.loading ? 'loading' : this.status(this.resourceState);
    return (
      <div class="status" data-size={this.size} data-status={status}>
        <div class="icon">
          {this.loading ? <manifold-icon icon={refresh_cw} /> : <div class="icon-status" />}
        </div>
        <span role="status">
          {this.loading ? 'Loading' : this.statusMessage(this.resourceState)}
        </span>
      </div>
    );
  }
}
