import { h, Component, Prop, Element, State } from '@stencil/core';

import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import resourceNoCredentialsQuery from './resourceNoCredentials.graphql';
import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceNoCredentialsQuery } from '../../types/graphql';

const PLATFORM_DISPLAY_NAMES: { [key: string]: string } = {
  'manifold.co': 'Manifold',
  'digitalocean.com': 'Digital Ocean',
  'render.com': 'Render',
};

@Component({
  tag: 'manifold-no-credentials',
  styleUrl: 'manifold-no-credentials.css',
  shadow: true,
})
export class ManifoldNoCredentials {
  @Element() el: HTMLElement;
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() resourceLabel?: string = '';
  @State()
  message?: string =
    'Access to this resource is authorized through your account without credentials. SSO into the product dashboard to configure your service.';

  @loadMark()
  async componentWillLoad() {
    if (!this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    const { data } = await this.graphqlFetch<ResourceNoCredentialsQuery>({
      query: resourceNoCredentialsQuery,
      variables: { resourceLabel: this.resourceLabel },
      element: this.el,
    });
    const platformName = data && PLATFORM_DISPLAY_NAMES[data.resource.owner.platform.domain];
    const productName = data && data.resource.plan.product.displayName;
    this.message = `Access to ${productName ||
      'this resource'} is authorized through your ${platformName} account without credentials. SSO into the ${productName ||
      'product'} dashboard to configure your service.`;
  }

  @logger()
  render() {
    return [
      <div class="no-credentials">
        <div class="message">{this.message}</div>
        <div class="sso">
          <manifold-forward-slot slot="sso-button">
            <slot name="sso-button" />
          </manifold-forward-slot>
        </div>
      </div>,
      <div style={{ display: 'none' }}>
        <manifold-forward-slot slot="show-button">
          <slot name="show-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="hide-button">
          <slot name="hide-button" />
        </manifold-forward-slot>
      </div>,
    ];
  }
}
