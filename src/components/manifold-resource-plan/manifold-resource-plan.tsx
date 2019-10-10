import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
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
        <manifold-plan-details scrollLocked={false} />
      );
    }

    return <manifold-plan-details scrollLocked={false} plan={plan} product={product as Product} />;
  }
}

ResourceTunnel.injectProps(ManifoldResourcePlan, ['gqlData', 'loading']);
