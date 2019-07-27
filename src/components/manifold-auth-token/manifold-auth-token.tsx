import { h, Component, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { AuthToken } from '@manifoldco/shadowcat';
import Tunnel from '../../data/connection';
import { isExpired } from '../../utils/auth';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken: (s: string) => void = () => {};
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop({ mutable: true }) token?: string;
  @Event() manifoldOauthTokenChange: EventEmitter;

  @Watch('token') tokenChange(newToken: string) {
    this.setAuthToken(newToken);
    this.manifoldOauthTokenChange.emit(newToken);
  }

  componentWillLoad() {
    if (this.token) {
      if (!isExpired(this.token)) {
        this.setAuthToken(this.token);
      }
    }
  }

  setInternalToken = (e: CustomEvent) => {
    const payload = e.detail as AuthToken;
    console.log(payload);
    if (!payload.error && payload.expiry) {
      const expiry = payload.expiry.toString();
      this.token = `${payload.token}.${expiry}`;
      console.log(this.token);
    }
  };

  render() {
    return (
      <div>
        <manifold-oauth
          onReceiveManifoldToken={this.setInternalToken}
          oauthUrl="http://login.arigato.tools/signin/oauth/web"
        ></manifold-oauth>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldAuthToken, ['setAuthToken']);
