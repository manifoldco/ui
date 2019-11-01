import { h, Element, Component, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource, ResourceStatusLabel } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';

const query = gql`
  query RESOURCE($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      id
      label
      region {
        id
        displayName
      }
      status {
        label
      }
      plan {
        id
        label
        displayName
        state
        cost
        free
        regions(first: 20) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              displayName
              platform
              dataCenter
            }
            cursor
          }
        }
        product {
          id
          displayName
          tagline
          label
          logoUrl
        }
        fixedFeatures(first: 20) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              label
              displayName
              displayValue
            }
          }
        }
        meteredFeatures(first: 20) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              label
              displayName
              numericDetails {
                unit
                costTiers {
                  limit
                  cost
                }
              }
            }
          }
        }
        configurableFeatures(first: 20) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              label
              displayName
              type
              options {
                id
                label
                displayName
                displayValue
              }
              numericDetails {
                unit
                costTiers {
                  limit
                  cost
                }
              }
            }
          }
        }
      }
    }
  }
`;

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Which resource does this belong to? */
  @Prop() resourceLabel?: string;
  /** Set whether or not to refetch the resource from the api until it is in an available and valid state */
  @Prop() refetchUntilValid: boolean = false;
  @State() gqlData?: Resource;
  @State() loading: boolean = true;
  @State() timeout?: number;
  @Event({ eventName: 'manifold-resource-load' }) resourceLoad: EventEmitter;

  @Watch('resourceLabel') resourceChange(newName: string) {
    clearTimeout(this.timeout);
    this.fetchResource(newName);
  }

  @Watch('refetchUntilValid') refreshChange(newRefresh: boolean) {
    if (
      newRefresh &&
      (!this.gqlData || this.gqlData.status.label !== ResourceStatusLabel.Available)
    ) {
      this.fetchResource(this.resourceLabel);
    }
  }

  @loadMark()
  componentWillLoad() {
    return this.fetchResource(this.resourceLabel);
  }

  componentDidUnload() {
    clearTimeout(this.timeout);
  }

  fetchResource = async (resourceLabel?: string) => {
    if (!this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    const { data, errors } = await this.graphqlFetch({
      query,
      variables: { resourceLabel },
      element: this.el,
    });

    if (data && data.resource) {
      this.gqlData = data.resource;
      // Once data has been loaded once, don’t re-show skeletons anywhere (even if re-polling)
      this.loading = false;
      this.resourceLoad.emit();
    }

    if (
      this.refetchUntilValid &&
      (!data || !data.resource || data.resource.status.label !== ResourceStatusLabel.Available)
    ) {
      this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
    }

    if (errors) {
      if (this.refetchUntilValid) {
        this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
      }
    }
  };

  @logger()
  render() {
    return (
      <ResourceTunnel.Provider state={{ gqlData: this.gqlData, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
