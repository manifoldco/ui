import { h, Component } from '@stencil/core';
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
  private ddScript: HTMLScriptElement;

  ddLoadListener = () => {
    window.DD_LOGS.init({
      clientToken: '<@DATADOG_CLIENT_TOKEN@>',
      forwardErrorsToLogs: false,
    });
    window.DD_LOGS.addLoggerGlobalContext('browser-source', 'manifold-ui');
  };

  logMetric = (e: CustomEvent) => {
    window.DD_LOGS.logger.info(e.type, e.detail);
  };

  componentDidLoad() {
    loggableEvents.forEach(eventType =>
      window.addEventListener(eventType, (e: CustomEvent) => this.logMetric(e))
    );
  }

  componentDidUnload() {
    this.ddScript.removeEventListener('load', this.ddLoadListener);
  }

  componentDidRender() {
    this.ddScript.addEventListener('load', () => this.ddLoadListener);
    if (window.DD_LOGS) {
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
