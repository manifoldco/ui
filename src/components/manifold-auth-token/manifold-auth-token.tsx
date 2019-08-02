import { h, Component, Prop, Watch, Event, EventEmitter } from '@stencil/core';

import { AuthToken } from '@manifoldco/shadowcat';
import Tunnel from '../../data/connection';
import logger from '../../utils/logger';
import { isExpired } from '../../utils/auth';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken: (s: string) => void = () => {};
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop() token?: string;
  @Prop() oauthUrl?: string;
  @Event() manifoldOauthTokenChange: EventEmitter;

  @Watch('token') tokenChange(newToken?: string) {
    this.setExternalToken(newToken);
  }

  componentWillLoad() {
    this.setExternalToken(this.token);
  }

  setExternalToken(token?: string) {
    if (token) {
      if (!isExpired(token)) {
        this.setAuthToken(token);
      }
    }
  }

  setInternalToken = (e: CustomEvent) => {
    const payload = e.detail as AuthToken;
    if (!payload.error && payload.expiry) {
      const formattedToken = `${payload.token}|${payload.expiry}`;
      this.setAuthToken(formattedToken);
      this.manifoldOauthTokenChange.emit(formattedToken);
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
