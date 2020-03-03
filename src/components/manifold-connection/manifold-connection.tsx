import { h, Component, Prop } from '@stencil/core';
import '../../utils/fetchAllPages';

import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';

@Component({ tag: 'manifold-connection' })
export class ManifoldConnection {
  @Prop() env?: 'local' | 'stage' | 'prod';
  @Prop() metrics?: boolean;
  @Prop() waitTime?: number | string;

  @loadMark()
  componentWillLoad() {
    connection.initialize({
      env: this.env,
      metrics: this.metrics,
      waitTime: this.waitTime,
    });
  }

  @logger()
  render() {
    return <slot />;
  }
}
