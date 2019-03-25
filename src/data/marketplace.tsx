import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  services: Catalog.Product[];
  serviceLink?: string;
  featured?: string;
}

export default createProviderConsumer<State>(
  {
    services: [],
    serviceLink: undefined,
    featured: undefined,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
