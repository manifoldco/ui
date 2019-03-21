import { Component, Prop } from '@stencil/core';

import Tunnel, { State as Connection } from '../../data/connection';

@Component({ tag: 'manifold-product-connection' })
export class ManifoldProductConnection {
  @Prop() productLabel: string;

  render() {
    return (
      <Tunnel.Consumer>
        {(connection: Connection) => (
          <manifold-product productLabel={this.productLabel} url={connection.url} />
        )}
      </Tunnel.Consumer>
    );
  }
}
