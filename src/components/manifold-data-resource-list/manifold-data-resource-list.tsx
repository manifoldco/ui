import { h, Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import Tunnel from '../../data/connection';
import logger from '../../utils/logger';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceConnection, Resource } from '../../types/graphql';

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
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch;
  /** Disable auto-updates? */
  @Prop() paused?: boolean = false;
  /** Link format structure, with `:resource` placeholder */
  @Prop() resourceLinkFormat?: string;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  @State() interval?: number;
  @State() resources?: ResourceConnection;
  @Event({ eventName: 'manifold-resourceList-click', bubbles: true }) clickEvent: EventEmitter;

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

    try {
      const { data, errors } = await this.graphqlFetch<'resources'>({
        query,
      });

      if (data) {
        this.resources = data.resources;
      }

      if (errors) {
        errors.forEach(error => {
          throw new Error(error.message);
        });
      }
    } catch (e) {
      console.error(e);
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

  static userResources(resources: ResourceConnection) {
    return resources.edges.filter(
      ({ node }) => node && node.owner && node.owner.id.indexOf('/user/') !== -1
    );
  }

  @logger()
  render() {
    if (!this.resources || !Array.isArray(this.resources.edges)) {
      return null;
    }

    return (
      <ul>
        {this.resources.edges.map(
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
Tunnel.injectProps(ManifoldDataResourceList, ['graphqlFetch']);
