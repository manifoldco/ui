import { h, Component, Prop, Event, State, EventEmitter, Watch } from '@stencil/core';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-input',
  styleUrl: 'manifold-input.css',
  scoped: true,
})
export class ManifoldSelect {
  @Prop() inputId?: string;
  @Prop() name?: string;
  @Prop() type?: string = 'text';
  @Prop() pattern?: string = '';
  @Prop() required?: boolean;
  @Prop() disabled?: boolean;
  @Prop() defaultValue?: string = '';
  @State() value?: string = '';
  @Event() updateValue: EventEmitter;

  @Watch('defaultValue') watchHandler(newVal: string) {
    this.value = this.defaultValue;
    this.updateValue.emit({ name: this.name, value: newVal });
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) {
      return;
    }

    const { value } = e.target as HTMLInputElement;

    this.value = value;
  };

  onBlurHandler = () => {
    this.updateValue.emit({ name: this.name, value: this.value });
  };

  @logger()
  render() {
    return (
      <input
        id={this.inputId}
        name={this.name}
        onChange={this.onChangeHandler}
        onBlur={this.onBlurHandler}
        pattern={this.pattern}
        required={this.required}
        type={this.type}
        value={this.value || this.defaultValue}
        disabled={this.disabled}
      />
    );
  }
}
