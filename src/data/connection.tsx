import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

import { GraphqlRequestBody, GraphqlResponseBody } from '../utils/graphqlFetch';
import { RestFetch } from '../utils/restFetch';

export interface State {
  setAuthToken: (s: string) => void;
  restFetch?: RestFetch;
  graphqlFetch?: <T>(body: GraphqlRequestBody) => Promise<GraphqlResponseBody<T>>;
}

export default createProviderConsumer<State>(
  {
    setAuthToken: () => {},
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
