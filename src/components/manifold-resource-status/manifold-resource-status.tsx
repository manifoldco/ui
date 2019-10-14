import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource } from '../../types/graphql';

@Component({ tag: 'manifold-resource-status' })
export class ManifoldResourceStatus {
  @Prop() gqlData?: Resource;
  @Prop() loading: boolean = true;
  @Prop() size?: 'xsmall' | 'small' | 'medium' = 'medium';

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-resource-status-view
        size={this.size}
        resourceState={this.gqlData && this.gqlData.status && this.gqlData.status.label}
        loading={this.loading}
      />
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceStatus, ['gqlData', 'loading']);
