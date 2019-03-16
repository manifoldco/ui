import { Component, Prop } from '@stencil/core';

import { Service } from 'types/Service';

import Tunnel, { State } from '../../data/marketplace';

@Component({
  tag: 'marketplace-collection',
  shadow: true,
  styleUrl: 'marketplace-collection.css',
})
export class Collection {
  @Prop() name: string;
  @Prop() tagLine: string;
  @Prop() icon?: string;
  @Prop() labels: string;

  render() {
    return (
      <Tunnel.Consumer>
        {(state: State) => (
          <div>
            <h3 class="category">
              {this.icon && <mf-icon icon={this.icon} marginRight />}
              {this.name}
              <p class="tag-line">{this.tagLine}</p>
            </h3>
            <marketplace-results
              services={state.services.filter((s: Service) => this.labels.includes(s.body.label))}
            />
          </div>
        )}
      </Tunnel.Consumer>
    );
  }
}
