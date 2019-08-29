import { h, Component, Prop } from '@stencil/core';
import logger from '../../utils/logger';

declare global {
  interface Window {
    DD_LOGS: any;
  }
}

const loggableEvents = [
  'manifold-rest-fetch-duration',
  'manifold-graphql-fetch-duration',
  'manifold-error',
];

@Component({ tag: 'manifold-performance' })
export class ManifoldPerformance {
  @Prop({ mutable: true }) ddLogs?: any;
  private ddScript: HTMLScriptElement;
  private logQueue: CustomEvent[] = [];

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
    if (!this.ddLogs) {
      this.logQueue.push(e);
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
  }

  componentDidRender() {
    this.ddScript.addEventListener('load', this.ddLoadListener);
    if (window.DD_LOGS || this.ddLogs) {
      this.ddLoadListener();
    }
  }

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
