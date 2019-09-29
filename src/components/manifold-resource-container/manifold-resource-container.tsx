import { h, Component, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Gateway } from '../../types/gateway';
import connection from '../../state/connection';
import ResourceTunnel from '../../data/resource';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Product, Resource } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';

const query = gql`
  query RESOURCE($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      plan {
        product {
          id
          displayName
          label
          logoUrl
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
  @State() resource?: Gateway.Resource;
  @State() gqlData?: Resource;
  @State() loading: boolean = true;
  @State() timeout?: number;
  @Event({ eventName: 'manifold-resource-load' }) resourceLoad: EventEmitter;

  @Watch('resourceLabel') resourceChange(newName: string) {
    clearTimeout(this.timeout);
    this.fetchResource(newName);
  }

  @Watch('refetchUntilValid') refreshChange(newRefresh: boolean) {
    if (newRefresh && (!this.resource || this.resource.state !== 'available')) {
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

    try {
      const response = await this.restFetch<Gateway.Resource & { product?: Product }>({
        service: 'gateway',
        endpoint: `/resources/me/${resourceLabel}`,
      });

      const { data } = await this.graphqlFetch({ query, variables: { resourceLabel } });

      if (this.refetchUntilValid && (!response || response.state !== 'available')) {
        this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
      }

      this.resource = response;
      if (data && data.resource) {
        this.gqlData = data.resource;
        // Once data has been loaded once, don’t re-show skeletons anywhere (even if re-polling)
        this.loading = false;
        this.resourceLoad.emit();
      }
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
      <ResourceTunnel.Provider
        state={{ data: this.resource, gqlData: this.gqlData, loading: this.loading }}
      >
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
