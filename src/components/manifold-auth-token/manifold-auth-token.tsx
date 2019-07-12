import { h, Component, Prop, Element, Watch } from '@stencil/core';
import { defineCustomElements } from '@manifoldco/shadowcat/dist/loader';
import Tunnel from '../../data/connection';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken?: (s: string) => void;
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop() token?: string;

  @Watch('token') tokenChange(newToken: string) {
    return this.setAuthToken && this.setAuthToken(newToken);
  }

  componentWillLoad() {
    defineCustomElements(window);

    if (this.setAuthToken && this.token) {
      this.setAuthToken(this.token);
    }
  }

  componentDidLoad() {
    function listener(el: Element | null) {
      return new Promise<string>(resolve => {
        if (el) {
          el.addEventListener('receiveManifoldToken', (e: CustomEvent) => {
            console.log('token received from iframe: ', e.detail);
            resolve(e.detail);
          });
        }
      });
    }

    async function setToken(el: Element | null) {
      const newToken: string = await listener(el);
      console.log('newToken:', newToken);
      return newToken;
    }

    const oauth = document.querySelector('#test');
    const newToken = setToken(oauth);

    // this is setting the token to be a Promise<string> and I don't understand
    // how to turn it into a string in the setToken() function
    if (this.token) {
      this.token = newToken;
    }
  }

  componentWillUpdate() {
    if (this.token) {
      console.log('TOKEN WILL UPDATE: ', this.token);
    }
  }

  render() {
    return (
      <div>
        <manifold-oauth
          id="test"
          oauthUrl="https://manifold-shadowcat-test-server.herokuapp.com/signin/oauth/web"
        ></manifold-oauth>
        <input type="hidden" value={this.token ? 'true' : 'false'} />;
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldAuthToken, ['setAuthToken']);
