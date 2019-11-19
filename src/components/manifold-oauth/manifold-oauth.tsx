import { h, Component, Element, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import { AuthToken, PumaAuthToken } from '../../types/auth';
import { METRICS_ENABLED } from '../../global/settings';
import logger from '../../utils/logger';
import connection from '../../state/connection';
import { connections } from '../../utils/connections';
import report from '../../packages/analytics';

@Component({ tag: 'manifold-oauth' })
export class ManifoldOauth {
  @Element() el: HTMLElement;
  @Prop() tick?: string;
  @Event() receiveManifoldToken: EventEmitter<AuthToken>;
  @Watch('tick') keyChange() {
    this.refreshIframe();
  }

  private loadTime?: number;

  get oauthURL() {
    return connections[connection.env].oauth;
  }

  tokenListener = (ev: MessageEvent) => {
    const pumaToken = ev.data as PumaAuthToken;
    const receivedTime = performance.now();

    if (ev.origin === new URL(this.oauthURL).origin) {
      this.receiveManifoldToken.emit({
        token: pumaToken.access_token,
        expiry: pumaToken.expiry,
        error: pumaToken.error,
      });
      if ((connection.metrics || METRICS_ENABLED) && this.loadTime) {
        report(
          {
            name: 'token_received',
            type: 'metric',
            properties: {
              componentName: this.el.tagName,
              duration: receivedTime - this.loadTime,
              uiVersion: '<@NPM_PACKAGE_VERSION@>',
            },
          },
          { env: connection.env }
        );
      }
    }
  };

  componentWillLoad() {
    this.loadTime = performance.now();
    window.addEventListener('message', this.tokenListener);
    return connection.onReady();
  }

  componentDidUnload() {
    window.removeEventListener('message', this.tokenListener);
  }

  refreshIframe() {
    const iframe = this.el.querySelector('iframe');
    if (iframe) {
      // set iframe src again to refresh. Works in Chrome, Firefox, and Safari.
      iframe.setAttribute('src', this.oauthURL);
    }
  }

  @logger()
  render() {
    return (
      <iframe
        src={this.oauthURL}
        allowtransparency="true"
        aria-hidden="true"
        frameborder="0"
        id="manifold-oauth-window"
        name="manifold-oauth-window"
        scrolling="no"
        tabindex="-1"
        sandbox="allow-scripts allow-same-origin"
        style={{
          border: 'none', // don’t have a border
          display: 'block', // SUPER important for iframe to not be display: none
          height: '1px', // take up height, just in case
          left: '0', // don’t cause horizontal scrollbars
          margin: '0px', // don’t have margins
          padding: '0px', // don’t have padding
          pointerEvents: 'none', // don’t block user clicks
          position: 'fixed', // don’t cause reflow
          userSelect: 'none', // don’t allow selection
          visibility: 'hidden', // exist, but don’t be visible
          width: '75vw', // take up width w/o scrollbars
        }}
      />
    );
  }
}
