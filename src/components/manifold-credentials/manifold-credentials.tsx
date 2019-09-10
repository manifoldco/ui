import { h, Element, Component, Prop, State } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { CredentialEdge } from '../../types/graphql';
import connection from '../../state/connection';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-credentials' })
export class ManifoldCredentials {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() resourceLabel?: string = '';
  @State() credentials?: CredentialEdge[];
  @State() errors?: GraphqlError[];
  @State() loading?: boolean = false;
  @State() shouldTransition: boolean = false;

  hideCredentials = () => {
    this.credentials = undefined;
  };

  fetchCredentials = async () => {
    if (!this.graphqlFetch) {
      return;
    }

    this.errors = undefined;
    this.loading = true;

    const { data, errors } = await this.graphqlFetch({
      query: gql`
        query RESOURCE_CREDENTIALS($resourceLabel: String!) {
          resource(label: $resourceLabel) {
            credentials(first: 25) {
              edges {
                node {
                  key
                  value
                }
              }
            }
          }
        }
      `,
      variables: { resourceLabel: this.resourceLabel },
    });

    if (errors) {
      this.errors = errors;
    }

    this.credentials =
      (data && data.resource && data.resource.credentials && data.resource.credentials.edges) ||
      undefined;

    this.loading = false;
  };

  credentialsRequested = () => {
    this.fetchCredentials();
    this.loading = false;
  };

  @logger()
  render() {
    return [
      <manifold-credentials-view
        credentials={this.credentials}
        loading={this.loading}
        onCredentialsRequested={this.credentialsRequested}
        resourceLabel={this.resourceLabel}
      >
        <manifold-forward-slot slot="show-button">
          <slot name="show-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="hide-button">
          <slot name="hide-button" />
        </manifold-forward-slot>
      </manifold-credentials-view>,
      this.errors
        ? this.errors.map(({ message }) => (
            <manifold-toast alert-type="error">{message}</manifold-toast>
          ))
        : null,
    ];
  }
}
