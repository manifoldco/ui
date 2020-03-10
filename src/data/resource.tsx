import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import { ResourceWithOwnerQuery } from '../types/graphql';

export interface ResourceState {
  loading: boolean;
  gqlData?: ResourceWithOwnerQuery['resource'];
}

export default createProviderConsumer<ResourceState>(
  {
    gqlData: undefined,
    loading: false,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
