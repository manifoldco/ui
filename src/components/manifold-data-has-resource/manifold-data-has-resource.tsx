import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';

const allResources = gql`
  query LIST_RESOURCES {
    resources(first: 1) {
      edges {
        node {
          label
        }
      }
    }
  }
`;

const singleResource = gql`
  query GET_RESOURCE {
    resource(label: $resourceLabel) {
      label
    }
  }
`;

@Component({ tag: 'manifold-data-has-resource', shadow: true })
export class ManifoldDataHasResource {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Disable auto-updates? */
  @Prop() label?: string;
  @Prop() paused?: boolean = false;
  @State() interval?: number;
  @State() hasResource?: boolean;

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

  async fetchResources(label = this.label) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({
      query: label ? singleResource : allResources,
      variables: { resourceLabel: label },
    });

    if ((data && data.resource) || (data && data.resources && data.resources.edges.length)) {
      this.hasResource = true; // if this resource exists, or user has > 0 resources
    } else {
      this.hasResource = false;
    }
  }

  @logger()
  render() {
    // render loading slot while loading
    if (this.hasResource === undefined) {
      return <slot name="loading" />;
    }
    return <slot name={this.hasResource ? 'has-resource' : 'no-resource'} />;
  }
}
