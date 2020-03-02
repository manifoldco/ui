import { h, Element, Component, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

import connection from '../../state/connection';
import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { ResourceStatusLabel, GetResourceQuery } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import query from './resource.graphql';

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Which resource does this belong to? */
  @Prop() resourceLabel?: string;
  /** Set whether or not to refetch the resource from the api until it is in an available and valid state */
  @Prop() refetchUntilValid?: boolean = false;
  @State() gqlData?: GetResourceQuery['resource'];
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
    if (!this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    const { data, errors } = await this.graphqlFetch<GetResourceQuery>({
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
      (errors ||
        !data ||
        !data.resource ||
        data.resource.status.label !== ResourceStatusLabel.Available)
    ) {
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
