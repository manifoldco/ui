import { h, Component, Prop, Watch } from '@stencil/core';
// import '@manifoldco/shadowcat';
import Tunnel from '../../data/connection';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken?: (s: string) => void;
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop() token?: string;

  @Watch('token') tokenChange(newToken: string) {
    return this.setAuthToken && this.setAuthToken(newToken);
  }

  componentWillLoad() {
    if (this.setAuthToken && this.token) {
      this.setAuthToken(this.token);
    }
  }
  async componentDidLoad() {
    document.addEventListener('receiveManifoldToken', (e: CustomEvent) => {
      this.token = e.detail;
    });
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
