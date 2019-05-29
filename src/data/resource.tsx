import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface ResourceState {
  data?: Gateway.Resource;
  loading: boolean;
}

export default createProviderConsumer<ResourceState>(
  {
    data: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
