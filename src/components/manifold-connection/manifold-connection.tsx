import { h, Component, Prop, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { connections } from '../../utils/connections';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: 'stage' | 'prod' = 'prod';

  @State() authToken?: string = localStorage.getItem('manifold_api_token') || undefined;

  setAuthToken = (token: string) => {
    this.authToken = token;
  };

  getAuthToken = () => {
    return this.authToken;
  };

  render() {
    return (
      <Tunnel.Provider
        state={{
          connection: connections[this.env],
          authToken: this.authToken,
          setAuthToken: this.setAuthToken,
          graphqlFetch: createGraphqlFetch({ getAuthToken: this.getAuthToken }),
        }}
      >
        <slot />
      </Tunnel.Provider>
    );
  }
}
