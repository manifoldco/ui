import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';
import { convertPlan } from '../../utils/gatewayToCatalog';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-plan' })
export class ManifoldResourcePlan {
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
              product={state.data.product}
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
