import { Component, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
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
  tag: 'manifold-plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class ManifoldPlanDetails {
  @Prop() isExistingResource?: boolean;
  @Prop() plan: Catalog.ExpandedPlan;
  @Prop() product: Catalog.Product;
  @Prop() hideProvisionButton: boolean = false;
  @State() features: UserFeatures = {};
  @Event({
    eventName: 'manifold-planUpdated',
    bubbles: true,
  })
  planUpdated: EventEmitter;
  @Watch('plan') onUpdate(newPlan: Catalog.ExpandedPlan) {
    const features = this.initialFeatures(newPlan);
    this.features = features; // If plan changed, we want to reset all user-selected values
    this.updatedPlanHandler({ features }); // Dispatch change event when plan changed
  }

  componentWillLoad() {
    const features = this.initialFeatures();
    this.features = features; // Set default features the first time
    this.updatedPlanHandler({ features }); // Dispatch change event when loaded
  }

  handleChangeValue({ detail: { name, value } }: CustomEvent) {
    const features = { ...this.features, [name]: value };
    this.features = features;
    this.updatedPlanHandler({ features }); // Dispatch change event when user changed feature
  }

  initialFeatures(plan: Catalog.ExpandedPlan = this.plan): UserFeatures {
    if (!plan.body.expanded_features) return {};
    return { ...initialFeatures(plan.body.expanded_features) };
  }

  updatedPlanHandler({
    id = this.plan.id,
    label = this.plan.body.label,
    product = this.product.body.label,
    features = this.features,
  }) {
    this.planUpdated.emit({
      id,
      label,
      product,
      features,
    });
  }

  renderLockedFeature(displayValue: JSX.Element): JSX.Element {
    return (
      <dd class="feature-value">
        <manifold-tooltip labelText="Feature cannot be changed from current plan">
          <span class="value" data-value={displayValue} data-locked>
            <manifold-icon class="icon" icon="lock" marginRight />
            {displayValue}
          </span>
        </manifold-tooltip>
      </dd>
    );
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
      const displayValue = stringFeatureDisplayValue(feature.value);

      if (this.isExistingResource && (!feature.upgradable || !feature.downgradable)) {
        render.push(this.renderLockedFeature(displayValue));
      } else {
        render.push(
          <dd class="feature-value" data-value={displayValue}>
            {feature.customizable ? (
              <manifold-select
                name={feature.label}
                options={stringFeatureOptions(feature.values || [])}
                onUpdateValue={(e: CustomEvent) => this.handleChangeValue(e)}
                defaultValue={stringFeatureDefaultValue(feature.value)}
              />
            ) : (
              displayValue
            )}
          </dd>
        );
      }
    } else if (feature.type === 'boolean') {
      const displayValue = booleanFeatureDisplayValue(feature.value);

      if (this.isExistingResource && (!feature.upgradable || !feature.downgradable)) {
        render.push(this.renderLockedFeature(displayValue));
      } else {
        render.push(
          <dd class="feature-value" data-value={displayValue}>
            {feature.customizable ? (
              <manifold-toggle
                aria-labelledby={`-name`}
                defaultValue={booleanFeatureDefaultValue(feature.value)}
                name={feature.label}
                onUpdateValue={(e: CustomEvent) => this.handleChangeValue(e)}
              />
            ) : (
              <span class="value" data-value={displayValue}>
                {displayValue === YES && <manifold-icon icon="check" />} {displayValue}
              </span>
            )}
          </dd>
        );
      }
    } else if (feature.type === 'number' && feature.value.numeric_details) {
      const value =
        typeof this.features[feature.label] === 'number'
          ? (this.features[feature.label] as number)
          : numberFeatureDefaultValue(feature.value);
      const displayValue = feature.measurable
        ? numberFeatureMeasurableDisplayValue(feature.value)
        : numberFeatureDisplayValue(feature.value);

      if (this.isExistingResource && (!feature.upgradable && !feature.downgradable)) {
        render.push(this.renderLockedFeature(displayValue || ''));
      } else {
        render.push(
          <dd class="feature-value" data-value={displayValue}>
            {feature.customizable ? (
              <manifold-number-input
                increment={feature.value.numeric_details.increment}
                max={feature.value.numeric_details.max}
                min={feature.value.numeric_details.min}
                name={feature.label}
                onUpdateValue={(e: CustomEvent) => this.handleChangeValue(e)}
                suffix={feature.value.numeric_details.suffix}
                value={value}
                decrement-disabled-label="This feature is not downgradable"
                increment-disabled-label="This feature is not upgradable"
              />
            ) : (
              displayValue
            )}
          </dd>
        );
      }
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
          <manifold-plan-cost
            planId={this.plan.id}
            allFeatures={expanded_features}
            selectedFeatures={this.features}
          />
          {!this.hideProvisionButton && (
            <manifold-link-button
              href={`${RESOURCE_CREATE}${productLabel}&plan=${this.plan.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get {name}
              <manifold-icon icon="arrow_right" marginLeft />
            </manifold-link-button>
          )}
        </footer>
      </section>
    );
  }
}
