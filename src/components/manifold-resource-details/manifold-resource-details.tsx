import { Component, Prop, Element, State, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

import { FeatureName } from './components/FeatureName';
import { FeatureValue } from './components/FeatureValue';
import { $ } from '../../utils/currency';

@Component({
  tag: 'manifold-resource-details',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldResourceDetails {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Which resource does this belong to? */
  @Prop() resourceName: string;
  @State() resource?: Gateway.Resource;
  @Watch('resourceName') resourceChange(newName: string) {
    this.fetchResource(newName);
  }

  fetchResource(resourceName: string) {
    return fetch(`${this.connection.gateway}/resources/me/${resourceName}`, withAuth())
      .then(response => response.json())
      .then((resource: Gateway.Resource) => {
        this.resource = resource;
      });
  }

  async componentWillLoad() {
    return this.fetchResource(this.resourceName);
  }

  render() {
    if (!this.resource) return null;

    const { expanded_features, name } = this.resource.plan as Gateway.ResolvedPlan;
    const { estimated_cost, features: customFeatures = [] } = this.resource;
    return (
      <div class="container">
        <h3 class="heading">Plan Features</h3>
        <div class="details">
          {estimated_cost && [
            <span class="amount">{$(estimated_cost.cost)}</span>,
            <span class="suffix">/mo</span>,
          ]}
          <p class="plan-name">{name}</p>
        </div>
        <dl class="features">
          {expanded_features.map(feature => {
            const customFeature = customFeatures.find(({ label }) => label === feature.label);
            const customValue = customFeature && customFeature.value.value;

            return [
              <dt class="feature-name">
                <FeatureName feature={feature} />
              </dt>,
              <dd class="feature-value">
                <FeatureValue feature={feature} value={customValue} />
              </dd>,
            ];
          })}
        </dl>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldResourceDetails, ['connection']);
