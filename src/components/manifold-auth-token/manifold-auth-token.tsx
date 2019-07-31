import { h, Component, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { AuthToken } from '@manifoldco/shadowcat';
import Tunnel from '../../data/connection';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken: (s: string) => void = () => {};
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop({ mutable: true }) token?: string;
  @Prop() oauthUrl?: string;
  @Event() manifoldOauthTokenChange: EventEmitter;

  @Watch('token') tokenChange(newToken: string) {
    this.setAuthToken(newToken);
    this.manifoldOauthTokenChange.emit(newToken);
  }

  componentWillLoad() {
    if (this.token) {
      this.setAuthToken(this.token);
    }
  }

  setInternalToken = (e: CustomEvent) => {
    const payload = e.detail as AuthToken;
    if (!payload.error && payload.expiry) {
      this.token = `${payload.token}`;
    }
  };

  @logger()
  render() {
    return (
      <manifold-oauth onReceiveManifoldToken={this.setInternalToken} oauthUrl={this.oauthUrl} />
    );
  }
}

Tunnel.injectProps(ManifoldAuthToken, ['setAuthToken']);
