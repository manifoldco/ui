import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import connection from '../../state/connection';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import query from './resources.graphql';
import { ResourceEdge } from '../../types/graphql';

@Component({
  tag: 'manifold-resource-list',
  styleUrl: 'manifold-resource-list.css',
  shadow: true,
})
export class ManifoldResourceList {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Disable auto-updates? */
  @Prop() paused?: boolean = false;
  /** Link format structure, with `:resource` placeholder */
  @Prop() resourceLinkFormat?: string;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  @State() interval?: number;
  @State() resources?: ResourceEdge[];

  @Watch('paused') pausedChange(newPaused: boolean) {
    if (newPaused) {
      window.clearInterval(this.interval);
    } else {
      this.interval = window.setInterval(() => this.fetchResources(), 3000);
    }
  }

  @loadMark()
  componentWillLoad() {
    this.fetchResources();
    if (!this.paused) {
      this.interval = window.setInterval(() => this.fetchResources(), 3000);
    }
  }

  componentDidUnload() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  fetchResources = async () => {
    if (!this.graphqlFetch) {
      return;
    }

    const { data, errors } = await this.graphqlFetch({
      query,
    });

    if (data) {
      this.resources = (data.resources && data.resources.edges) || [];
    } else if (errors) {
      console.error(errors);
    }
  };

  @logger()
  render() {
    if (Array.isArray(this.resources) && !this.resources.length) {
      return <slot name="no-resources" />;
    }

    return (
      <div class="wrapper">
        {Array.isArray(this.resources)
          ? this.resources.map(
              resource =>
                resource.node && (
                  <manifold-resource-card-view
                    label={resource.node.label}
                    logo={
                      resource.node.plan && resource.node.plan.product
                        ? resource.node.plan.product.logoUrl
                        : ''
                    }
                    logoLabel={
                      resource.node.plan && resource.node.plan.product
                        ? resource.node.plan.product.label
                        : ''
                    }
                    resourceId={resource.node.id}
                    resourceStatus={resource.node.status.label}
                    resourceLinkFormat={this.resourceLinkFormat}
                    preserveEvent={this.preserveEvent}
                  />
                )
            )
          : [1, 2, 3, 4].map(() => (
              <manifold-resource-card-view
                label="my-loading-resource"
                loading={true}
                logo="myresource.png"
              />
            ))}
        {!Array.isArray(this.resources) && <slot name="loading" />}
      </div>
    );
  }
}
