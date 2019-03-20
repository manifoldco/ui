import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { FieldType } from '../../types/Input';

@Component({
  tag: 'mf-slider',
  styleUrl: 'mf-slider.css',
  scoped: true,
})
export class MfSlider {
  @Prop() error?: string;
  @Prop() eventName?: string;
  @Prop() increment: number = 1;
  @Prop() max: number;
  @Prop() min: number = 0;
  @Prop() name: string = '';
  @Prop() selectedValue: number;
  @Prop() suffix: string = '';
  @Event({ eventName: this.eventName }) onChange: EventEmitter;

  private onChangeHandler(e: Event) {
    if (!e.target || !this.eventName) return;
    const el = e.target as HTMLInputElement;
    this.onChange.emit({ name: el.getAttribute('name'), value: parseInt(el.value, 10) });
  }

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
          <mf-input
            type={FieldType.Number}
            max={this.max}
            min={this.min}
            onChange={this.onChangeHandler}
            required
            step={this.increment}
            value={value}
          />
          <div class="display-units">{this.suffix}</div>
        </div>
      </div>
    );
  }
}
