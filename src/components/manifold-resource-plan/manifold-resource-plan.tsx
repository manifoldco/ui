import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { convertPlanData } from '../../utils/plan';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Product, Plan, Resource } from '../../types/graphql';

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
    if (!this.loading && this.gqlData) {
      if (this.gqlData.plan) {
        plan = this.gqlData.plan;
        product = this.gqlData.plan.product;
      }
    }

    if (this.loading || !product || !plan) {
      return (
        // ☠
        <manifold-plan-details scrollLocked={false} data-test-loading="true" />
      );
    }

    return (
      <manifold-plan-details
        data-test-loading="false"
        data-test-plan-label={plan.label}
        scrollLocked={false}
        plan={convertPlanData(plan as Plan)}
        product={product as Product}
      />
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourcePlan, ['gqlData', 'loading']);
