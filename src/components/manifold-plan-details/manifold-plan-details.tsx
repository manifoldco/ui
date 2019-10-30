import { h, Component, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { check } from '@manifoldco/icons';

import { Option } from '../../types/Select';
import { Gateway } from '../../types/gateway';
import { PlansQuery } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { configurableFeatureDefaults } from '../../utils/plan';
import MeteredFeature from './components/MeteredFeature';
import ConfigurableFeature from './components/ConfigurableFeature';

type Product = PlansQuery['product'];
type Plan = Product['paidPlans']['edges'][0]['node'];
type Regions = Plan['regions']['edges'];

interface NotifyOptions {
  product?: Product;
  plan?: Plan;
  regionId?: string;
  type?: 'load' | 'change';
}

@Component({
  tag: 'manifold-plan-details',
  styleUrl: 'manifold-plan-details.css',
  shadow: true,
})
export class ManifoldPlanDetails {
  @Element() el: HTMLElement;
  @Prop() isExistingResource?: boolean = false;
  @Prop() scrollLocked?: boolean = false;
  @Prop() plan?: Plan;
  @Prop() product?: Product;
  @Prop() regions?: string[];
  @Prop() resourceRegion?: string;
  @State() features: Gateway.FeatureMap = {};
  @State() regionId?: string;
  @Event({ eventName: 'manifold-planSelector-change', bubbles: true }) planUpdate: EventEmitter;
  @Event({ eventName: 'manifold-planSelector-load', bubbles: true }) planLoad: EventEmitter;
  @Watch('plan') planChange(newPlan: Plan, oldPlan: Plan | undefined) {
    if (!oldPlan) {
      // load event if first time
      this.emitEvent({ plan: newPlan, type: 'load' });
    } else {
      // change event if updating
      this.emitEvent({ plan: newPlan });
    }

    // update features
    this.resetFeatures(newPlan);
  }
  @Watch('resourceRegion') resourceRegionChange(newRegion: string) {
    this.regionId = newRegion;
  }

  @loadMark()
  @loadMark()
  componentWillLoad() {
    if (this.resourceRegion) {
      this.regionId = this.resourceRegion;
    }

    // if component loads before plan, this will fire in @Watch()
    this.emitEvent({ type: 'load' });

    if (this.plan) {
      this.resetFeatures(this.plan);
    }
  }

  handleChangeValue = ({ detail: { name, value } }: CustomEvent) => {
    const features = { ...this.features, [name]: value };
    this.features = features; // User-selected features
    this.emitEvent({});
  };

  handleChangeRegion = (e: CustomEvent) => {
    if (!e.detail || !e.detail.value) {
      return;
    }
    this.regionId = e.detail.value;
    this.emitEvent({ regionId: e.detail.value });
  };

  filterRegions(regions: Regions, allowedRegions: string[] | undefined = this.regions) {
    if (Array.isArray(allowedRegions) && allowedRegions.length) {
      return regions.filter(({ node: { id } }) => allowedRegions.includes(id));
    }
    return regions;
  }

  fixedDisplayValue(displayValue: string) {
    // normalize true/false features
    if (['true', 'yes'].includes(displayValue.toLowerCase())) {
      return (
        <span class="value" data-value="true">
          <manifold-icon class="icon" icon={check} marginRight /> YES
        </span>
      );
    }
    if (['false', 'no', 'none'].includes(displayValue.toLowerCase())) {
      return (
        <span class="value" data-value="false">
          NO
        </span>
      );
    }
    return displayValue;
  }

  getDefaultRegion(plan: Plan, regionId?: string, allowedRegions?: string[]) {
    if (!plan.regions) {
      return undefined;
    }

    const regions = this.filterRegions(plan.regions.edges, allowedRegions);
    const [firstRegion] = regions;
    if (regionId) {
      const region = regions.find(({ node: { id } }) => id === regionId);
      return region || firstRegion;
    }
    return firstRegion;
  }

  get regionOptions() {
    if (!this.plan || !this.plan.regions) {
      return undefined;
    }

    let regions: Regions = [];

    const resourceRegion = this.plan.regions.edges.find(
      ({ node }) => node.id === this.resourceRegion
    );
    if (resourceRegion) {
      regions = [resourceRegion];
    } else {
      regions = this.filterRegions(this.plan.regions.edges);
    }

    // hide if only one
    if (regions.length < 2) {
      return undefined;
    }

    const options: Option[] = regions.map(({ node: { id, displayName } }) => ({
      label: displayName,
      value: id,
    }));

    return options;
  }

  emitEvent({
    product = this.product,
    plan = this.plan,
    regionId = this.regionId,
    type = 'change',
  }: NotifyOptions) {
    if (!product || !plan) {
      return;
    }

    const defaultRegion = this.getDefaultRegion(plan, regionId, this.regions);
    const detail = {
      planId: plan.id,
      planName: plan.displayName,
      planLabel: plan.label,
      productId: product.id,
      productLabel: product.label,
      regionId,
      regionName: defaultRegion && defaultRegion.node.displayName,
    };
    if (type === 'load') {
      this.planLoad.emit(detail);
    } else {
      this.planUpdate.emit(detail);
    }
  }

  resetFeatures(plan: Plan) {
    if (plan.configurableFeatures) {
      this.features = configurableFeatureDefaults(plan.configurableFeatures.edges);
    } else {
      this.features = {};
    }
  }

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
            <header class="header">
              <div class="logo">
                <img src={this.product.logoUrl} alt={this.product.displayName} itemprop="logo" />
              </div>
              <div>
                <h1 class="plan-name" itemprop="name">
                  {this.plan.displayName}
                </h1>
                <h2 class="product-name" itemprop="brand">
                  {this.product.displayName}
                </h2>
              </div>
            </header>
            <dl class="features">
              {this.plan.fixedFeatures &&
                this.plan.fixedFeatures.edges.map(({ node: { displayName, displayValue } }) => [
                  <dt class="feature-name">{displayName}</dt>,
                  <dd class="feature-value">{this.fixedDisplayValue(displayValue)}</dd>,
                ])}
              {this.plan.meteredFeatures &&
                this.plan.meteredFeatures.edges.map(meteredFeature => (
                  <MeteredFeature meteredFeature={meteredFeature} />
                ))}
              {this.plan.configurableFeatures &&
                this.plan.configurableFeatures.edges.map(configurableFeature => (
                  <ConfigurableFeature
                    onChange={this.handleChangeValue}
                    configurableFeature={configurableFeature}
                    value={this.features[configurableFeature.node.label]}
                  />
                ))}
            </dl>
            {this.regionOptions && (
              <div class="region">
                <label
                  class="region-label"
                  htmlFor="manifold-region-selector"
                  id="manifold-region-selector-label"
                >
                  Region
                </label>
                <manifold-select
                  aria-label="plan region selection"
                  defaultValue={this.regionId}
                  id="manifold-region-selector"
                  name="manifold-region-selector"
                  onUpdateValue={this.handleChangeRegion}
                  options={this.regionOptions}
                />
              </div>
            )}
            <footer class="footer">
              <manifold-plan-cost plan={this.plan} selectedFeatures={this.features} />
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
