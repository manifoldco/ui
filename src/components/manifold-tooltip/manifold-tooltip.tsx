import { h, Component, Prop } from '@stencil/core';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-tooltip',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldTooltip {
  @Prop() labelText?: string;

  @logger()
  render() {
    return [<slot />, this.labelText && <div class="tooltip">{this.labelText}</div>];
  }
}
