import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

import { Connection, connections } from '../utils/connections';
import { GraphqlRequestBody, GraphqlResponseBody } from '../utils/graphqlFetch';

export interface State {
  connection: Connection;
  authToken?: string;
  setAuthToken: (s: string) => void;
  graphqlFetch?: <T>(body: GraphqlRequestBody) => Promise<GraphqlResponseBody<T>>;
}

export default createProviderConsumer<State>(
  {
    connection: connections.prod,
    setAuthToken: () => {},
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
