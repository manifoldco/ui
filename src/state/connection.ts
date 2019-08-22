import { connections } from '../utils/connections';
import { createGraphqlFetch } from '../utils/graphqlFetch';
import { createRestFetch } from '../utils/restFetch';

const baseWait = 15000;

export type Subscriber = (oldToken?: string, newToken?: string) => void;

export class ConnectionState {
  /** _(optional)_ Specify `env="stage"` for staging */
  env: 'local' | 'stage' | 'prod' = 'prod';
  /** _(optional)_ Wait time for the fetch calls before it times out */
  waitTime: number = baseWait;

  authToken?: string;

  private subscribers: Subscriber[] = [];

  subscribe = (s: Subscriber) => {
    this.subscribers.push(s);

    return () => {
      this.subscribers.splice(this.subscribers.indexOf(s), 1);
    };
  };

  setEnv = (newValue: 'local' | 'stage' | 'prod') => {
    this.env = newValue;
  };

  setWaitTime = (newValue: number) => {
    this.waitTime = newValue;
  };

  setAuthToken = (token: string) => {
    this.subscribers.forEach(s => s(this.authToken, token));
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

  restFetch = createRestFetch({
    endpoints: connections[this.env],
    getAuthToken: this.getAuthToken,
    setAuthToken: this.setAuthToken,
    wait: this.waitTime,
  });

  graphqlFetch = createGraphqlFetch({
    getAuthToken: this.getAuthToken,
    setAuthToken: this.setAuthToken,
    endpoint: connections[this.env].graphql,
    wait: this.waitTime,
  });
}
