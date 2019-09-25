import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource } from '../../types/graphql';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { Error } from '../Error';

const query = gql`
  query RESOURCE($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      label
      displayName
      plan {
        product {
          displayName
          logoUrl
        }
      }
      status {
        label
      }
    }
  }
`;

@Component({ tag: 'manifold-resource-card' })
export class ManifoldResourceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() label?: string;
  @Prop() resourceLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() resource?: Resource;
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

    const { data, errors } = await this.graphqlFetch({ query, variables: { resourceLabel } });

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
      const { label, displayName, plan, id, status } = this.resource;
      const { logoUrl } = (plan && plan.product) || {};

      return [
        <manifold-resource-card-view
          label={label}
          name={displayName}
          logo={logoUrl}
          resourceId={id}
          resourceStatus={status.label}
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
