import { FunctionalComponent } from '@stencil/core';
import { Service } from 'types/Service';

import Tunnel, { State } from '../../data/marketplace';

interface MarketplaceCollectionProps {
  tagLine: string;
  icon?: string;
  name: string;
  labels: string[];
}

export const MarketplaceCollection: FunctionalComponent<MarketplaceCollectionProps> = ({
  tagLine,
  icon,
  name,
  labels,
}) => (
  <Tunnel.Consumer>
    {(state: State) => (
      <div>
        <h3 class="category">
          {icon && <mf-icon icon={icon} marginRight />}
          {name}
          <p class="tag-line">{tagLine}</p>
        </h3>
        <marketplace-results
          services={state.services.filter((s: Service) => labels.includes(s.body.label))}
        />
      </div>
    )}
  </Tunnel.Consumer>
);
