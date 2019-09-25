import { h, Component, Prop } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { ResourceStatus, ResourceStatusLabel } from '../../types/graphql';

@Component({
  tag: 'manifold-resource-status-view',
  styleUrl: 'manifold-resource-status-view.css',
  shadow: true,
})
export class ManifoldResourceStatusView {
  @Prop() status?: ResourceStatus;
  @Prop() size?: 'xsmall' | 'small' | 'medium' = 'medium';

  @loadMark()
  componentWillLoad() {}

  statusMessage(label: string) {
    switch (label) {
      case ResourceStatusLabel.Available:
        return 'Available';
      case ResourceStatusLabel.Creating:
        return 'Creating';
      case ResourceStatusLabel.Deleted:
        return 'Deleted';
      case ResourceStatusLabel.Deleting:
        return 'Deleting';
      case ResourceStatusLabel.Updating:
        return 'Updating';
      case ResourceStatusLabel.ErrorCreating:
        return 'Error Creating';
      case ResourceStatusLabel.ErrorDeleting:
        return 'Error Deleting';
      case ResourceStatusLabel.ErrorUpdating:
        return 'Error Updating';
      default:
        return 'Loading';
    }
  }

  @logger()
  render() {
    const message = this.status
      ? this.status.message || this.statusMessage(this.status.label)
      : 'Loading';

    return (
      <div class="status" data-size={this.size} data-status={this.status && this.status.message}>
        <div class="icon">
          {this.status ? <div class="icon-status" /> : <manifold-icon icon={refresh_cw} />}
        </div>
        <span role="status">{message}</span>
      </div>
    );
  }
}
