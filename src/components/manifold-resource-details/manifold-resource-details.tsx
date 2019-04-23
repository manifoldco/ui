import { Component, Prop, Element, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-resource-details' })
export class ManifoldResourceDetails {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** ID of resource */
  @Prop() resourceId: string;
  @State() resource?: Marketplace.Resource;
  @State() plan?: Catalog.Plan;

  async componentWillLoad() {
    // get resource data
    const resourceResponse = await fetch(
      `${this.connection.marketplace}/resources/${this.resourceId}`,
      withAuth()
    );
    const resource = await resourceResponse.json();
    this.resource = { ...resource };

    // get plan data
    if (this.resource) {
      const planResponse = await fetch(
        `${this.connection.catalog}/plans/${this.resource.body.plan_id}`,
        withAuth()
      );
      const plan = await planResponse.json();
      this.plan = { ...plan };
    }
  }

  render() {
    return (
      <div>
        Resource: <pre>{JSON.stringify(this.resource, null, 2)}</pre>
        Plan: <pre>{JSON.stringify(this.plan, null, 2)}</pre>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldResourceDetails, ['connection']);
