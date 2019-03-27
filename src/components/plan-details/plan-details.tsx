import { Component, Prop, State, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { $ } from '../../utils/currency';

const RESOURCE_CREATE = '/resource/create?product='; // TODO get actual url
const NUMBER_FEATURE_COIN = 10000000; // Numeric features are a ten-millionth of a cent, because floats stink
const NO = 'No';
const YES = 'Yes';

const featureCost = (number: number) => $(number / NUMBER_FEATURE_COIN);
const singularize = (word: string) => word.replace(/s$/i, '');

@Component({
  tag: 'plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class PlanDetails {
  @Prop() plan: Catalog.ExpandedPlan;
  @Prop() product: Catalog.Product;
  @State() features: UserFeatures;
  @Watch('plan') onUpdate() {
    this.features = this.initialFeatures();
  }

  componentWillLoad() {
    this.features = this.initialFeatures();
  }

  // TODO clean this up
  featureValue({
    measurable,
    type,
    value,
    value_string,
  }: Catalog.ExpandedFeature): string | number | undefined {
    if (!value) return undefined;

    if (measurable && value.numeric_details && value.numeric_details.cost_ranges) {
      if (value.numeric_details.cost_ranges.length === 0) {
        return value.name.replace(/^No .*/, NO).replace(/^Yes/, YES);
      }
      const suffix = value.numeric_details.suffix ? value.numeric_details.suffix.toLowerCase() : '';

      let freeText = '';
      const freeTier = value.numeric_details.cost_ranges.find(
        (feature: Catalog.FeatureNumericRange) =>
          !feature.cost_multiple || feature.cost_multiple === 0
      );
      if (freeTier) freeText = ` (free until ${freeTier.limit} ${suffix})`;

      const sortedCosts = value.numeric_details.cost_ranges
        .filter(
          (feature: Catalog.FeatureNumericRange) =>
            feature.cost_multiple && feature.cost_multiple > 0
        )
        .sort(
          (a: { cost_multiple: number }, b: { cost_multiple: number }) =>
            a.cost_multiple - b.cost_multiple
        );

      if (!sortedCosts[0].cost_multiple) {
        return 'free';
      }

      const lowEnd = featureCost(sortedCosts[0].cost_multiple);

      if (sortedCosts.length === 1) {
        return `${lowEnd} / ${singularize(suffix)}${freeText}`;
      }

      const highEnd = featureCost(sortedCosts[sortedCosts.length - 1].cost_multiple || 0);

      return `${lowEnd} - ${highEnd} / ${singularize(suffix)}${freeText}`;
    }

    switch (type) {
      case 'boolean':
        if (!value) return value_string === 'true' ? YES : NO;
        return value.label === 'true' ? YES : NO;
      case 'number':
        return value_string === undefined || Number.isNaN(Number(value_string))
          ? value_string
          : new Intl.NumberFormat('en-US').format(parseFloat(value_string));
      default:
        return value_string;
    }
  }

  handleChangeValue({ detail: { name, value } }: CustomEvent) {
    this.features = {
      ...this.features,
      [name]: value,
    };
  }

  initialFeatures(): UserFeatures {
    if (!this.plan.body.expanded_features) return {};

    // We want to set _all_ features, not just customizable ones, to calculate cost
    return this.plan.body.expanded_features.reduce((obj, feature) => {
      if (!feature.value) return obj;

      if (feature.type === 'boolean')
        return { ...obj, [feature.label]: this.getBooleanDefaultValue(feature.value) };
      if (feature.type === 'number')
        return { ...obj, [feature.label]: this.getNumberDefaultValue(feature.value) };
      if (feature.type === 'string')
        return { ...obj, [feature.label]: this.getStringDefaultValue(feature.value) };

      return obj;
    }, {});
  }

  // TODO: extract these into utils/ to be tested
  getBooleanDefaultValue(value: Catalog.FeatureValueDetails): boolean {
    return value.label === 'true';
  }
  getStringDefaultValue(value: Catalog.FeatureValueDetails): string {
    return value.label;
  }
  getNumberDefaultValue(value: Catalog.FeatureValueDetails): number {
    if (value.numeric_details && typeof value.numeric_details.min === 'number') {
      return value.numeric_details.min;
    }
    return 0;
  }

  customFeatureValue(feature: Catalog.ExpandedFeature) {
    if (!feature.value) return null;

    switch (feature.type) {
      case 'string': {
        const options = Array.isArray(feature.values)
          ? feature.values.map(({ cost, label, name: optionName }) => ({
              label: `${optionName} (${cost ? $(cost) : 'Included'})`,
              value: label,
            }))
          : [];
        return (
          <mf-select
            name={feature.label}
            options={options}
            onUpdateValue={e => this.handleChangeValue(e)}
            defaultValue={this.getStringDefaultValue(feature.value)}
          />
        );
      }
      case 'number': {
        const details = (feature.value && feature.value.numeric_details) || {};
        const { min, max, increment, suffix } = details;
        return (
          <mf-slider
            max={max}
            min={min}
            name={feature.label}
            onUpdateValue={e => this.handleChangeValue(e)}
            suffix={suffix}
            increment={increment}
            value={this.getNumberDefaultValue(feature.value)}
          />
        );
      }
      case 'boolean': {
        return (
          <mf-toggle
            aria-labelledby={`-name`}
            defaultValue={this.getBooleanDefaultValue(feature.value)}
            name={feature.label}
            onUpdateValue={e => this.handleChangeValue(e)}
          />
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    if (!this.product || !this.plan) return null;

    const { name: productName, logo_url: productLogo, label: productLabel } = this.product.body;
    const { name, expanded_features = [] } = this.plan.body;

    return (
      <section itemscope itemtype="https://schema.org/IndividualProduct">
        <div class="plan-details">
          <header class="header">
            <div class="logo">
              <img src={productLogo} alt={productName} itemProp="logo" />
            </div>
            <div>
              <h1 class="plan-name" itemProp="name">
                {name}
              </h1>
              <h2 class="product-name" itemProp="brand">
                {productName}
              </h2>
            </div>
          </header>
          <dl class="features">
            {expanded_features.map(feature => {
              const value = feature.customizable
                ? this.customFeatureValue(feature)
                : this.featureValue(feature);

              let description;
              if (Array.isArray(feature.values)) {
                feature.values.forEach(val => {
                  // eslint-disable-next-line
                  if (val.price && val.price.description) description = val.price.description;
                });
              }

              return [
                <dt class="feature-name">
                  {feature.name}
                  {description && <p class="description">{description}</p>}
                </dt>,
                <dd class="feature-value" data-value={value}>
                  {value === YES && <mf-icon icon="check" margin-right />}
                  {value}
                </dd>,
              ];
            })}
          </dl>
        </div>
        <footer class="footer">
          <manifold-product-cost features={this.features} planID={this.plan.id} />
          <link-button
            href={`${RESOURCE_CREATE}${productLabel}&plan=${this.plan.id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Get {name}
            <mf-icon icon="arrow_right" marginLeft />
          </link-button>
        </footer>
      </section>
    );
  }
}
