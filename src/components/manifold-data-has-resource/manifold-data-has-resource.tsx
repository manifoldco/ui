import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import Tunnel from '../../data/connection';

@Component({ tag: 'manifold-data-has-resource', shadow: true })
export class ManifoldDataHasResource {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod; // Provided by manifold-connection
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** Disable auto-updates? */
  @Prop() paused?: boolean = false;
  @State() interval?: number;
  @State() hasResources?: boolean = false;

  @Watch('paused') pausedChange(newPaused: boolean) {
    if (newPaused) {
      window.clearInterval(this.interval);
    } else {
      this.makeInterval();
    }
  }

  componentWillLoad() {
    this.fetchResources();
    if (!this.paused) {
      this.makeInterval();
    }
  }

  componentDidUnload() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  makeInterval() {
    this.interval = window.setInterval(() => this.fetchResources(), 3000);
  }

  async fetchResources() {
    if (!this.connection) {
      return;
    }

    const resourcesResp = await fetch(
      `${this.connection.marketplace}/resources/?me`,
      withAuth(this.authToken)
    );
    const resources: Marketplace.Resource[] = await resourcesResp.json();
    if (Array.isArray(resources) && resources.length) {
      this.hasResources = true;
    }
  }

  render() {
    return <slot name={this.hasResources ? 'has-resource' : 'no-resource'} />;
  }
}

Tunnel.injectProps(ManifoldDataHasResource, ['connection', 'authToken']);
