import { h, Component, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import { globalRegion } from '../../data/region';
import { initialFeatures } from '../../utils/plan';
import { FeatureValue } from './components/FeatureValue';
import { FeatureLabel } from './components/FeatureLabel';
import logger from '../../utils/logger';

interface EventDetail {
  planId: string;
  planLabel: string;
  planName: string;
  productLabel: string | undefined;
  features: Gateway.FeatureMap;
  regionId: string;
}

@Component({
  tag: 'manifold-plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class ManifoldPlanDetails {
  @Prop() isExistingResource?: boolean = false;
  @Prop() scrollLocked?: boolean = false;
  @Prop() plan?: Catalog.ExpandedPlan;
  @Prop() product?: Catalog.Product;
  @Prop() regions?: string[];
  @Prop() resourceFeatures?: Gateway.ResolvedFeature[];
  @Prop() resourceRegion?: string;
  @State() regionId: string = globalRegion.id; // default will always be overridden if a plan has regions
  @State() features: Gateway.FeatureMap = {};
  @Event({ eventName: 'manifold-planSelector-change', bubbles: true }) planUpdate: EventEmitter;
  @Event({ eventName: 'manifold-planSelector-load', bubbles: true }) planLoad: EventEmitter;
  @Watch('plan') planChange(
    newPlan: Catalog.ExpandedPlan,
    oldPlan: Catalog.ExpandedPlan | undefined
  ) {
    let features = this.features; // eslint-disable-line prefer-destructuring

    // If plan changed, only reset features & region if user changed it (i.e there would be an oldPlan)
    if (!this.resourceFeatures || oldPlan) {
      features = this.setFeaturesFromPlan(newPlan);
      this.features = features;
      this.updateRegionFromPlan(newPlan);
    }

    const detail: EventDetail = {
      planId: newPlan.id,
      planLabel: newPlan.body.label,
      planName: newPlan.body.name,
      productLabel: this.product && this.product.body.label,
      features: this.customFeatures(features), // We need all features for plan cost, but only need to expose the custom ones
      regionId: this.regionId,
    };

    if (!oldPlan) {
      this.planLoad.emit(detail);
    } else {
      this.planUpdate.emit(detail);
    }
  }
  @Watch('resourceFeatures') resourceFeaturesChange(newFeatures: Gateway.ResolvedFeature[]) {
    this.features = this.setFeaturesFromResource(newFeatures);
  }
  @Watch('resourceRegion') resourceRegionChange(newRegion: string) {
    this.regionId = newRegion;
  }

  componentWillLoad() {
    if (this.resourceRegion) {
      this.regionId = this.resourceRegion;
    }

    if (this.resourceFeatures) {
      this.features = this.setFeaturesFromResource(this.resourceFeatures);
    } else if (this.plan) {
      this.features = this.setFeaturesFromPlan(this.plan);
    }

    if (this.plan) {
      this.updateRegionFromPlan(this.plan);
    }
  }

  handleChangeValue({ detail: { name, value } }: CustomEvent) {
    const features = { ...this.features, [name]: value };
    this.features = features; // User-selected features
    if (this.plan && this.product) {
      const detail: EventDetail = {
        planId: this.plan.id,
        planLabel: this.plan.body.label,
        planName: this.plan.body.name,
        productLabel: this.product.body.label,
        features: this.customFeatures(features),
        regionId: this.regionId,
      };
      this.planUpdate.emit(detail);
    }
  }

  handleChangeRegion = (e: CustomEvent) => {
    if (!e.detail || !e.detail.value) {
      return;
    }
    this.regionId = e.detail.value;
    if (this.plan && this.product) {
      const detail: EventDetail = {
        planId: this.plan.id,
        planName: this.plan.body.name,
        planLabel: this.plan.body.label,
        productLabel: this.product.body.label,
        features: this.customFeatures(this.features),
        regionId: e.detail.value,
      };
      this.planUpdate.emit(detail);
    }
  };

  setFeaturesFromPlan(plan: Catalog.ExpandedPlan) {
    if (plan.body.expanded_features) {
      return { ...initialFeatures(plan.body.expanded_features) };
    }
    return {};
  }

  setFeaturesFromResource(features: Gateway.ResolvedFeature[]) {
    return features.reduce(
      (map, { label, value }) => ({
        ...map,
        [label]: value.value,
      }),
      {}
    );
  }

  customFeatures(features: Gateway.FeatureMap): Gateway.FeatureMap {
    if (!this.plan || !this.plan.body.expanded_features) {
      return features;
    }
    const { expanded_features } = this.plan.body;
    const customFeatures = { ...features };
    Object.entries(customFeatures).forEach(([label]) => {
      const feature = expanded_features.find(f => f.label === label);
      if (!feature || !feature.customizable) {
        delete customFeatures[label];
      }
    });
    return customFeatures;
  }

  get featureList() {
    if (!this.plan) {
      return null;
    }

    let { expanded_features = [] } = this.plan.body;

    // TODO: refactor this.
    // these children rely on plan data, and it’s near-impossible to provide them with default values.
    // expose default values higher up so that the resource can overwrite them.
    expanded_features = expanded_features.map(feature => {
      if (!this.resourceFeatures) {
        return feature;
      }
      const resourceFeature = this.resourceFeatures.find(rf => rf.label === feature.label);
      if (!resourceFeature) {
        return feature;
      }
      const value: Catalog.FeatureValueDetails = {
        ...feature.value,
        name: `${resourceFeature.value.displayValue}`,
        label: `${resourceFeature.value.value}`,
      };
      return { ...feature, value };
    });

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

  get regionSelector() {
    let regions: string[] = [];

    if (this.resourceRegion) {
      regions = [this.resourceRegion];
    } else if (this.plan) {
      regions = this.plan.body.regions; // eslint-disable-line prefer-destructuring
    }

    // Hide the non-region
    if (regions.length === 1 && regions[0] === globalRegion.id) {
      return null;
    }

    const name = 'manifold-region-selector';

    return (
      <div class="region">
        <label class="region-label" id={name}>
          Region
        </label>
        <manifold-region-selector
          allowedRegions={regions}
          ariaLabel={name}
          name={name}
          onUpdateValue={this.handleChangeRegion}
          preferredRegions={this.regions}
          value={this.regionId}
        />
      </div>
    );
  }

  updateRegionFromPlan = (newPlan: Catalog.ExpandedPlan) => {
    // If region already set and changing plans, keep it
    if (!newPlan.body.regions.includes(this.regionId)) {
      // If user has specified regions, try and find the first
      let firstRegion =
        this.regions && this.regions.find(region => newPlan.body.regions.includes(region));
      // Otherwise pick the first region from the plan
      if (!firstRegion) {
        [firstRegion] = newPlan.body.regions;
      }
      if (firstRegion) {
        this.regionId = firstRegion;
      }
    }
  };

  @logger()
  render() {
    if (this.plan && this.product) {
      const { logo_url, name: productName } = this.product.body;
      const { expanded_features, name: planName } = this.plan.body;

      return (
        <section
          class="wrapper"
          data-scroll-locked={this.scrollLocked}
          itemscope
          itemtype="https://schema.org/IndividualProduct"
        >
          <div class="card">
            <header class="header">
              <div class="logo">
                <img src={logo_url} alt={productName} itemprop="logo" />
              </div>
              <div>
                <h1 class="plan-name" itemprop="name">
                  {planName}
                </h1>
                <h2 class="product-name" itemprop="brand">
                  {productName}
                </h2>
              </div>
            </header>
            {this.featureList}
            {this.regionSelector}
            <footer class="footer">
              <manifold-plan-cost
                planId={this.plan.id}
                allFeatures={expanded_features}
                selectedFeatures={this.features}
              />
              <slot name="cta" />
            </footer>
          </div>
        </section>
      );
    }
    // 💀
    return (
      <section class="wrapper" data-scroll-locked={this.scrollLocked}>
        <div class="card">
          <header class="header">
            <div class="logo">
              <manifold-skeleton-img />
            </div>
            <div>
              <h1 class="plan-name" itemprop="name">
                <manifold-skeleton-text>Plan name</manifold-skeleton-text>
              </h1>
              <h2 class="product-name" itemprop="brand">
                <manifold-skeleton-text>Product name</manifold-skeleton-text>
              </h2>
            </div>
          </header>
          <br />
          <manifold-skeleton-text>Features features features features</manifold-skeleton-text>
          <footer class="footer">
            <manifold-skeleton-text>Free</manifold-skeleton-text>
          </footer>
        </div>
      </section>
    );
  }
}
