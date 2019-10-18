import { h, Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import fetchAllPages from '../../utils/fetchAllPages';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceConnection, Resource, ResourceEdge, Query } from '../../types/graphql';
import query from './resources.graphql';
import queryWithOwner from './resources-with-owner.graphql';

interface EventDetail {
  ownerId?: string;
  resourceId: string;
  resourceLabel: string;
  resourceName: string;
}

@Component({ tag: 'manifold-data-resource-list' })
export class ManifoldDataResourceList {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Disable auto-updates? */
  @Prop() paused?: boolean = false;
  /** Link format structure, with `:resource` placeholder */
  @Prop() resourceLinkFormat?: string;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  /** OwnerId to filter resources by */
  @Prop() ownerId?: string;
  @State() interval?: number;
  @State() resources?: ResourceEdge[];
  @Event({ eventName: 'manifold-resourceList-click', bubbles: true }) clickEvent: EventEmitter;

  @loadMark()
  componentWillLoad() {
    this.fetchResources();
    if (!this.paused) {
      this.interval = window.setInterval(() => this.fetchResources(), 3000);
    }
  }

  componentDidUnload() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  fetchResources = async () => {
    if (!this.graphqlFetch) {
      return;
    }

    this.resources = await fetchAllPages<ResourceEdge>({
      query: this.ownerId ? queryWithOwner : query,
      nextPage: { first: 50, after: '' },
      variables: this.ownerId ? { owner: this.ownerId } : {},
      getConnection: (q: Query) => q.resources,
      graphqlFetch: this.graphqlFetch,
    });
  };

  handleClick(resource: Resource, e: Event) {
    if (!this.resourceLinkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        resourceId: resource.id,
        resourceLabel: resource.label,
        resourceName: resource.displayName,
        ownerId: resource.owner ? resource.owner.id : undefined,
      };
      this.clickEvent.emit(detail);
    }
  }

  formatLink(resource: Resource) {
    if (!this.resourceLinkFormat) {
      return undefined;
    }
    return this.resourceLinkFormat.replace(/:resource/gi, resource.label);
  }

  userResources(resources: ResourceConnection) {
    return resources.edges.filter(
      ({ node }) => node && node.owner && node.owner.id.indexOf('/user/') !== -1
    );
  }

  @logger()
  render() {
    if (!Array.isArray(this.resources)) {
      return null;
    }

    return (
      <ul>
        {this.resources.map(
          ({ node }) =>
            node && (
              <li>
                <a href={this.formatLink(node)} onClick={e => this.handleClick(node, e)}>
                  {node.displayName}
                </a>
              </li>
            )
        )}
      </ul>
    );
  }
}
