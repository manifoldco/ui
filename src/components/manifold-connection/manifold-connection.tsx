import { h, Component } from '@stencil/core';

import logger from '../../utils/logger';

/* This component currently serves no purpose, but it will be needed again
 * when we circle back to https://github.com/manifoldco/engineering/issues/9106
 */
@Component({ tag: 'manifold-connection' })
export class ManifoldConnection {
  @logger()
  render() {
    return <slot />;
  }
}
