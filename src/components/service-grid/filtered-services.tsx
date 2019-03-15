import { FunctionalComponent } from '@stencil/core';

import Tunnel, { State } from '../../data/marketplace';
import { filteredServices } from './utils';

interface FilteredServicesProps {
  filter?: string;
  serviceLink?: string;
  featured?: string;
}

export const FilteredServices: FunctionalComponent<FilteredServicesProps> = ({
  filter,
  featured,
  serviceLink,
}) => (
  <Tunnel.Consumer>
    {(state: State) => {
      return (
        <marketplace-results
          services={filteredServices(filter || '', state.services)}
          featured={featured}
          service-link={serviceLink}
        />
      );
    }}
  </Tunnel.Consumer>
);
