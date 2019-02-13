import { Component, Prop } from '@stencil/core';
import { darken, mix, parseToHsl } from 'polished';

const CADMIUM_ORANGE = '#FF6400';
const PROCESS_CYAN = '#00BAFF';

const mixGradient = (baseColor: string) => {
  const { hue, saturation } = parseToHsl(baseColor);

  let mixColor = CADMIUM_ORANGE;
  let mixRatio = 0.375 * saturation;
  let darkRatio = 0.15;
  let lightRatio = 0.1;

  const coolColor = hue > 128 && hue < 300;
  if (coolColor) {
    mixColor = PROCESS_CYAN;
    mixRatio = 0.1 * saturation;
    darkRatio = 0.2;
    lightRatio = 0;
  }

  const dark = darken(darkRatio, mix(mixRatio, mixColor, baseColor));
  const light = darken(lightRatio, baseColor);
  return `linear-gradient(to right, ${dark}, ${light})`;
};

@Component({
  tag: 'featured-service',
  styleUrl: 'featured-service.css',
  shadow: true,
})
export class FeaturedService {
  @Prop() name: string;
  @Prop() logo: string;
  @Prop() shape: 'square' | 'circle' = 'square';
  @Prop() backgroundColor: string;

  private getBackgroundColor() {
    return {
      '--backgroundColor': darken(0.2, this.backgroundColor),
      '--backgroundGradient': mixGradient(this.backgroundColor),
    };
  }

  render() {
    return (
      <div class="card" style={this.getBackgroundColor()}>
        <div class="logo">
          {/* TODO add image mask */}
          <img src={this.logo} alt={this.name} itemprop="logo" />
        </div>
        <h2 class="title" itemprop="name">
          {this.name}
        </h2>
        <p class="description">
          <slot />
        </p>
      </div>
    );
  }
}
