import { FunctionalComponent } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { filteredServices } from './utils';

interface FilteredServicesProps {
  filter?: string;
}

export const FilteredServices: FunctionalComponent<FilteredServicesProps> = ({ filter }) => (
  <Tunnel.Consumer>
    {(state: State) => {
      return (
        <marketplace-results
          services={filteredServices(filter || '', state.services)}
          featured={state.featured}
          service-link={state.serviceLink}
        />
      );
    }}
  </Tunnel.Consumer>
);
