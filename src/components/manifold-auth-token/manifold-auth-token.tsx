import { h, Component, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

import { AuthToken } from '@manifoldco/shadowcat';
import Tunnel from '../../data/connection';
import logger from '../../utils/logger';
import { isExpired } from '../../utils/auth';
import { Subscriber } from '../../state/connection';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() setAuthToken?: (s: string) => void = () => {};
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() subscribe?: (s: Subscriber) => () => void = () => () => {};
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop() token?: string;
  @State() tick?: string;
  @Event({ eventName: 'manifold-token-receive', bubbles: true })
  manifoldOauthTokenChange: EventEmitter<{ token: string }>;

  private unsubscribe = () => {};

  @Watch('token') tokenChange(newToken?: string) {
    this.setExternalToken(newToken);
  }

  componentWillLoad() {
    this.setExternalToken(this.token);
    if (this.subscribe) {
      this.unsubscribe = this.subscribe((oldToken?: string, newToken?: string) => {
        if (oldToken && !newToken) {
          // changing this to any new string will cause a token refresh. getTime() does that wonderfully.
          this.tick = new Date().getTime().toString();
        }
      });
    }
  }

  componentDidUnload() {
    this.unsubscribe();
  }

  setExternalToken(token?: string) {
    if (token) {
      if (!isExpired(token) && this.setAuthToken) {
        this.setAuthToken(token);
      }
    }
  }

  setInternalToken = (e: CustomEvent) => {
    const payload = e.detail as AuthToken;
    if (!payload.error && payload.expiry) {
      const formattedToken = `${payload.token}|${payload.expiry}`;
      if (this.setAuthToken) {
        this.setAuthToken(formattedToken);
      }
      this.manifoldOauthTokenChange.emit({ token: formattedToken });
    }
  };

  @logger()
  render() {
    return <manifold-oauth tick={this.tick} onReceiveManifoldToken={this.setInternalToken} />;
  }
}

Tunnel.injectProps(ManifoldAuthToken, ['setAuthToken', 'subscribe']);
