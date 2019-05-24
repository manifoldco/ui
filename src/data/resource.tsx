import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface ResourceState {
  resource?: Gateway.Resource;
  loading: boolean;
}

export default createProviderConsumer<ResourceState>(
  {
    resource: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
