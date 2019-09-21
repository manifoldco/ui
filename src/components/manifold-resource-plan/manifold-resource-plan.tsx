import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-resource-plan' })
export class ManifoldResourcePlan {
  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => {
          if (!state.loading && state.data) {
            const product = (state.data.plan && state.data.plan.product) || undefined;
            const plan = state.data.plan || undefined;

            return <manifold-plan-details scrollLocked={false} plan={plan} product={product} />;
          }

          // ☠
          return <manifold-plan-details />;
        }}
      </ResourceTunnel.Consumer>
    );
  }
}
