import { h, Component, Prop, Watch, Event, EventEmitter } from '@stencil/core';

import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import connection from '../../state/connection';
import { report } from '../../utils/errorReport';
import { PumaAuthToken } from '../../types/auth';
import { connections } from '../../utils/connections';

export type AuthType = 'oauth' | 'manual';

@Component({ tag: 'manifold-connection' })
export class ManifoldConnection {
  @Prop() env?: 'local' | 'stage' | 'prod';
  @Prop() waitTime?: number;
  @Prop() token?: string;
  @Prop() authType?: AuthType = 'oauth';
  @Event({ eventName: 'manifold-token-receive', bubbles: true })
  manifoldTokenReceive: EventEmitter<{ token: string; duration: number }>;
  @Event({ eventName: 'manifold-token-clear', bubbles: true }) clear: EventEmitter;

  private unsubscribe = () => {};
  private loadTime: Date = new Date();
  private iframe?: HTMLIFrameElement;

  @Watch('token') tokenChange(newToken?: string) {
    connection.initialize({ env: this.env, waitTime: this.waitTime, authToken: newToken });
  }

  @loadMark()
  componentWillLoad() {
    this.loadTime = new Date();
    this.unsubscribe = connection.subscribe((oldToken?: string, newToken?: string) => {
      if (oldToken && !newToken) {
        if (this.authType === 'oauth' && this.iframe) {
          this.iframe.setAttribute('src', this.oauthURL);
        }
        this.clear.emit();
      }
    });
    window.addEventListener('message', this.tokenListener);
    connection.initialize({ env: this.env, waitTime: this.waitTime, authToken: this.token });
  }

  componentDidUnload() {
    this.unsubscribe();
  }

  get oauthURL() {
    return connections[connection.env].oauth;
  }

  tokenListener = (ev: MessageEvent) => {
    const payload = ev.data as PumaAuthToken;

    if (payload.error) {
      report(payload.error);
      return;
    }

    if (!payload.error && payload.expiry && payload.access_token) {
      connection.initialize({ env: this.env, waitTime: this.waitTime, authToken: this.token });
      this.manifoldTokenReceive.emit({
        token: payload.access_token,
        duration: new Date().getTime() - this.loadTime.getTime(),
      });
    }
  };

  @logger()
  render() {
    return [
      <slot />,
      <iframe
        src={this.oauthURL}
        ref={node => (this.iframe = node)}
        allowtransparency="true"
        aria-hidden="true"
        frameborder="0"
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
      />,
    ];
  }
}
