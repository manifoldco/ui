import { Component, Prop } from '@stencil/core';
import { Collection } from 'types/Collection';

import Tunnel, { State as Connection } from '../../data/connection';

@Component({ tag: 'manifold-marketplace-connection' })
export class ManifoldMarketplaceConnection {
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() collections: Collection[] = [];

  render() {
    return (
      <Tunnel.Consumer>
        {(connection: Connection) => (
          <manifold-marketplace
            serviceLink={this.serviceLink}
            featured={this.featured}
            url={connection.url}
            collections={this.collections}
          />
        )}
      </Tunnel.Consumer>
    );
  }
}
