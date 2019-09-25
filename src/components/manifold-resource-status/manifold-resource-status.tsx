import { h, Component, Prop } from '@stencil/core';

import Tunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource } from '../../types/graphql';

@Component({ tag: 'manifold-resource-status' })
export class ManifoldResourceStatus {
  @Prop() data?: Resource;
  @Prop() loading: boolean = true;
  @Prop() size?: 'xsmall' | 'small' | 'medium' = 'medium';

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-resource-status-view
        size={this.size}
        status={this.data ? this.data.status : undefined}
      />
    );
  }
}

Tunnel.injectProps(ManifoldResourceStatus, ['data', 'loading']);
