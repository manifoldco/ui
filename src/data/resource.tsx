import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  resource?: Gateway.Resource;
  loading: boolean;
}

export default createProviderConsumer<State>(
  {
    resource: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
