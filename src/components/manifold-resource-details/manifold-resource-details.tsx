import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { DetailsView } from './components/DetailsView';
import { Resource } from '../../types/graphql';

@Component({
  tag: 'manifold-resource-details',
  shadow: true,
  styleUrl: 'style.css',
})
export class ManifoldResourceDetails {
  @Prop() gqlData?: Resource;
  @Prop() loading: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return <DetailsView gqlData={this.gqlData} loading={this.loading} />;
  }
}

ResourceTunnel.injectProps(ManifoldResourceDetails, ['gqlData', 'loading']);
