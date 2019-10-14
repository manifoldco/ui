import { h, Component, Prop } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

const OFFLINE = 'offline';

@Component({
  tag: 'manifold-resource-status-view',
  styleUrl: 'manifold-resource-status-view.css',
  shadow: true,
})
export class ManifoldResourceStatusView {
  @Prop() loading?: boolean = false;
  @Prop() resourceState?: string = OFFLINE;
  @Prop() size?: 'xsmall' | 'small' | 'medium' = 'medium';

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    const status = this.loading ? 'loading' : this.resourceState;
    return (
      <div class="status" data-size={this.size} data-status={status}>
        <div class="icon">
          {this.loading ? <manifold-icon icon={refresh_cw} /> : <div class="icon-status" />}
        </div>
        <span role="status">{status && status.replace('_', ' ')}</span>
      </div>
    );
  }
}
