import { h, Element, Component, Method, Prop, State } from '@stencil/core';

import { ResourceCredentialsQuery } from '../../types/graphql';
import connection from '../../state/connection';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import resourceCredentialsQuery from './resourceCredentials.graphql';

@Component({ tag: 'manifold-credentials' })
export class ManifoldCredentials {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() resourceLabel?: string = '';
  @Prop() noCredentials?: boolean = false;
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

    const { data, errors } = await this.graphqlFetch<ResourceCredentialsQuery>({
      query: resourceCredentialsQuery,
      variables: { resourceLabel: this.resourceLabel },
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
        <manifold-no-credentials resourceLabel={this.resourceLabel}>
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
