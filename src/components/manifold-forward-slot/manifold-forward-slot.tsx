import { Component } from '@stencil/core';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-forward-slot',
})
export class ManifoldForwardSlot {
  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return null;
  }
}
