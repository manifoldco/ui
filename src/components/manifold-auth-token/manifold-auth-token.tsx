import { h, Component, Prop, Watch, Event } from '@stencil/core';
import Tunnel from '../../data/connection';
import { EventEmitter } from 'events';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken: (s: string) => void = () => {};
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop({ mutable: true }) token?: string;
  @Event() manifoldOauthTokenChange: EventEmitter;

  @Watch('token') tokenChange(newToken: string) {
    this.setAuthToken(newToken);

    if ((!this.token && newToken) || (this.token && !newToken)) {
      this.manifoldOauthTokenChange.emit(newToken);
    }
  }

  componentWillLoad() {
    if (this.token) {
      this.setAuthToken(this.token);
    }
  }

  setInternalToken(e: CustomEvent) {
    this.token = e.detail;
  }

  render() {
    return (
      <div>
        <manifold-oauth
          onReceiveManifoldToken={this.setInternalToken}
          oauthUrl="https://manifold-shadowcat-test-server.herokuapp.com/signin/oauth/web"
        ></manifold-oauth>
        <input type="hidden" value={this.token ? 'true' : 'false'} />;
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldAuthToken, ['setAuthToken']);
