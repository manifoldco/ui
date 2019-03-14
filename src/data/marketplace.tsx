import { createProviderConsumer } from '@stencil/state-tunnel';
import { Service } from 'types/Service';

export interface State {
  services: Service[];
}

export default createProviderConsumer<State>(
  {
    services: [],
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
