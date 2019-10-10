import { h, Component, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { check } from '@manifoldco/icons';

import { Option } from '../../types/Select';
import { Gateway } from '../../types/gateway';
import { Product, Plan, Region } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { configurableFeatureDefaults } from '../../utils/plan';
import MeteredFeature from './components/MeteredFeature';
import ConfigurableFeature from './components/ConfigurableFeature';

interface EventDetail {
  planId: string;
  planLabel: string;
  planName: string;
  productLabel: string | undefined;
  regionId?: string;
}

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
  @Prop() resourceRegion?: string;
  @State() features: Gateway.FeatureMap = {};
  @State() regionId?: string;
  @Event({ eventName: 'manifold-planSelector-change', bubbles: true }) planUpdate: EventEmitter;
  @Event({ eventName: 'manifold-planSelector-load', bubbles: true }) planLoad: EventEmitter;
  @Watch('plan') planChange(newPlan: Plan, oldPlan: Plan | undefined) {
    const defaultRegion = this.getDefaultRegion(newPlan, this.regionId, this.regions);
    const detail: EventDetail = {
      planId: newPlan.id,
      planLabel: newPlan.label,
      planName: newPlan.displayName,
      productLabel: this.product && this.product.label,
      regionId: defaultRegion && defaultRegion.id,
    };

    if (!oldPlan) {
      this.planLoad.emit(detail);
    } else {
      this.planUpdate.emit(detail);
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

    if (this.plan) {
      this.resetFeatures(this.plan);
    }
  }

  handleChangeValue = ({ detail: { name, value } }: CustomEvent) => {
    const features = { ...this.features, [name]: value };
    this.features = features; // User-selected features
    if (this.plan && this.product) {
      const detail: EventDetail = {
        planId: this.plan.id,
        planLabel: this.plan.label,
        planName: this.plan.displayName,
        productLabel: this.product.label,
        regionId: this.regionId,
      };
      this.planUpdate.emit(detail);
    }
  };

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
        regionId: e.detail.value,
      };
      this.planUpdate.emit(detail);
    }
  };

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

    const regions = allowedRegions
      ? plan.regions.edges.filter(({ node: { id } }) => allowedRegions.includes(id))
      : plan.regions.edges;
    const [firstRegion] = regions;
    if (regionId) {
      const region = regions.find(({ node: { id } }) => id === regionId);
      return (region && region.node) || firstRegion.node;
    }
    return firstRegion.node;
  }

  get regionOptions() {
    if (!this.plan || !this.plan.regions) {
      return undefined;
    }

    let regions: Region[] = [];

    const resourceRegion = this.plan.regions.edges.find(
      ({ node }) => node.id === this.resourceRegion
    );
    if (resourceRegion) {
      regions = [resourceRegion.node];
    } else {
      regions = this.plan.regions.edges.map(({ node }) => node);
    }

    // hide if only one
    if (regions.length === 1) {
      return undefined;
    }

    const options: Option[] = regions.map(({ id, displayName }) => ({
      label: displayName,
      value: id,
    }));

    return options;
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
