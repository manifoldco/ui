import { h, Component, Prop, State, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import ResourceTunnel from '../../data/resource';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource, ResourceStatusLabel } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';

const query = gql`
  query RESOURCE($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      id
      displayName
      label
      status
      plan {
        id
        displayName
        label
        free
        cost
        product {
          id
          displayName
          label
          logoUrl
        }
        fixedFeatures(first: 500) {
          edges {
            node {
              displayName
              displayValue
            }
          }
        }
        meteredFeatures(first: 500) {
          edges {
            node {
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
        configurableFeatures(first: 500) {
          edges {
            node {
              label
              displayName
              type
              options {
                displayName
                displayValue
              }
              numericDetails {
                increment
                min
                max
                unit
                costTiers {
                  limit
                  cost
                }
              }
            }
          }
        }
        regions(first: 500) {
          edges {
            node {
              id
              displayName
              platform
              dataCenter
            }
          }
        }
      }
    }
  }
`;

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;
  /** Which resource does this belong to? */
  @Prop() resourceLabel?: string;
  /** Set whether or not to refetch the resource from the api until it is in an available and valid state */
  @Prop() refetchUntilValid: boolean = false;
  @State() resource?: Resource;
  @State() loading: boolean = false;
  @State() timeout?: number;

  @Watch('resourceLabel') resourceChange(newName: string) {
    clearTimeout(this.timeout);
    this.fetchResource(newName);
  }

  @Watch('refetchUntilValid') refreshChange(newRefresh: boolean) {
    if (
      newRefresh &&
      (!this.resource || this.resource.status.label !== ResourceStatusLabel.Available)
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
    if (!this.restFetch || !this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    this.loading = true;
    try {
      const { data } = await this.graphqlFetch({ query, variables: { resourceLabel } });

      if (
        this.refetchUntilValid &&
        (!data || (data.resource && data.resource.status.label !== ResourceStatusLabel.Available))
      ) {
        this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
      }

      if (data && data.resource) {
        this.resource = data.resource;
      }
      this.loading = false;
    } catch (error) {
      // In case we actually want to keep fetching on an error
      if (this.refetchUntilValid) {
        this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
      }

      console.error(error);
    }
  };

  @logger()
  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.resource, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
