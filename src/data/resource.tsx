import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import { Resource } from '../types/graphql';

export interface ResourceState {
  data?: Resource;
  loading: boolean;
}

export default createProviderConsumer<ResourceState>(
  {
    data: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
