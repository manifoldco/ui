import { createProviderConsumer } from '@stencil/state-tunnel';
import { Collection } from 'types/Collection';

export interface State {
  collections: Collection[];
  services: Catalog.Product[];
  serviceLink?: string;
  featured?: string;
}

export default createProviderConsumer<State>(
  {
    collections: [],
    services: [],
    serviceLink: undefined,
    featured: undefined,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
