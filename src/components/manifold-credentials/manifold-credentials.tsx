import { h, Element, Component, Method, Prop, State } from '@stencil/core';

import { ResourceCredentialsQuery, ResourceCredentialsQueryVariables } from '../../types/graphql';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';
import resourceCredentialsQuery from './resourceCredentials.graphql';

@Component({ tag: 'manifold-credentials' })
export class ManifoldCredentials {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() noCredentials?: boolean = false;
  @Prop() ownerId?: string;
  @Prop() resourceLabel?: string = '';
  @State() credentials?: ResourceCredentialsQuery['resource']['credentials']['edges'];
  @State() errors?: GraphqlError[];
  @State() loading?: boolean = false;
  @State() shouldTransition: boolean = false;

  @loadMark()
  componentWillLoad() {}

  hideCredentials = () => {
    this.credentials = undefined;
  };

  @Method()
  async showCredentials() {
    if (!this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    this.errors = undefined;
    this.loading = true;
    this.credentials = undefined;

    const variables: ResourceCredentialsQueryVariables = {
      resourceLabel: this.resourceLabel,
      owner: this.ownerId,
    };
    const { data, errors } = await this.graphqlFetch<ResourceCredentialsQuery>({
      query: resourceCredentialsQuery,
      variables,
      element: this.el,
    });

    if (errors) {
      this.errors = errors;
    }

    if (data) {
      this.credentials = data.resource.credentials.edges;
    }

    this.loading = false;
  }

  credentialsRequested = () => {
    this.showCredentials();
    this.loading = false;
  };

  @logger()
  render() {
    if (this.noCredentials || (this.credentials && this.credentials.length === 0)) {
      return (
        <manifold-no-credentials resourceLabel={this.resourceLabel} ownerId={this.ownerId}>
          <manifold-forward-slot slot="show-button">
            <slot name="show-button" />
          </manifold-forward-slot>
          <manifold-forward-slot slot="hide-button">
            <slot name="hide-button" />
          </manifold-forward-slot>
          <manifold-forward-slot slot="sso-button">
            <slot name="sso-button" />
          </manifold-forward-slot>
          <manifold-forward-slot slot="no-credentials">
            <slot name="no-credentials" />
          </manifold-forward-slot>
        </manifold-no-credentials>
      );
    }
    return [
      <manifold-credentials-view
        credentials={this.credentials || undefined}
        loading={this.loading || !this.resourceLabel}
        onCredentialsRequested={this.credentialsRequested}
      >
        <manifold-forward-slot slot="show-button">
          <slot name="show-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="hide-button">
          <slot name="hide-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="sso-button">
          <slot name="sso-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="no-credentials">
          <slot name="no-credentials" />
        </manifold-forward-slot>
      </manifold-credentials-view>,
      Array.isArray(this.errors)
        ? this.errors.map(({ message }) => (
            <div style={{ 'margin-top': '1rem' }}>
              <manifold-toast alert-type="error">{message}</manifold-toast>
            </div>
          ))
        : null,
    ];
  }
}
