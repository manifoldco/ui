import { h, Component, Element, Prop, State, Watch } from '@stencil/core';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import resourceQuery from './resource.graphql';
import { ResourceLogoQuery } from '../../types/graphql';

interface ProductState {
  logoUrl: string;
  displayName: string;
}

@Component({ tag: 'manifold-data-resource-logo' })
export class ManifoldDataResourceLogo {
  @Element() el: HTMLElement;
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Look up product logo from resource */
  @Prop() resourceLabel?: string;
  @State() product?: ProductState;

  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  @loadMark()
  componentWillLoad() {
    this.fetchResource(this.resourceLabel);
  }

  fetchResource = async (resourceLabel?: string) => {
    if (!this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    this.product = undefined;

    const { data } = await this.graphqlFetch<ResourceLogoQuery>({
      query: resourceQuery,
      variables: { resourceLabel },
      element: this.el,
    });

    if (data) {
      const newProduct = {
        displayName: data.resource.plan.product.displayName,
        logoUrl: data.resource.plan.product.logoUrl,
      };
      this.product = newProduct;
    }
  };

  @logger()
  render() {
    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}
