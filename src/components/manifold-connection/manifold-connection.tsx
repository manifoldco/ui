import { h, Component, Prop } from '@stencil/core';

import Tunnel from '../../data/connection';
import logger from '../../utils/logger';

const baseWait = 15000;

@Component({ tag: 'manifold-connection' })
export class ManiTunnel {
  /** _(optional)_ Specify `env="stage"` for staging */
  @Prop() env: 'local' | 'stage' | 'prod' = 'prod';
  /** _(optional)_ Wait time for the fetch calls before it times out */
  @Prop() waitTime: number = baseWait;

  /** _(hidden)_ Passed by the state tunnel */
  @Prop() setEnv?: (env: 'local' | 'stage' | 'prod') => void;
  @Prop() setWaitTime?: (waitTime: number) => void;

  componentWillLoad() {
    if (this.setEnv) {
      this.setEnv(this.env);
    }
    if (this.setWaitTime) {
      this.setWaitTime(this.waitTime);
    }
  }

  @logger()
  render() {
    return <slot />;
  }
}

Tunnel.injectProps(ManiTunnel, ['setEnv', 'setWaitTime']);
