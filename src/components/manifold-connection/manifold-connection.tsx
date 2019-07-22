import { h, Component, Prop, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { connections } from '../../utils/connections';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: 'stage' | 'prod' = 'prod';

  @State() authToken?: string;

  setAuthToken = (token?: string) => {
    this.authToken = token;
  };

  getAuthToken = () => this.authToken;

  render() {
    const endpoint = this.env === 'stage' ? 'https://api.stage.manifold.co/graphql' : undefined;

    return (
      <Tunnel.Provider
        state={{
          connection: connections[this.env],
          authToken: this.authToken,
          setAuthToken: this.setAuthToken,
          graphqlFetch: createGraphqlFetch({
            getAuthToken: this.getAuthToken,
            setAuthToken: this.setAuthToken,
            endpoint,
          }),
        }}
      >
        <slot />
      </Tunnel.Provider>
    );
  }
}
