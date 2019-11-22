import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { ResourceCardQuery, ResourceCardQueryVariables } from '../../types/graphql';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { Error } from '../Error';

import resourceCardQuery from './resource-card.graphql';

@Component({ tag: 'manifold-resource-card' })
export class ManifoldResourceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() label?: string;
  @Prop() resourceLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() resource?: ResourceCardQuery['resource'];
  @State() errors?: GraphqlError[];

  @Watch('label') resourceLabelChange(newLabel: string) {
    this.fetchResource(newLabel);
  }

  @loadMark()
  componentWillLoad() {
    this.fetchResource(this.label);
  }

  async fetchResource(resourceLabel?: string) {
    if (!this.graphqlFetch || !resourceLabel) {
      return;
    }
    const variables: ResourceCardQueryVariables = { resourceLabel };
    const { data, errors } = await this.graphqlFetch<ResourceCardQuery>({
      query: resourceCardQuery,
      variables,
      element: this.el,
    });

    if (data && data.resource) {
      this.resource = data.resource;
    }

    if (errors) {
      this.errors = errors;
    }
  }

  @logger()
  render() {
    if (this.resource) {
      const { label, plan, id } = this.resource;
      const { logoUrl } = (plan && plan.product) || {};

      return [
        <manifold-resource-card-view
          label={label}
          logo={logoUrl}
          resourceId={id}
          resourceLinkFormat={this.resourceLinkFormat}
          preserveEvent={this.preserveEvent}
        />,
        <Error errors={this.errors} />,
      ];
    }

    // ☠
    return <manifold-resource-card-view label="loading" loading={true} />;
  }
}
