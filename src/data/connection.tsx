import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  url: string;
}

export default createProviderConsumer<State>(
  {
    url: 'https://api.catalog.manifold.co/v1/',
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
