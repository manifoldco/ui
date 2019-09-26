import { h, Component, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
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
  query GET_RESOURCE($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      label
    }
  }
`;

interface EventDetail {
  hasAnyResources: boolean;
  resourceLabel?: string;
}

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
  @Event({ eventName: 'manifold-hasResource-load', bubbles: true }) loadEvent: EventEmitter;

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

    let hasAnyResources = false;

    const hasSingle = data && data.resource;
    const hasMulti = data && data.resources && data.resources.edges.length;
    if (hasSingle || hasMulti) {
      hasAnyResources = true;
    }

    // emit event
    const detail: EventDetail = {
      hasAnyResources,
      resourceLabel: label,
    };
    this.loadEvent.emit(detail);

    // render slot
    this.hasResource = hasAnyResources;
  }

  @logger()
  render() {
    switch (this.hasResource) {
      case true:
        return <slot name="has-resource" />;
      case false:
        return <slot name="no-resource" />;
      default:
        return <slot name="loading" />;
    }
  }
}
