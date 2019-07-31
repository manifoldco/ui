import { h, Component, Prop, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { connections } from '../../utils/connections';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { createRestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

const baseWait = 15000;

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: 'local' | 'stage' | 'prod' = 'prod';
  /** _(optional)_ Wait time for the fetch calls before it times out */
  @Prop() waitTime: number = baseWait;

  @State() authToken?: string;

  setAuthToken = (token: string) => {
    this.authToken = token;
  };

  getAuthToken = () => this.accessToken;

  get accessToken() {
    if (this.authToken) {
      const [token] = this.authToken.split('|');
      return token;
    }

    return undefined;
  }

  @logger()
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
