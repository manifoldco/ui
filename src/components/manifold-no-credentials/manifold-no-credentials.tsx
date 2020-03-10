import { h, Component, Prop, Element, State } from '@stencil/core';

import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';
import resourceNoCredentialsQuery from './resourceNoCredentials.graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceNoCredentialsQuery } from '../../types/graphql';

const PLATFORM_DISPLAY_NAMES: { [key: string]: string } = {
  'manifold.co': 'Manifold',
  'digitalocean.com': 'DigitalOcean',
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
  @Prop() ownerId?: string;
  @Prop() resourceLabel?: string = '';
  @State()
  message?: string =
    'Access to this resource is authorized through your account without credentials. SSO into the product dashboard to configure your service.';

  noCredentialsEl?: Element;

  @loadMark()
  async componentWillLoad() {
    this.findNodes();
    if (this.noCredentialsEl || !this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    const { data } = await this.graphqlFetch<ResourceNoCredentialsQuery>({
      query: resourceNoCredentialsQuery,
      variables: { resourceLabel: this.resourceLabel, owner: this.ownerId },
      element: this.el,
    });
    const platformName = data && PLATFORM_DISPLAY_NAMES[data.resource.owner.platform.domain];
    const productName = data && data.resource.plan.product.displayName;
    this.message = `Access to ${productName ||
      'this resource'} is authorized through your ${platformName} account without credentials. SSO into the ${productName ||
      'product'} dashboard to configure your service.`;
  }

  componentDidUpdate() {
    this.findNodes();
  }

  findNodes() {
    this.el.childNodes.forEach((child: HTMLElement) => {
      if (child.getAttribute('slot') === 'no-credentials') {
        this.noCredentialsEl = child.querySelector('*:not(manifold-forward-slot)') || undefined;
      }
    });
  }

  @logger()
  render() {
    const noCredentials = this.noCredentialsEl ? (
      <slot name="no-credentials" />
    ) : (
      <div>{this.message}</div>
    );

    return [
      <div class="no-credentials">
        <div class="message">{noCredentials}</div>
        <div class="sso">
          <manifold-forward-slot slot="sso-button">
            <slot name="sso-button" />
          </manifold-forward-slot>
        </div>
      </div>,
      <manifold-forward-slot slot="show-button"></manifold-forward-slot>,
      <manifold-forward-slot slot="hide-button"></manifold-forward-slot>,
    ];
  }
}
