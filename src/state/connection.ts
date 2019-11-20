import { connections } from '../utils/connections';
import { createGraphqlFetch } from '../utils/graphqlFetch';
import { createRestFetch } from '../utils/restFetch';
import { METRICS_ENABLED } from '../global/settings';

const baseWait = 15000;

export type Subscriber = (newToken?: string) => void;

const INITIALIZED = 'manifold-connection-initialize';

interface NodeMapEntry {
  el: HTMLElement;
  loadMark: number;
}

export interface NodeMap {
  [tagName: string]: NodeMapEntry[];
}

interface Initialization {
  authToken?: string;
  env?: 'local' | 'stage' | 'prod';
  metrics?: boolean;
  waitTime?: number | string;
  connectionEl?: HTMLElement;
}

export class ConnectionState {
  authToken?: string;
  env: 'local' | 'stage' | 'prod' = 'prod';
  metrics: boolean = METRICS_ENABLED;
  waitTime: number = baseWait;
  observer: MutationObserver = new MutationObserver(mutationList =>
    this.mutationCallback(mutationList)
  );
  nodeMap: NodeMap = {};

  private subscribers: Subscriber[] = [];

  private initialized: boolean = false;

  initialize = ({
    env = 'prod',
    metrics = METRICS_ENABLED,
    waitTime = baseWait,
    connectionEl = undefined,
  }: Initialization) => {
    this.env = env;
    this.metrics = metrics;
    this.waitTime = typeof waitTime === 'number' ? waitTime : parseInt(waitTime, 10);
    this.nodeMap = {};
    this.initialized = true;
    if (connectionEl) {
      this.observer.observe(connectionEl, { childList: true, subtree: true });
    }
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
    env: () => this.env,
    getAuthToken: this.getAuthToken,
    metrics: () => this.metrics,
    onReady: this.onReady,
    retries: 1,
    setAuthToken: this.setAuthToken,
    wait: () => this.waitTime,
  });

  graphqlFetch = createGraphqlFetch({
    endpoint: () => connections[this.env].graphql,
    env: () => this.env,
    getAuthToken: this.getAuthToken,
    metrics: () => this.metrics,
    onReady: this.onReady,
    retries: 1,
    setAuthToken: this.setAuthToken,
    wait: () => this.waitTime,
  });

  mutationCallback(mutationsList: MutationRecord[]) {
    mutationsList
      .filter(mutation => mutation.type === 'childList')
      .forEach(mutation => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node: HTMLElement) => {
            const tagName = node.tagName && node.tagName.toLowerCase();
            if (tagName && tagName.startsWith('manifold-')) {
              const entry = {
                el: node,
                loadMark: performance.now(),
              };
              if (!this.nodeMap[tagName]) {
                this.nodeMap[tagName] = [];
              }
              this.nodeMap[tagName].push(entry);
              if (node.shadowRoot) {
                this.observer.observe(node.shadowRoot, { childList: true, subtree: true });
              }
            }
          });
        }
      });
  }
}

export default new ConnectionState();
