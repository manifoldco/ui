import { connections } from '../utils/connections';
import { createGraphqlFetch } from '../utils/graphqlFetch';
import { createRestFetch } from '../utils/restFetch';

const baseWait = 15000;

export type Subscriber = (newToken?: string) => void;

const INITIALIZED = 'manifold-connection-initialize';

interface Initialization {
  env?: 'local' | 'stage' | 'prod';
  waitTime?: number | string;
  authToken?: string;
}

export class ConnectionState {
  authToken?: string;
  env: 'local' | 'stage' | 'prod' = 'prod';
  waitTime: number = baseWait;

  private subscribers: Subscriber[] = [];

  private initialized: boolean = false;

  initialize = ({ env = 'prod', waitTime = baseWait }: Initialization) => {
    this.env = env;
    this.waitTime = typeof waitTime === 'number' ? waitTime : parseInt(waitTime, 10);
    this.initialized = true;
    const event = new CustomEvent(INITIALIZED);
    document.dispatchEvent(event);
  };

  onReady = () => {
    return new Promise(resolve => {
      if (this.initialized) {
        resolve();
      }

      const done = () => {
        this.initialized = true;
        document.removeEventListener(INITIALIZED, done);
        resolve();
      };

      document.addEventListener(INITIALIZED, done);
    });
  };

  subscribe = (s: Subscriber) => {
    this.subscribers.push(s);

    return () => {
      this.subscribers.splice(this.subscribers.indexOf(s), 1);
    };
  };

  setAuthToken = (token: string) => {
    this.subscribers.forEach(s => s(token));
    this.authToken = token;
  };

  getAuthToken = () => this.authToken;

  restFetch = createRestFetch({
    endpoints: () => connections[this.env],
    env: this.env,
    getAuthToken: this.getAuthToken,
    setAuthToken: this.setAuthToken,
    onReady: this.onReady,
    wait: () => this.waitTime,
    retries: 1,
  });

  graphqlFetch = createGraphqlFetch({
    getAuthToken: this.getAuthToken,
    setAuthToken: this.setAuthToken,
    onReady: this.onReady,
    endpoint: () => connections[this.env].graphql,
    env: this.env,
    wait: () => this.waitTime,
    retries: 1,
  });
}

export default new ConnectionState();
