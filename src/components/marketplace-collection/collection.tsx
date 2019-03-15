import { Component, Prop } from '@stencil/core';
import { MarketplaceCollection } from './marketplace-collection';

@Component({
  tag: 'marketplace-collection',
  shadow: true,
})
export class Collection {
  @Prop() name: string;
  @Prop() title: string;
  @Prop() labels: string;

  render() {
    return (
      <MarketplaceCollection name={this.name} title={this.title} labels={this.labels.split(',')} />
    );
  }
}
