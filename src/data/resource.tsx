import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import { GetResourceQuery } from '../types/graphql';

export interface ResourceState {
  loading: boolean;
  gqlData?: GetResourceQuery['resource'];
}

export default createProviderConsumer<ResourceState>(
  {
    gqlData: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
