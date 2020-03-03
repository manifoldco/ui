import { h, Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Option } from '../../types/Select';
import logger, { loadMark } from '../../utils/logger';

@Component({
  tag: 'manifold-select',
  styleUrl: 'manifold-select.css',
  shadow: true,
})
export class ManifoldSelect {
  @Prop() defaultValue?: string;
  @Prop() name: string;
  @Prop() options: Option[] = [];
  @Prop() required?: boolean;
  @Prop() disabled?: boolean;
  @Event() updateValue: EventEmitter;
  @Watch('defaultValue') watchHandler(newVal: string) {
    this.updateValue.emit({ name: this.name, value: newVal });
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) {
      return;
    }
    const { value } = e.target as HTMLSelectElement;
    this.updateValue.emit({ name: this.name, value });
  };

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <select
        name={this.name}
        required={this.required}
        onChange={this.onChangeHandler}
        disabled={this.disabled}
      >
        {this.options.map(({ label, value }) => (
          <option value={value} selected={value === this.defaultValue}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}
