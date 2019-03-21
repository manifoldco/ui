import { Component, Prop } from '@stencil/core';

import Tunnel from '../../data/connection';

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  @Prop() url: string = 'https://api.catalog.manifold.co/v1/';

  render() {
    return (
      <Tunnel.Provider state={{ url: this.url }}>
        <slot />
      </Tunnel.Provider>
    );
  }
}
