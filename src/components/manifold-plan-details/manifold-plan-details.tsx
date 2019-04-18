import { Component, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { initialFeatures } from '../../utils/plan';
import { FeatureValue } from './components/FeatureValue';
import { FeatureLabel } from './components/FeatureLabel';

@Component({
  tag: 'manifold-plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class ManifoldPlanDetails {
  @Prop() isExistingResource?: boolean;
  @Prop() plan?: Catalog.ExpandedPlan;
  @Prop() linkFormat?: string;
  @Prop() product?: Catalog.Product;
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
  @Event({
    eventName: 'manifold-planCTA-click',
    bubbles: true,
  }) ctaClicked: EventEmitter;

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

  initialFeatures(plan: Catalog.ExpandedPlan | undefined = this.plan): UserFeatures {
    if (!plan || !plan.body.expanded_features) return {};
    return { ...initialFeatures(plan.body.expanded_features) };
  }

  updatedPlanHandler({
    id = this.plan && this.plan.id,
    label = this.plan && this.plan.body.label,
    product = this.product && this.product.body.label,
    features = this.features,
  }) {
    this.planUpdated.emit({
      id,
      label,
      product,
      features,
    });
  }

  get ctaLink() {
    if (!this.product || !this.plan) return undefined;
    if (typeof this.linkFormat !== 'string') return undefined;
    const params = new URLSearchParams();
    if (Object.keys(this.features)) {
      Object.entries(this.features).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    }
    return this.linkFormat
      .replace(/:product/ig, this.product.body.label)
      .replace(/:plan/ig, this.plan.body.label)
      .replace(/:features/ig, params.toString())
  }

  get header() {
    if (!this.product || !this.plan) return null;

    const { name: productName, logo_url: productLogo } = this.product.body;

    return (
      <header class="header">
        <div class="logo">
          <img src={productLogo} alt={productName} itemprop="logo" />
        </div>
        <div>
          <h1 class="plan-name" itemprop="name">
            {this.plan.body.name}
          </h1>
          <h2 class="product-name" itemprop="brand">
            {productName}
          </h2>
        </div>
      </header>
    );
  }

  get featureList() {
    if (!this.plan) return null;

    const { expanded_features = [] } = this.plan.body;
    return (
      <dl class="features">
        {expanded_features.map(feature => [
          <FeatureLabel feature={feature} />,
          <FeatureValue
            features={this.features}
            feature={feature}
            onChange={e => this.handleChangeValue(e)}
          />,
        ])}
      </dl>
    );
  }

  get footer() {
    if (!this.product || !this.plan) return null;
    const { name, expanded_features = [] } = this.plan.body;
    return (
      <footer class="footer">
        <manifold-plan-cost
          planId={this.plan.id}
          allFeatures={expanded_features}
          selectedFeatures={this.features}
        />
        {!this.hideProvisionButton && (
          <manifold-link-button
            onClick={this.onClick}
            href={this.ctaLink}
            rel={this.ctaLink && 'noopener noreferrer'}
            target={this.ctaLink && '_blank'}
          >
            Get {name}
            <manifold-icon icon="arrow_right" marginLeft />
          </manifold-link-button>
        )}
      </footer>
    );
  }

  onClick = (e: Event): void => {
    if (!this.linkFormat) {
      e.preventDefault();
      const product = this.product && this.product.body.label;
      const plan = this.plan && this.plan.body.label;
      this.ctaClicked.emit({ product, plan, features: this.features });
    }
  };

  render() {
    if (!this.product || !this.plan) return null;

    return (
      <section itemscope itemtype="https://schema.org/IndividualProduct">
        <div class="plan-details">
          {this.header}
          {this.featureList}
        </div>
        {this.footer}
      </section>
    );
  }
}
