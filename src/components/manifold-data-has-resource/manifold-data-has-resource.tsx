import { h, Component, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';

import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';
import { GraphqlFetch } from '../../utils/graphqlFetch';

import firstResourceQuery from './first-resource.graphql';
import resourceByLabelQuery from './resource-by-label.graphql';
import {
  ResourceByLabelQuery,
  FirstResourceQuery,
  ResourceByLabelQueryVariables,
  FirstResourceQueryVariables,
} from '../../types/graphql';

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
  /** Adjust poll frequency */
  @Prop() pollInterval?: number = 3000;
  @Prop() ownerId?: string;
  @Prop() paused?: boolean = false;
  @State() poll?: number;
  @State() hasResource?: boolean;
  @Event({ eventName: 'manifold-hasResource-load', bubbles: true }) loadEvent: EventEmitter;

  @Watch('paused') pausedChange(newPaused: boolean) {
    if (newPaused) {
      window.clearInterval(this.poll);
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
    if (this.poll) {
      window.clearInterval(this.poll);
    }
  }

  makeInterval() {
    this.poll = window.setInterval(() => this.fetchResources(), this.pollInterval);
  }

  async fetchResources(label = this.label) {
    if (!this.graphqlFetch || document.hidden) {
      return;
    }

    const variables: ResourceByLabelQueryVariables | FirstResourceQueryVariables = {
      resourceLabel: label,
      owner: this.ownerId,
    };
    const { data } = await this.graphqlFetch<ResourceByLabelQuery & FirstResourceQuery>({
      query: label ? resourceByLabelQuery : firstResourceQuery,
      variables,
      element: this.el,
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
