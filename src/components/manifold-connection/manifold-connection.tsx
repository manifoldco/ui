import { h, Component, Prop } from '@stencil/core';
import '../../utils/fetchAllPages';

import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import connection from '../../state/connection';

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
