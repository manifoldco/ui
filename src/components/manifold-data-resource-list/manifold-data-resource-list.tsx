import { h, Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

import { connection } from '../../global/app';
import { waitForAuthToken } from '../../utils/auth';
import logger, { loadMark } from '../../utils/logger';
import fetchAllPages from '../../utils/fetchAllPages';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import {
  ResourceConnection,
  Resource,
  ResourceEdge,
  Query,
  Data_Resources_With_OwnerQueryVariables,
} from '../../types/graphql';
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
  /** Interval at which this component polls */
  @Prop() pollInterval?: number = 3000;
  /** Link format structure, with `:resource` placeholder */
  @Prop() resourceLinkFormat?: string;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  /** OwnerId to filter resources by */
  @Prop() ownerId?: string;
  @State() poll?: number;
  @State() resources?: ResourceEdge[];
  @Event({ eventName: 'manifold-resourceList-click', bubbles: true }) clickEvent: EventEmitter;

  @loadMark()
  async componentWillLoad() {
    // if auth token missing, wait
    if (!connection.getAuthToken()) {
      await waitForAuthToken(
        () => connection.authToken,
        connection.waitTime,
        () => Promise.resolve()
      );
    }

    // start polling
    this.fetchResources();
    if (!this.paused) {
      this.poll = window.setInterval(() => this.fetchResources(), this.pollInterval);
    }
  }

  componentDidUnload() {
    if (this.poll) {
      window.clearInterval(this.poll);
    }
  }

  fetchResources = async () => {
    if (!this.graphqlFetch) {
      return;
    }

    const variables: Data_Resources_With_OwnerQueryVariables = {
      first: 50,
      after: '',
      owner: this.ownerId,
    };
    this.resources = await fetchAllPages<ResourceEdge>({
      query: queryWithOwner,
      nextPage: { first: 50, after: '' },
      variables,
      getConnection: (q: Query) => q.resources,
      graphqlFetch: this.graphqlFetch,
      element: this.el,
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
