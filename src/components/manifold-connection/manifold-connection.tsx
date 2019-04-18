import { Component, Prop } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Env, connections } from '../../utils/connections';

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: Env = Env.Prod;

  render() {
    return (
      <Tunnel.Provider state={{ connection: connections[this.env] }}>
        <slot />
      </Tunnel.Provider>
    );
  }
}
