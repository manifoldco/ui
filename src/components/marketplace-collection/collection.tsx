import { Component, Prop } from '@stencil/core';
import { MarketplaceCollection } from './marketplace-collection';

@Component({
  tag: 'marketplace-collection',
  shadow: true,
  styleUrl: 'collection.css',
})
export class Collection {
  @Prop() name: string;
  @Prop() tagLine: string;
  @Prop() icon?: string;
  @Prop() labels: string;

  render() {
    return (
      <MarketplaceCollection
        tagLine={this.tagLine}
        icon={this.icon}
        name={this.name}
        labels={this.labels.split(',')}
      />
    );
  }
}
