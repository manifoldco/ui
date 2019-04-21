import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  services: Catalog.Product[];
  featured?: string;
  hideCustom?: boolean;
  linkFormat?: string;
}

export default createProviderConsumer<State>(
  {
    services: [],
    featured: undefined,
    hideCustom: false,
    linkFormat: undefined,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
