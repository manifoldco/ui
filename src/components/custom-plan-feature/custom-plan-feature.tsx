import { Component, Prop, FunctionalComponent } from '@stencil/core';
import { ExpandedFeature } from 'types/Plan';
import { $ } from '../../utils/currency';

const STRING = 'string';
const NUMBER = 'number';
const BOOLEAN = 'boolean';

interface DropdownProps {
  name: string;
  onChange: (e: UIEvent) => void;
  values: {
    cost: number;
    label: string;
    name: string;
  }[];
}

interface ToggleProps {
  name: string;
  onChange: (e: UIEvent) => void;
  values: {
    cost?: number;
    label: string;
    name: string;
    price?: {};
  }[];
}

interface SliderProps {
  name: string;
  onChange: (e: UIEvent) => void;
  value: {
    numeric_details: {
      min: number;
      max: number;
      increment: number;
      suffix: string;
    };
  };
}

const Dropdown: FunctionalComponent<DropdownProps> = ({ name, values }) => {
  const options = values.map(({ cost, label, name: optionName }) => ({
    label: `${optionName} (${cost ? $(cost) : 'Included'})`,
    value: label,
  }));

  return <mf-select name={name} options={options} />;
};

const Slider: FunctionalComponent<SliderProps> = ({ value, name }) => {
  const { min, max, increment, suffix } = value.numeric_details;
  return <mf-slider name={name} min={min} max={max} suffix={suffix} increment={increment} />;
};

const Toggle: FunctionalComponent<ToggleProps> = () => {
  // TODO refactor options into props
  return <mf-toggle name={name} aria-labelledby={`-name`} />;
};

@Component({
  tag: 'custom-plan-feature',
  scoped: true,
})
export class CustomPlanFeature {
  @Prop() feature: ExpandedFeature;
  @Prop() selectedValue: string;
  @Prop() setFeature: (label: string, value: string) => void;
  @Prop() planLabel: string = '';

  handleChange = (value: string) => this.setFeature(this.feature.label, value);

  get featureID() {
    return `plan-${this.planLabel}-feature-${this.feature.label}`;
  }

  render() {
    console.log(this.feature);
    switch (this.feature.type) {
      case STRING:
        return (
          <Dropdown
            name={this.featureID}
            values={this.feature.values}
            onChange={(e: any) => this.handleChange(e.target && e.target.value)}
          />
        );
      case NUMBER:
        return (
          <Slider
            name={this.featureID}
            value={this.feature.value}
            onChange={(e: any) => this.handleChange(e.target && e.target.checked)}
          />
        );
      case BOOLEAN:
        return (
          <Toggle
            name={this.featureID}
            values={this.feature.values}
            onChange={(e: any) => this.handleChange(e.target && e.target.value)}
          />
        );
      default:
        return null;
    }
  }
}
