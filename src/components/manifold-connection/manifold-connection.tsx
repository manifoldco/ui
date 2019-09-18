import { h, Component, Prop } from '@stencil/core';
import '../../utils/fetchAllPages';

import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import connection from '../../state/connection';

@Component({ tag: 'manifold-connection' })
export class ManifoldConnection {
  @Prop() env?: 'local' | 'stage' | 'prod';
  @Prop() waitTime?: number;

  @loadMark()
  componentWillLoad() {
    connection.initialize({ env: this.env, waitTime: this.waitTime });
  }

  @logger()
  render() {
    return <slot />;
  }
}
