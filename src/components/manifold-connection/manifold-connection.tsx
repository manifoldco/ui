import { h, Component, Prop, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { connections } from '../../utils/connections';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { isExpired } from '../../utils/auth';

const TOKEN_KEY = 'manifold_api_token';

function getDefaultToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && !isExpired(token)) {
    return token;
  }

  return undefined;
}

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: 'local' | 'stage' | 'prod' = 'prod';

  @State() authToken?: string = getDefaultToken();

  setAuthToken = (token: string) => {
    this.authToken = token;
    localStorage.setItem(TOKEN_KEY, token);
  };

  getAuthToken = () => this.authToken;

  get accessToken() {
    if (this.authToken) {
      const [token] = this.authToken.split('.');
      return token;
    }

    return undefined;
  }

  render() {
    return (
      <Tunnel.Provider
        state={{
          connection: connections[this.env],
          authToken: this.accessToken,
          setAuthToken: this.setAuthToken,
          graphqlFetch: createGraphqlFetch({
            getAuthToken: this.getAuthToken,
            setAuthToken: this.setAuthToken,
            endpoint: connections[this.env].graphql,
          }),
        }}
      >
        <slot />
      </Tunnel.Provider>
    );
  }
}
