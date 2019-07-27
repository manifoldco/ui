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
    const accessToken = token.split('.', token.split('.').length - 1).join('.');
    localStorage.setItem(TOKEN_KEY, accessToken);
  };

  getAuthToken = () => this.accessToken;

  get accessToken() {
    if (this.authToken) {
      // the auth token's last segment is its expiry
      const token = this.authToken.split('.', this.authToken.split('.').length - 1).join('.');
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
            endpoint: connections[this.env].graphQl,
          }),
        }}
      >
        <slot />
      </Tunnel.Provider>
    );
  }
}
