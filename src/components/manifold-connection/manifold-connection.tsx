import { h, Component, Prop, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { connections } from '../../utils/connections';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { isExpired } from '../../utils/auth';
import { createRestFetch } from '../../utils/restFetch';

const TOKEN_KEY = 'manifold_api_token';
const baseWait = 15000;

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
  /** _(optional)_ Wait time for the fetch calls before it times out */
  @Prop() waitTime: number = baseWait;

  @State() authToken?: string = getDefaultToken();

  setAuthToken = (token: string) => {
    this.authToken = token;
    localStorage.setItem(TOKEN_KEY, token);
  };

  getAuthToken = () => (this.authToken && !isExpired(this.authToken) ? this.authToken : undefined);

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
          setAuthToken: this.setAuthToken,
          restFetch: createRestFetch({
            endpoints: connections[this.env],
            getAuthToken: this.getAuthToken,
            setAuthToken: this.setAuthToken,
            wait: this.waitTime,
          }),
          graphqlFetch: createGraphqlFetch({
            getAuthToken: this.getAuthToken,
            setAuthToken: this.setAuthToken,
            endpoint: connections[this.env].graphql,
            wait: this.waitTime,
          }),
        }}
      >
        <slot />
      </Tunnel.Provider>
    );
  }
}
