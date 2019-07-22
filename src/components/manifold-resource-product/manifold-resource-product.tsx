import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';

@Component({ tag: 'manifold-resource-product' })
export class ManifoldResourceProduct {
  @Prop() asCard?: boolean = false;

  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) =>
          !state.loading && state.data && state.data.product ? (
            <manifold-service-view
              name={state.data.product.name}
              description={state.data.product.tagline}
              label={state.data.product.label}
              logo={state.data.product.logo_url}
              productId={state.data.product.id}
              asCard={this.asCard}
            >
              <manifold-forward-slot slot="cta">
                <slot name="cta" />
              </manifold-forward-slot>
            </manifold-service-view>
          ) : (
            // ☠
            <manifold-service-view
              loading={true}
              name="loading..."
              description="This is a loading product..."
              asCard={this.asCard}
            />
          )
        }
      </ResourceTunnel.Consumer>
    );
  }
}
