import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'mf-slider',
  styleUrl: 'mf-slider.css',
  shadow: true,
})
export class MfSlider {
  @Prop() error?: string;
  @Prop() increment: number = 1;
  @Prop() max: number;
  @Prop() min: number = 0;
  @Prop() name: string = '';
  @Prop() suffix: string = '';
  @Prop({ mutable: true }) value: number = 0;
  @Event() updateValue: EventEmitter;
  @Watch('value')
  watchHandler(newValue: number) {
    this.updateValue.emit({ name: this.name, value: newValue });
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) return;
    const { value } = e.target as HTMLInputElement;
    this.value = parseInt(value, 10);
  };

  incrementValue = () => {
    const value = this.value + this.increment;
    this.value = value;
  };
  decrementValue = () => {
    const value = this.value - this.increment;
    this.value = value;
  };

  render() {
    return (
      <div class="container">
        <input
          class="field"
          type="number"
          max={this.max}
          min={this.min}
          onChange={this.onChangeHandler}
          required
          step={this.increment}
          value={this.value}
        />
        <button class="increment" onClick={this.incrementValue} disabled={this.value >= this.max}>
          <mf-icon icon="plus" />
        </button>
        <button class="decrement" onClick={this.decrementValue} disabled={this.value <= this.min}>
          <mf-icon icon="minus" />
        </button>
        <div class="display-units">
          {this.min.toLocaleString()} - {this.max.toLocaleString()} {this.suffix}
        </div>
      </div>
    );
  }
}
