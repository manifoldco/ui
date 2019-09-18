import { h, Component, Prop, Element } from '@stencil/core';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

declare global {
  interface Window {
    DD_LOGS: any;
  }
}

const loggableEvents = [
  'manifold-rest-fetch-duration',
  'manifold-graphql-fetch-duration',
  'manifold-error',
  'manifold-time-to-render',
  'receiveManifoldToken',
];

@Component({ tag: 'manifold-performance' })
export class ManifoldPerformance {
  @Prop({ mutable: true }) ddLogs?: any;
  @Element() el: HTMLElement;
  private ddScript: HTMLScriptElement;
  private logQueue: CustomEvent[] = [];
  private observer: MutationObserver;

  ddLoadListener = () => {
    if (window.DD_LOGS) {
      this.ddLogs = window.DD_LOGS;
    }
    this.ddLogs.init({
      clientToken: '<@DATADOG_CLIENT_TOKEN@>',
      forwardErrorsToLogs: false,
    });
    this.ddLogs.addLoggerGlobalContext('browser-source', 'manifold-ui');
    this.logQueue.forEach(this.logMetric);
    this.logQueue = [];
  };

  logMetric = (e: CustomEvent) => {
    if (e.type === 'receiveManifoldToken' && !e.detail.token) {
      // Only log duration if token is defined
      return;
    }
    if (e.type === 'receiveManifoldToken') {
      delete e.detail.token;
      delete e.detail.expiry;
    }
    if (!this.ddLogs) {
      this.logQueue.push(e);
      return;
    }

    if (e.type === 'manifold-error' || (e.type === 'receiveManifoldToken' && e.detail.error)) {
      this.ddLogs.logger.error(e.type, { type: e.type, ...e.detail });
    } else {
      this.ddLogs.logger.info(e.type, { type: e.type, ...e.detail });
    }
  };

  componentDidLoad() {
    loggableEvents.forEach(eventType => window.addEventListener(eventType, this.logMetric));
  }

  componentDidUnload() {
    this.ddScript.removeEventListener('load', this.ddLoadListener);
    loggableEvents.forEach(eventType => window.removeEventListener(eventType, this.logMetric));
    this.observer.disconnect();
  }

  componentDidRender() {
    this.ddScript.addEventListener('load', this.ddLoadListener);
    if (window.DD_LOGS || this.ddLogs) {
      this.ddLoadListener();
    }
  }

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <script
        type="text/javascript"
        src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"
        ref={(el: HTMLScriptElement) => {
          this.ddScript = el;
        }}
      ></script>
    );
  }
}
