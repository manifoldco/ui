import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import { Gateway } from '../types/gateway';
import { Product } from '../types/graphql';

export interface ResourceState {
  data?: Gateway.Resource & { product?: Product };
  loading: boolean;
}

export default createProviderConsumer<ResourceState>(
  {
    data: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
