import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';

@Component({ tag: 'manifold-data-has-resource', shadow: true })
export class ManifoldDataHasResource {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
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
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    const resources: Marketplace.Resource[] = await response;
    if (Array.isArray(resources) && resources.length) {
      this.hasResources = true;
    }
  }

  render() {
    return <slot name={this.hasResources ? 'has-resource' : 'no-resource'} />;
  }
}

Tunnel.injectProps(ManifoldDataHasResource, ['restFetch']);
