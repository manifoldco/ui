import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  services: Catalog.Product[];
  linkFormat?: string;
  featured?: string;
}

export default createProviderConsumer<State>(
  {
    services: [],
    linkFormat: undefined,
    featured: undefined,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
