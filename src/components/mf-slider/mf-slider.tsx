import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'mf-slider',
  styleUrl: 'mf-slider.css',
  scoped: true,
})
export class MfSlider {
  @Prop() min: number = 0;
  @Prop() max: number;
  @Prop() increment: number = 1;
  @Prop() name: string = '';
  @Prop() selectedValue: number;
  @Prop() suffix: string = '';
  @Prop() onChange: (e: Event) => void;
  @Prop() error?: string;

  get positionCount() {
    return (this.max - this.min) / this.increment;
  }

  render() {
    const value = this.selectedValue || this.min;
    return (
      <div class="container">
        {this.positionCount < 500 ? (
          <div class="slider-wrapper">
            <input
              type="range"
              max={this.max}
              min={this.min}
              step={this.increment}
              value={value}
              onInput={e => this.onChange(e)}
              onChange={e => this.onChange(e)}
              style={{
                '--slider-position': `${value / (this.max - this.min)}%`,
              }}
            />
            {this.error && <div class="error">{this.error}</div>}
          </div>
        ) : (
          <div>
            <div class="no-slider">
              Specify a value between {this.min}&nbsp;–&nbsp;{this.max} {this.suffix}
            </div>
            {this.error && <div class="error">{this.error}</div>}
          </div>
        )}
        <div class="number-wrapper">
          <input
            type="number"
            max={this.max}
            min={this.min}
            value={value}
            onChange={e => this.onChange(e)}
            required
            step={this.increment}
          />
          <div class="display-units">{this.suffix}</div>
        </div>
      </div>
    );
  }
}
