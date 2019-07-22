import { h, Component, Prop, Element, Watch } from '@stencil/core';
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
    if (this.setAuthToken && this.token) {
      this.setAuthToken(this.token);
    }

    setTimeout(() => {
      if (this.setAuthToken) this.setAuthToken('NEW_TOKEN');
    }, 2000);
  }

  render() {
    return <input type="hidden" value={this.token ? 'true' : 'false'} />;
  }
}

Tunnel.injectProps(ManifoldAuthToken, ['setAuthToken']);
