import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Product, Plan, Resource, Region } from '../../types/graphql';

@Component({ tag: 'manifold-resource-plan' })
export class ManifoldResourcePlan {
  @Prop() gqlData?: Resource;
  @Prop() loading: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    let product: Product | null | undefined;
    let plan: Plan | null = null;
    let region: Region | undefined;

    if (!this.loading && this.gqlData && this.gqlData.plan) {
      plan = this.gqlData.plan;
      product = this.gqlData.plan.product;
      region = this.gqlData.region;
    }

    if (this.loading || !product || !plan) {
      return (
        // ☠
        <manifold-plan-details scrollLocked={false}>
          <manifold-forward-slot slot="cta">
            <slot name="cta" />
          </manifold-forward-slot>
        </manifold-plan-details>
      );
    }

    return (
      <manifold-plan-details
        scrollLocked={false}
        plan={plan}
        product={product}
        region={region}
        isExistingResource
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-plan-details>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourcePlan, ['gqlData', 'loading']);
