import { Component, Prop, FunctionalComponent } from '@stencil/core';
import { FEATURE_CHANGE } from '../../global/events';
import { $ } from '../../utils/currency';

const STRING = 'string';
const NUMBER = 'number';
const BOOLEAN = 'boolean';

interface DropdownProps {
  name: string;
  values?: Catalog.FeatureValueDetails[];
}

interface ToggleProps {
  name: string;
  values: Catalog.FeatureValueDetails[];
}

interface SliderProps {
  name: string;
  value?: Catalog.FeatureValueDetails;
}

const Dropdown: FunctionalComponent<DropdownProps> = ({ name, values }) => {
  const options = Array.isArray(values)
    ? values.map(({ cost, label, name: optionName }) => ({
        label: `${optionName} (${cost ? $(cost) : 'Included'})`,
        value: label,
      }))
    : [];

  return <mf-select name={name} options={options} />;
};

const Slider: FunctionalComponent<SliderProps> = ({ value, name }) => {
  let details: Catalog.FeatureNumericDetails = {};
  if (value && value.numeric_details) details = value.numeric_details;
  const { min, max, increment, suffix } = details;
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
  @Prop() feature: Catalog.ExpandedFeature;
  @Prop() selectedValue?: string;
  @Prop() planLabel: string = '';

  get featureID() {
    return this.feature.label;
  }

  render() {
    const { values = [], value } = this.feature;

    switch (this.feature.type) {
      case STRING:
        return <Dropdown name={this.featureID} values={values} event-name={FEATURE_CHANGE} />;
      case NUMBER:
        return <Slider name={this.featureID} value={value} event-name={FEATURE_CHANGE} />;
      case BOOLEAN:
        return <Toggle name={this.featureID} values={values} event-name={FEATURE_CHANGE} />;
      default:
        return null;
    }
  }
}
