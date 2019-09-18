import { h, Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { ResourceConnection, Resource, ResourceEdge } from '../../types/graphql';

interface EventDetail {
  ownerId?: string;
  resourceId: string;
  resourceLabel: string;
  resourceName: string;
}

const query = gql`
  query RESOURCES {
    resources(first: 500) {
      edges {
        node {
          id
          displayName
          label
          owner {
            id
          }
        }
      }
    }
  }
`;

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
  @State() interval?: number;
  @State() resources?: ResourceEdge[];
  @State() errors?: GraphqlError[];
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

    const { data, errors } = await this.graphqlFetch({
      query,
    });

    if (data) {
      this.resources = (data.resources && data.resources.edges) || [];
    } else if (errors) {
      this.errors = errors;
    }
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

    if (this.errors) {
      return 'Resources not found.';
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
