import { createProviderConsumer } from '@stencil/state-tunnel';

import { Env, Connection, connections } from '../utils/connections';

export interface State {
  connection: Connection;
}

export default createProviderConsumer<State>(
  {
    connection: connections[Env.Prod],
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
