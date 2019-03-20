import { Component, Prop } from '@stencil/core';
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
  @Prop() product: Catalog.ExpandedProduct;

  // TODO clean this up
  featureValue({
    measurable,
    type,
    value,
    value_string,
  }: Catalog.ExpandedFeature): string | undefined {
    if (!value) return undefined;

    if (measurable && value.numeric_details && value.numeric_details.cost_ranges) {
      if (value.numeric_details.cost_ranges.length === 0) {
        return value.name.replace(/^No .*/, NO).replace(/^Yes/, YES);
      }
      const suffix = value.numeric_details.suffix ? value.numeric_details.suffix.toLowerCase() : '';

      let freeText = '';
      const freeTier = value.numeric_details.cost_ranges.find(
        (feature: any) => !feature.cost_multiple || feature.cost_multiple === 0
      );
      if (freeTier) freeText = ` (free until ${freeTier.limit} ${suffix})`;

      const sortedCosts = value.numeric_details.cost_ranges
        .filter((feature: any) => feature.cost_multiple > 0)
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

      // eslint-disable-next-line no-irregular-whitespace
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

  selectedValue(feature: Catalog.ExpandedFeature): string {
    return feature.value_string || '';
  }

  customFeatureValue(feature: Catalog.ExpandedFeature) {
    return <custom-plan-feature feature={feature} selectedValue={this.selectedValue(feature)} />;
  }

  render() {
    if (!this.product || !this.plan) return null;

    const { name: productName, logo_url: productLogo, label: productLabel } = this.product.body;
    const { name, expanded_features = [], cost } = this.plan.body;

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
          <div class="cost" itemprop="price">
            {$(cost)} <small>&nbsp;/ mo</small>
          </div>
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
