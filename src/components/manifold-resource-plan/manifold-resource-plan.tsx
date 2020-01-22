import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
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
    console.log('RESOURCE', formatGatewayFeatures(this.gqlData?.configuredFeatures?.edges));
    return (
      <manifold-plan-details
        scrollLocked={false}
        plan={this.gqlData.plan}
        product={this.gqlData.plan.product as Product}
        region={this.gqlData.region as Region}
        isExistingResource
        configuredFeatures={formatGatewayFeatures(this.gqlData?.configuredFeatures?.edges)}
        readOnly
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-plan-details>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourcePlan, ['gqlData', 'loading']);
