import { h, Component, Prop, Element } from '@stencil/core';
import '../../utils/fetchAllPages';

import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import connection from '../../state/connection';

@Component({ tag: 'manifold-connection' })
export class ManifoldConnection {
  @Element() el: HTMLElement;
  @Prop() env?: 'local' | 'stage' | 'prod';
  @Prop() metrics?: boolean;
  @Prop() waitTime?: number | string;

  @loadMark()
  componentWillLoad() {
    connection.initialize({
      env: this.env,
      metrics: this.metrics,
      waitTime: this.waitTime,
      connectionEl: this.el,
    });
  }

  @logger()
  render() {
    return <slot />;
  }
}
