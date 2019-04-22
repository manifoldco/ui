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

  componentWillLoad() {
    return fetch(`${this.connection.marketplace}/resources/${this.resourceId}`, withAuth())
      .then(response => response.json())
      .then((resource: Marketplace.Resource) => {
        this.resource = resource;
      });
  }

  render() {
    return <div>{JSON.stringify(this.resource)}</div>;
  }
}

Tunnel.injectProps(ManifoldResourceDetails, ['connection']);
