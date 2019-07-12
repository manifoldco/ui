import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

import { Connection, connections } from '../utils/connections';

export interface State {
  connection: Connection;
  authToken?: string;
  setAuthToken: (s: string) => void;
}

export default createProviderConsumer<State>(
  {
    connection: connections.prod,
    setAuthToken: () => {},
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
