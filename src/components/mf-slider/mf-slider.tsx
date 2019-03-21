import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { FieldType } from '../../types/Input';

@Component({
  tag: 'mf-slider',
  styleUrl: 'mf-slider.css',
  scoped: true,
})
export class MfSlider {
  @Prop() defaultValue?: number;
  @Prop() error?: string;
  @Prop() increment: number = 1;
  @Prop() max: number;
  @Prop() min: number = 0;
  @Prop() name: string = '';
  @Prop() suffix: string = '';
  @Event() updateValue: EventEmitter;
  @Watch('defaultValue') watchHandler(newVal: number) {
    this.updateValue.emit({ name: this.name, value: newVal });
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) return;
    const { value } = e.target as HTMLInputElement;
    this.updateValue.emit({
      name: this.name,
      value: parseInt(value, 10),
    });
  };

  get positionCount() {
    return (this.max - this.min) / this.increment;
  }

  render() {
    const value = this.defaultValue || this.min;
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
