import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

import { ConnectionState } from '../state/connection';

export default createProviderConsumer<ConnectionState>(
  new ConnectionState(),
  // @ts-ignore
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
);
