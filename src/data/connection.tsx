import { createProviderConsumer } from '@stencil/state-tunnel';

import { Connection, connections } from '../utils/connections';

export interface State {
  connection: Connection;
}

export default createProviderConsumer<State>(
  {
    connection: connections.prod,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
