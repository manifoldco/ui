import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import connection from '../../state/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-data-has-resource', shadow: true })
export class ManifoldDataHasResource {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch = connection.restFetch;
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

  @loadMark()
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

    const resources = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me`,
    });

    if (resources && resources.length) {
      this.hasResources = true;
    }
  }

  @logger()
  render() {
    return <slot name={this.hasResources ? 'has-resource' : 'no-resource'} />;
  }
}
