import { mark } from '../packages/analytics';
import { connections } from '../utils/connections';
import { createGraphqlFetch } from '../utils/graphqlFetch';
import { createRestFetch } from '../utils/restFetch';
import { METRICS_ENABLED } from './settings';

/**
 * Connection Module
 */

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
  nodeMap: NodeMap = {};

  private subscribers: Subscriber[] = [];

  private initialized: boolean = false;

  initialize = ({
    env = 'prod',
    metrics = METRICS_ENABLED,
    waitTime = baseWait,
  }: Initialization) => {
    this.env = env;
    this.metrics = metrics;
    this.waitTime = typeof waitTime === 'number' ? waitTime : parseInt(waitTime, 10);
    this.nodeMap = {};
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
}

export const connection = new ConnectionState();

/**
 * Performance Monitoring Module
 */
const connectionEl = document.getElementsByTagName('manifold-connection').length
  ? document.getElementsByTagName('manifold-connection')[0]
  : undefined;
if (connectionEl) {
  mark(connectionEl, 'load');
  Array.prototype.slice
    .call(connectionEl.getElementsByTagName('*'))
    .filter((el: HTMLElement) => el.tagName.startsWith('MANIFOLD-'))
    .forEach((el: HTMLElement) => {
      mark(el, 'load');
    });
}

let observer: MutationObserver;
function mutationCallback(mutationsList: MutationRecord[]) {
  mutationsList
    .filter(mutation => mutation.type === 'childList')
    .forEach(mutation => {
      if (Array.isArray(mutation.addedNodes) && mutation.addedNodes.length > 1) {
        mutation.addedNodes.forEach((node: HTMLElement) => {
          if (node.tagName && node.tagName.startsWith('MANIFOLD-')) {
            mark(node, 'load');
            if (node.shadowRoot) {
              observer.observe(node.shadowRoot, { childList: true, subtree: true });
            }
          }
        });
      }
    });
}

observer = new MutationObserver(mutationCallback);
observer.observe(document, { childList: true, subtree: true });
