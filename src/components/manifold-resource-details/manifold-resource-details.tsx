import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-resource-details' })
export class ManifoldResourceDetails {
  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => <manifold-resource-details-view data={state.data} />}
      </ResourceTunnel.Consumer>
    );
  }
}
