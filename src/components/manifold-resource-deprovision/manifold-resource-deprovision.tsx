import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';
import { GetResourceQuery } from '../../types/graphql';

@Component({ tag: 'manifold-resource-deprovision' })
export class ManifoldResourceDeprovision {
  @Prop() disabled?: boolean;
  @Prop() gqlData?: GetResourceQuery['resource'];
  @Prop() loading?: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-data-deprovision-button
        disabled={this.disabled}
        resourceId={this.gqlData && this.gqlData.id}
        resourceLabel={this.gqlData && this.gqlData.label}
        loading={this.loading}
      >
        <slot />
      </manifold-data-deprovision-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceDeprovision, ['gqlData', 'loading']);
