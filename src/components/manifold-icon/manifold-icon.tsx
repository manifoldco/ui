import { h, Component, Element, Prop } from '@stencil/core';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-icon',
  styleUrl: 'manifold-icon.css',
  shadow: true,
})
export class ManifoldIcon {
  @Prop() marginRight?: boolean = false;
  @Prop() marginLeft?: boolean = false;
  /** The icon ID */
  @Prop() icon: string;
  /** a CSS variable starting with `--manifold-g-*` */
  @Prop() gradient?: string;
  /** a CSS variable starting with `--manifold-c-*` */
  @Prop() color?: string = 'currentColor';
  @Element() element: HTMLElement;

  get gradientID() {
    return `gradient-${this.gradient}`;
  }

  get stopColors() {
    const style = getComputedStyle(this.element);
    const gradientValue = style.getPropertyValue(this.gradient || '');
    if (!this.gradient || !gradientValue) {
      return [];
    }
    const colors = gradientValue.split('#');
    return colors.slice(1, colors.length).map((chunk, index) => {
      const pair = chunk
        .trim()
        .replace(/(,|\))/g, '')
        .split(' ');
      return {
        color: `#${pair[0]}`,
        offset: pair[1] ? pair[1] : `${(100 * index) / (colors.length - 2)}%`,
      };
    });
  }

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <svg
        margin-right={this.marginRight}
        margin-left={this.marginLeft}
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        xmlns-x="http://www.w3.org/1999/xlink"
      >
        <title>
          <slot />
        </title>
        {this.gradient ? (
          [
            <defs>
              <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id={this.gradientID}>
                {this.stopColors.map(({ color, offset }) => (
                  <stop style={{ stopColor: color, stopOpacity: '1' }} offset={offset} />
                ))}
              </linearGradient>
            </defs>,
            <path fill={`url(#${this.gradientID})`} d={this.icon} />,
          ]
        ) : (
          <path
            d={this.icon}
            fill={this.color && this.color.startsWith('--') ? `var(${this.color})` : this.color}
          />
        )}
      </svg>
    );
  }
}
