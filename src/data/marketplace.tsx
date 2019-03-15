import { createProviderConsumer } from '@stencil/state-tunnel';
import { Service } from 'types/Service';

export interface State {
  services: Service[];
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
