import { Component } from '@stencil/core';
import logger, { loadMark } from '../../utils/logger';

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
