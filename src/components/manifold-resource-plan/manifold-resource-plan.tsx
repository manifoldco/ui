import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';
import { GetResourceQuery, Product, Region } from '../../types/graphql';
import { formatGatewayFeatures } from '../../utils/configuredFeatures';

@Component({ tag: 'manifold-resource-plan' })
export class ManifoldResourcePlan {
  @Prop() gqlData?: GetResourceQuery['resource'];
  @Prop() loading?: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (this.loading || !this.gqlData) {
      return (
        // ☠
        <manifold-plan-details scrollLocked={false}>
          <manifold-forward-slot slot="cta">
            <slot name="cta" />
          </manifold-forward-slot>
        </manifold-plan-details>
      );
    }

    // TODO: remove `as` and update types
    return (
      <manifold-plan-details
        scrollLocked={false}
        configuredFeatures={formatGatewayFeatures(this.gqlData?.configuredFeatures?.edges)}
        isExistingResource
        readOnly
        plan={this.gqlData.plan}
        product={this.gqlData.plan.product as Product}
        region={this.gqlData.region as Region}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-plan-details>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourcePlan, ['gqlData', 'loading']);
