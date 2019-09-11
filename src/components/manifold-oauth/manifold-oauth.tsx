import { h, Component, Element, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import { AuthToken, PumaAuthToken } from '../../types/auth';
import logger from '../../utils/logger';

const OAUTH_ORIGIN = 'https://login.manifold.co';
const OAUTH_URL = `${OAUTH_ORIGIN}/signin/oauth/web`;

@Component({ tag: 'manifold-oauth' })
export class ManifoldOauth {
  @Element() el: HTMLElement;
  @Prop() tick?: string;
  @Event() receiveManifoldToken: EventEmitter<AuthToken>;
  @Watch('tick') keyChange() {
    this.refreshIframe();
  }

  private loadTime?: Date;

  tokenListener = (ev: MessageEvent) => {
    const pumaToken = ev.data as PumaAuthToken;

    if (ev.origin === OAUTH_ORIGIN) {
      this.receiveManifoldToken.emit({
        token: pumaToken.access_token,
        expiry: pumaToken.expiry,
        error: pumaToken.error,
        duration: new Date().getTime() - (this.loadTime ? this.loadTime.getTime() : 0),
      });
    }
  };

  componentWillLoad() {
    this.loadTime = new Date();
    window.addEventListener('message', this.tokenListener);
  }

  componentDidUnload() {
    window.removeEventListener('message', this.tokenListener);
  }

  refreshIframe() {
    const iframe = this.el.querySelector('iframe');
    if (iframe) {
      // set iframe src again to refresh. Works in Chrome, Firefox, and Safari.
      iframe.setAttribute('src', OAUTH_URL);
    }
  }

  @logger()
  render() {
    return (
      <iframe
        src={OAUTH_URL}
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
