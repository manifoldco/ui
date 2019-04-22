import { Component, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { arrow_right } from '@manifoldco/icons';
import { globalRegion } from '../../data/region';
import { initialFeatures } from '../../utils/plan';
import { FeatureValue } from './components/FeatureValue';
import { FeatureLabel } from './components/FeatureLabel';

interface EventDetail {
  planId: string;
  planLabel: string;
  productLabel: string | undefined;
  features: UserFeatures;
  regionId: string;
}

@Component({
  tag: 'manifold-plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class ManifoldPlanDetails {
  @Prop() isExistingResource?: boolean;
  @Prop() hideCta?: boolean = false;
  @Prop() linkFormat?: string;
  @Prop() plan?: Catalog.ExpandedPlan;
  @Prop() product?: Catalog.Product;
  @State() regionId: string = globalRegion.id;
  @State() features: UserFeatures = {};
  @Event({ eventName: 'manifold-planSelector-change', bubbles: true }) planUpdate: EventEmitter;
  @Event({ eventName: 'manifold-planSelector-click', bubbles: true }) planClick: EventEmitter;
  @Event({ eventName: 'manifold-planSelector-load', bubbles: true }) planLoad: EventEmitter;
  @Watch('plan') onUpdate(newPlan: Catalog.ExpandedPlan) {
    const features = this.initialFeatures(newPlan);
    this.features = features; // If plan changed, we want to reset all user-selected values

    this.updateRegionId(newPlan);

    const detail: EventDetail = {
      planId: newPlan.id,
      planLabel: newPlan.body.label,
      productLabel: this.product && this.product.body.label,
      features,
      regionId: this.regionId,
    };
    this.planUpdate.emit(detail);
  }

  componentWillLoad() {
    const features = this.initialFeatures();
    this.features = features; // Set default features the first time
    if (this.plan && this.product) {
      this.updateRegionId(this.plan);
      // This conditional should always fire on component load
      const detail: EventDetail = {
        planId: this.plan.id,
        planLabel: this.plan.body.label,
        productLabel: this.product.body.label,
        features,
        regionId: this.regionId,
      };
      this.planLoad.emit(detail);
    }
  }

  handleChangeValue({ detail: { name, value } }: CustomEvent) {
    const features = { ...this.features, [name]: value };
    this.features = features; // User-selected features
    if (this.plan && this.product) {
      // Same as above: this should always fire; just needed for TS
      const detail: EventDetail = {
        planId: this.plan.id,
        planLabel: this.plan.body.label,
        productLabel: this.product.body.label,
        features,
        regionId: this.regionId,
      };
      this.planUpdate.emit(detail);
    }
  }

  handleChangeRegion(e: CustomEvent) {
    if (!e.detail || !e.detail.value) return;
    this.regionId = e.detail.value;
    if (this.plan && this.product) {
      const detail: EventDetail = {
        planId: this.plan.id,
        planLabel: this.plan.body.label,
        productLabel: this.product.body.label,
        features: this.features,
        regionId: e.detail.value,
      };
      this.planUpdate.emit(detail);
    }
  }

  initialFeatures(plan: Catalog.ExpandedPlan | undefined = this.plan): UserFeatures {
    if (!plan || !plan.body.expanded_features) return {};
    return { ...initialFeatures(plan.body.expanded_features) };
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
      .replace(/:product/gi, this.product.body.label)
      .replace(/:plan/gi, this.plan.body.label)
      .replace(/:features/gi, params.toString());
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
        {this.hideCta !== true && (
          <manifold-link-button
            onClick={this.onClick}
            href={this.ctaLink}
            rel={this.ctaLink && 'noopener noreferrer'}
            target={this.ctaLink && '_blank'}
          >
            Get {name}
            <manifold-icon icon={arrow_right} marginLeft />
          </manifold-link-button>
        )}
      </footer>
    );
  }

  get regionSelector() {
    if (!this.plan) return null;

    const name = `${this.plan.body.label}-region`;
    return (
      <div class="region">
        <label class="region-label" id={name}>
          Region
        </label>
        <manifold-region-selector
          allowedRegions={this.plan.body.regions}
          ariaLabel={name}
          name={name}
          onChange={e => this.handleChangeRegion(e)}
        />
      </div>
    );
  }

  onClick = (e: Event): void => {
    if (!this.linkFormat && this.plan && this.product) {
      e.preventDefault();
      const detail: EventDetail = {
        productLabel: this.product.body.label,
        planId: this.plan.id,
        planLabel: this.plan.body.label,
        features: this.features,
        regionId: this.regionId,
      };
      this.planClick.emit(detail);
    }
  };

  updateRegionId = (plan: Catalog.ExpandedPlan) => {
    // Only update the region if the values are different
    if (!plan.body.regions.includes(this.regionId)) {
      const [firstRegion] = plan.body.regions;
      if (firstRegion) this.regionId = firstRegion;
    }
  };

  render() {
    if (!this.product || !this.plan) return null;

    return (
      <section itemscope itemtype="https://schema.org/IndividualProduct">
        <div class="plan-details">
          {this.header}
          {this.featureList}
          {this.regionSelector}
        </div>
        {this.footer}
      </section>
    );
  }
}
