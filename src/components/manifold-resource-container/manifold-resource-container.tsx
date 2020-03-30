import { h, Element, Component, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';
import {
  ResourceStatusLabel,
  ResourceWithOwnerQuery,
  ResourceWithOwnerQueryVariables,
} from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import queryWithOwner from './resource-with-owner.graphql';

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Which resource does this belong to? */
  @Prop() resourceLabel?: string;
  /** Set whether or not to refetch the resource from the api until it is in an available and valid state */
  @Prop() refetchUntilValid?: boolean = false;
  /** OwnerId to filter resources by */
  @Prop() ownerId?: string;
  @State() gqlData?: ResourceWithOwnerQuery['resource'];
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
    this.fetchResource(this.resourceLabel);
  }

  componentDidUnload() {
    clearTimeout(this.timeout);
  }

  fetchResource = async (resourceLabel?: string) => {
    if (!this.graphqlFetch || !resourceLabel) {
      return;
    }

    // for this component, wait for auth before fetching
    if (!connection.getAuthToken()) {
      return;
    }

    const variables: ResourceWithOwnerQueryVariables = { resourceLabel, owner: this.ownerId };
    const { data, errors } = await this.graphqlFetch<ResourceWithOwnerQuery>({
      query: queryWithOwner,
      variables,
      element: this.el,
    });

    if (data && data.resource) {
      this.gqlData = data.resource;
      // Once data has been loaded once, don’t re-show skeletons anywhere (even if re-polling)
      this.loading = false;
      this.resourceLoad.emit();
    }

    const resourceNotAvailable = data?.resource?.status?.label !== ResourceStatusLabel.Available;

    if (this.refetchUntilValid && (errors || resourceNotAvailable)) {
      this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
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
