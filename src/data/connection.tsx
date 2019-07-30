import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

import { GraphqlRequestBody, GraphqlResponseBody } from '../utils/graphqlFetch';
import { Connection } from '../utils/connections';

export interface State {
  setAuthToken: (s: string) => void;
  restFetch?: <T>(
    service: keyof Connection,
    endpoint: string,
    body?: object,
    options?: object
  ) => Promise<T | Error>;
  graphqlFetch?: <T>(body: GraphqlRequestBody) => Promise<GraphqlResponseBody<T>>;
}

export default createProviderConsumer<State>(
  {
    setAuthToken: () => {},
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
