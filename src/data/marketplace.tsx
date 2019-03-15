import { createProviderConsumer } from '@stencil/state-tunnel';
import { Service } from 'types/Service';
import { Collection } from 'types/Collection';

export interface State {
  collections: Collection[];
  services: Service[];
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
