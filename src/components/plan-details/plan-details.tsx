import { Component, Prop, State, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import {
  booleanFeatureDefaultValue,
  booleanFeatureDisplayValue,
  featureDescription,
  initialFeatures,
  numberFeatureDefaultValue,
  numberFeatureDisplayValue,
  numberFeatureMeasurableDisplayValue,
  stringFeatureDefaultValue,
  stringFeatureDisplayValue,
  stringFeatureOptions,
  YES,
} from '../../utils/plan';

const RESOURCE_CREATE = '/resource/create?product='; // TODO get actual url

@Component({
  tag: 'plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class PlanDetails {
  @Prop() plan: Catalog.ExpandedPlan;
  @Prop() product: Catalog.Product;
  @State() features: UserFeatures = {};
  @Watch('plan') onUpdate() {
    this.features = this.initialFeatures();
  }

  componentWillLoad() {
    this.features = this.initialFeatures();
  }

  handleChangeValue({ detail: { name, value } }: CustomEvent) {
    this.features = {
      ...this.features,
      [name]: value,
    };
  }

  initialFeatures(): UserFeatures {
    if (!this.plan.body.expanded_features) return {};
    return initialFeatures(this.plan.body.expanded_features);
  }

  renderFeature(feature: Catalog.ExpandedFeature): JSX.Element[] | null {
    if (!feature.value) return null;

    const description = featureDescription(feature.value);
    const render: JSX.Element[] = [
      <dt class="feature-name">
        {feature.name}
        {description && <p class="description">{description}</p>}
      </dt>,
    ];

    if (feature.type === 'string') {
      render.push(
        <dd class="feature-value">
          {feature.customizable ? (
            <mf-select
              name={feature.label}
              options={stringFeatureOptions(feature.values || [])}
              onUpdateValue={e => this.handleChangeValue(e)}
              defaultValue={stringFeatureDefaultValue(feature.value)}
            />
          ) : (
            stringFeatureDisplayValue(feature.value)
          )}
        </dd>
      );
    } else if (feature.type === 'boolean') {
      const displayValue = booleanFeatureDisplayValue(feature.value);

      render.push(
        <dd class="feature-value" data-value={displayValue}>
          {feature.customizable ? (
            <mf-toggle
              aria-labelledby={`-name`}
              defaultValue={booleanFeatureDefaultValue(feature.value)}
              name={feature.label}
              onUpdateValue={e => this.handleChangeValue(e)}
            />
          ) : (
            [displayValue === YES && <mf-icon icon="check" margin-right />, displayValue]
          )}
        </dd>
      );
    } else if (feature.type === 'number' && typeof feature.value.numeric_details === 'object') {
      const value =
        typeof this.features[feature.label] === 'number'
          ? (this.features[feature.label] as number)
          : numberFeatureDefaultValue(feature.value);
      render.push(
        <dd class="feature-value">
          {feature.measurable && numberFeatureMeasurableDisplayValue(feature.value)}
          {feature.customizable && (
            <mf-number-input
              increment={feature.value.numeric_details.increment}
              max={feature.value.numeric_details.max}
              min={feature.value.numeric_details.min}
              name={feature.label}
              onUpdateValue={(e: CustomEvent) => this.handleChangeValue(e)}
              suffix={feature.value.numeric_details.suffix}
              value={value}
            />
          )}
          {!feature.measurable && !feature.customizable && numberFeatureDisplayValue(feature.value)}
        </dd>
      );
    }

    return render;
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
          <dl class="features">{expanded_features.map(feature => this.renderFeature(feature))}</dl>
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
