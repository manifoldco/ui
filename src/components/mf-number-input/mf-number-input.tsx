import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'manifold-number-input',
  styleUrl: 'mf-number-input.css',
  shadow: true,
})
export class MfNumberInput {
  @Prop() error?: string;
  @Prop() decrementDisabledLabel?: string;
  @Prop() incrementDisabledLabel?: string;
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

  get lowerBoundReached() {
    return this.value <= this.min;
  }
  get upperBoundReached() {
    return this.value >= this.max;
  }
  get outOfBound() {
    return this.value < this.min || this.value > this.max;
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) return;
    const { value } = e.target as HTMLInputElement;
    const newValue = parseInt(value, 10);
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(newValue)) this.value = newValue;
    else this.value = this.value;
  };

  setValue = (value: number) => {
    // bring value down to upper bound
    if (value > this.max) {
      this.value = this.max;
      return;
    }

    // bring value up to lower bound
    if (value < this.min) {
      this.value = this.min;
      return;
    }

    this.value = value;
  };

  render() {
    return (
      <div class="container" data-error={this.outOfBound}>
        <input
          class="field"
          type="number"
          inputmode="numeric"
          max={this.max}
          min={this.min}
          pattern="[0-9]*"
          onInput={this.onChangeHandler}
          required
          step={this.increment}
          value={this.value}
        />
        <button
          class="increment"
          onClick={() => this.setValue(this.value + this.increment)}
          disabled={this.upperBoundReached}
        >
          {this.incrementDisabledLabel && this.upperBoundReached && (
            <div class="tooltip">{this.incrementDisabledLabel}</div>
          )}
          <manifold-icon icon="plus" />
        </button>
        <button
          class="decrement"
          onClick={() => this.setValue(this.value - this.increment)}
          disabled={this.lowerBoundReached}
        >
          {this.decrementDisabledLabel && this.lowerBoundReached && (
            <div class="tooltip">{this.decrementDisabledLabel}</div>
          )}
          <manifold-icon icon="minus" />
        </button>
        <div class="display-units">
          {this.min.toLocaleString()} - {this.max.toLocaleString()} {this.suffix}
        </div>
      </div>
    );
  }
}
