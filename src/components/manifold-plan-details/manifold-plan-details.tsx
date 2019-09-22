import {
  h,
  Component,
  Element,
  FunctionalComponent,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';

import { Product, Plan, RegionEdge, Region } from '../../types/graphql';
import { Gateway } from '../../types/gateway';
import { globalRegion } from '../../data/region';
import { initialFeatures } from '../../utils/plan';
// import { FeatureValue } from './components/FeatureValue';
import { FeatureLabel } from './components/FeatureLabel';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { FixedFeature } from './components/FixedFeature';
import { MeteredFeature } from './components/MeteredFeature';
import { ConfigurableFeature } from './components/ConfigurableFeature';

interface EventDetail {
  planId: string;
  planLabel: string;
  planName: string;
  productLabel: string | undefined;
  features: Gateway.FeatureMap;
  regionId: string;
}

interface HeaderProps {
  product: Product;
  planName: string;
}

const Header: FunctionalComponent<HeaderProps> = ({
  product: { logoUrl, displayName },
  planName,
}) => (
  <header class="header">
    <div class="logo">
      <img src={logoUrl} alt={displayName} itemprop="logo" />
    </div>
    <div>
      <h1 class="plan-name" itemprop="name">
        {planName}
      </h1>
      <h2 class="product-name" itemprop="brand">
        {displayName}
      </h2>
    </div>
  </header>
);

interface FooterProps {
  features: Gateway.FeatureMap;
  plan: Plan;
}

const Footer: FunctionalComponent<FooterProps> = ({ plan, features }) => (
  <footer class="footer">
    <manifold-plan-cost plan={plan} selectedFeatures={features} />
    <slot name="cta" />
  </footer>
);

interface SkeletonPlanDetailsProps {
  scrollLocked?: boolean;
}

const SkeletonPlanDetails: FunctionalComponent<SkeletonPlanDetailsProps> = ({ scrollLocked }) => (
  <section class="wrapper" data-scroll-locked={scrollLocked}>
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

const FeatureValue: FunctionalComponent = (_, children) => (
  <dd class="feature-value">{children}</dd>
);

@Component({
  tag: 'manifold-plan-details',
  styleUrl: 'plan-details.css',
  shadow: true,
})
export class ManifoldPlanDetails {
  @Element() el: HTMLElement;
  @Prop() isExistingResource?: boolean = false;
  @Prop() scrollLocked?: boolean = false;
  @Prop() plan?: Plan;
  @Prop() product?: Product;
  @Prop() regions?: string[];
  @Prop() resourceFeatures?: Gateway.ResolvedFeature[];
  @Prop() resourceRegion?: Region;
  @State() regionId: string = globalRegion.id; // default will always be overridden if a plan has regions
  @State() features: Gateway.FeatureMap = {};
  @Event({ eventName: 'manifold-planSelector-change', bubbles: true }) planUpdate: EventEmitter;
  @Event({ eventName: 'manifold-planSelector-load', bubbles: true }) planLoad: EventEmitter;
  @Watch('plan') planChange(newPlan: Plan, oldPlan: Plan | undefined) {
    let features = this.features; // eslint-disable-line prefer-destructuring

    // If plan changed, only reset features & region if user changed it (i.e there would be an oldPlan)
    if (!this.resourceFeatures || oldPlan) {
      features = this.setFeaturesFromPlan(newPlan);
      this.features = features;
      this.updateRegionFromPlan(newPlan);
    }

    const detail: EventDetail = {
      planId: newPlan.id,
      planLabel: newPlan.label,
      planName: newPlan.displayName,
      productLabel: this.product && this.product.label,
      // features: this.customFeatures(features), // We need all features for plan cost, but only need to expose the custom ones
      features: [],
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

  @loadMark()
  @loadMark()
  componentWillLoad() {
    if (this.resourceRegion) {
      this.regionId = this.resourceRegion.id;
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
        planLabel: this.plan.label,
        planName: this.plan.displayName,
        productLabel: this.product.label,
        // features: this.customFeatures(features),
        features: [],
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
        planName: this.plan.displayName,
        planLabel: this.plan.label,
        productLabel: this.product.label,
        // features: this.customFeatures(this.features),
        features: [],
        regionId: e.detail.value,
      };
      this.planUpdate.emit(detail);
    }
  };

  setFeaturesFromPlan(plan: Plan) {
    if (plan) {
      // TODO format features
      return { ...initialFeatures(plan) };
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

  // customFeatures(features: Gateway.FeatureMap): Gateway.FeatureMap {
  //   if (!this.plan) {
  //     return features;
  //   }
  //   const { expanded_features } = this.plan.body;
  //   const customFeatures = { ...features };
  //   Object.entries(customFeatures).forEach(([label]) => {
  //     const feature = expanded_features.find(f => f.label === label);
  //     if (!feature || !feature.customizable) {
  //       delete customFeatures[label];
  //     }
  //   });
  //   return customFeatures;
  // }

  get featureList() {
    if (!this.plan) {
      return null;
    }

    const { fixedFeatures, meteredFeatures, configurableFeatures } = this.plan;

    // TODO: refactor this.
    // these children rely on plan data, and it’s near-impossible to provide them with default values.
    // expose default values higher up so that the resource can overwrite them.
    // expanded_features = expanded_features.map(feature => {
    //   if (!this.resourceFeatures) {
    //     return feature;
    //   }
    //   const resourceFeature = this.resourceFeatures.find(rf => rf.label === feature.label);
    //   if (!resourceFeature) {
    //     return feature;
    //   }
    //   const value: Catalog.FeatureValueDetails = {
    //     ...feature.value,
    //     name: `${resourceFeature.value.displayValue}`,
    //     label: `${resourceFeature.value.value}`,
    //   };
    //   return { ...feature, value };
    // });

    return (
      <dl class="features">
        {fixedFeatures &&
          fixedFeatures.edges.map(({ node: feature }) => {
            return [
              <FeatureLabel name={feature.displayName} />,
              <FeatureValue>
                <FixedFeature feature={feature} />
              </FeatureValue>,
            ];
          })}
        {meteredFeatures &&
          meteredFeatures.edges.map(({ node: feature }) => {
            return [
              <FeatureLabel name={feature.displayName} />,
              <FeatureValue>
                <MeteredFeature feature={feature} />
              </FeatureValue>,
            ];
          })}
        {configurableFeatures &&
          configurableFeatures.edges.map(({ node: feature }) => {
            return [
              <FeatureLabel name={feature.displayName} />,
              // Rename to config feature value
              <FeatureValue>
                <ConfigurableFeature
                  features={this.features}
                  feature={feature}
                  onChange={e => this.handleChangeValue(e)}
                />
              </FeatureValue>,
            ];
          })}
      </dl>
    );
  }

  get regionSelector() {
    let regions: RegionEdge[] = [];

    if (this.resourceRegion) {
      const region = { node: this.resourceRegion };
      regions = [region as RegionEdge];
    } else if (this.plan && this.plan.regions) {
      regions = this.plan.regions.edges; // eslint-disable-line prefer-destructuring
    }

    // Hide the non-region
    if (regions.length === 1 && regions[0].node.id === globalRegion.id) {
      return null;
    }

    const name = 'manifold-region-selector';

    return (
      <div class="region">
        <label class="region-label" id={name}>
          Region
        </label>
        <manifold-region-selector
          allowedRegions={regions.map(({ node }) => node.id)}
          ariaLabel={name}
          name={name}
          onUpdateValue={this.handleChangeRegion}
          preferredRegions={this.regions}
          regions={(this.plan && this.plan.regions && this.plan.regions.edges) || undefined}
          value={this.regionId}
        />
      </div>
    );
  }

  updateRegionFromPlan = (newPlan: Plan) => {
    // If region already set and changing plans, keep it
    if (newPlan.regions && !newPlan.regions.edges.filter(({ node }) => node.id === this.regionId)) {
      // If user has specified regions, try and find the first
      let firstRegion; // =
      // this.regions && this.regions.find(region => newPlan.regions && newPlan.regions.edges.includes(region));
      // Otherwise pick the first region from the plan
      if (!firstRegion) {
        [firstRegion] = newPlan.regions.edges;
      }
      if (firstRegion) {
        this.regionId = firstRegion.node.id;
      }
    }
  };

  @logger()
  render() {
    if (this.plan && this.product) {
      return (
        <section
          class="wrapper"
          data-scroll-locked={this.scrollLocked}
          itemscope
          itemtype="https://schema.org/IndividualProduct"
        >
          <div class="card">
            <Header product={this.product} planName={this.plan.displayName} />
            {this.featureList}
            {this.regionSelector}
            <Footer plan={this.plan} features={this.features} />
          </div>
        </section>
      );
    }
    // 💀
    return <SkeletonPlanDetails scrollLocked={this.scrollLocked} />;
  }
}
