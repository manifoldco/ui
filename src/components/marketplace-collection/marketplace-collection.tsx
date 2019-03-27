import { Component, Prop } from '@stencil/core';
import Tunnel, { State } from '../../data/marketplace';

@Component({ tag: 'marketplace-collection' })
export class Collection {
  @Prop() name: string;
  @Prop() tagLine: string;
  @Prop() icon?: string;
  @Prop() labels: string;

  render() {
    return (
      <Tunnel.Consumer>
        {(state: State) => (
          <service-category
            icon={this.icon}
            label={this.name}
            name={this.name.replace(/\s/g, '-').toLowerCase()}
            tagline={this.tagLine}
          >
            <marketplace-results
              services={state.services.filter((s: Catalog.Product) =>
                this.labels.includes(s.body.label)
              )}
            />
          </service-category>
        )}
      </Tunnel.Consumer>
    );
  }
}
