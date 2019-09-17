import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';
import { convertPlan } from '../../utils/gatewayToCatalog';
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
        {(state: ResourceState) =>
          !state.loading &&
          state.data &&
          state.data.product &&
          state.data.plan &&
          state.data.product.provider ? (
            <manifold-plan-details
              scrollLocked={false}
              plan={convertPlan(
                state.data.plan,
                state.data.product.id || '',
                state.data.product.provider.id || ''
              )}
              product={
                (state.gqlData && state.gqlData.plan && state.gqlData.plan.product) || undefined
              }
            />
          ) : (
            // ☠
            <manifold-plan-details />
          )
        }
      </ResourceTunnel.Consumer>
    );
  }
}
