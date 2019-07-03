import { h, Component, Prop, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { connections } from '../../utils/connections';

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: 'stage' | 'prod' = 'prod';

  @State() authToken?: string = localStorage.getItem('manifold_api_token') || undefined;

  setAuthToken = (token: string) => {
    this.authToken = token;
  };

  render() {
    return (
      <Tunnel.Provider state={{
        connection: connections[this.env],
        authToken: this.authToken,
        setAuthToken: this.setAuthToken,
      }}>
        <slot />
      </Tunnel.Provider>
    );
  }
}
