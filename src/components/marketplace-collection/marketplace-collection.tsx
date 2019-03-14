import { FunctionalComponent } from '@stencil/core';
import { Service } from 'types/Service';

import Tunnel, { State } from '../../data/marketplace';

interface HelloProps {
  name: string;
  title: string;
  labels: string[];
}

export const MarketplaceCollection: FunctionalComponent<HelloProps> = ({ name, title, labels }) => (
  <Tunnel.Consumer>
    {(state: State) => (
      <div>
        <h3 class="category" id={`category-collection-${name}`}>
          {title}
        </h3>
        <marketplace-results
          services={state.services.filter((s: Service) => labels.includes(s.body.label))}
        />
      </div>
    )}
  </Tunnel.Consumer>
);
