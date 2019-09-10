import { h, Component, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

import { AuthToken } from '@manifoldco/shadowcat';
import logger from '../../utils/logger';
import { isExpired } from '../../utils/auth';
import connection, { Subscriber } from '../../state/connection';

@Component({ tag: 'manifold-auth-token' })
export class ManifoldAuthToken {
  /** _(hidden)_ */
  @Prop() setAuthToken?: (s: string) => void = connection.setAuthToken;
  /** _(hidden)_ */
  @Prop() subscribe?: (s: Subscriber) => () => void = connection.subscribe;
  /* Authorisation header token that can be used to authenticate the user in manifold */
  @Prop() token?: string;
  @Prop() useOauth?: boolean;
  @Prop() refresh?: () => Promise<AuthToken>;
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
          if (this.useOauth) {
            // changing this to any new string will cause a token refresh. getTime() does that wonderfully.
            this.tick = new Date().getTime().toString();
          } else if (this.refresh) {
            this.refresh().then(this.setToken);
          }
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

  setInternalToken = (e: CustomEvent<AuthToken>) => {
    this.setToken(e.detail);
  };

  setToken = (payload: AuthToken) => {
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
    return (
      this.useOauth && (
        <manifold-oauth tick={this.tick} onReceiveManifoldToken={this.setInternalToken} />
      )
    );
  }
}
