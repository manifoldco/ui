import { Component, Prop, Element, State } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { initialFeatures } from '../../utils/plan';

import { FeatureValue } from '../manifold-plan-details/components/FeatureValue';
import { FeatureLabel } from '../manifold-plan-details/components/FeatureLabel';

@Component({
  tag: 'manifold-resource-details',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldResourceDetails {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** ID of resource */
  @Prop() resourceId: string;
  @State() resource?: Marketplace.Resource;
  @State() plan?: Catalog.ExpandedPlan;

  async componentWillLoad() {
    // get resource data
    const resourceResponse = await fetch(
      `${this.connection.marketplace}/resources/${this.resourceId}`,
      withAuth()
    );
    const resource = await resourceResponse.json();
    this.resource = { ...resource };

    // get plan data
    if (this.resource) {
      const planResponse = await fetch(
        `${this.connection.catalog}/plans/${this.resource.body.plan_id}`,
        withAuth()
      );
      const plan = await planResponse.json();
      this.plan = { ...plan };
      // console.log(plan.body.expanded_features.map((feature: Catalog.ExpandedFeature) => {

      // }));
    }
  }

  render() {
    if (!this.resource || !this.plan) return null;

    const { expanded_features = [] } = this.plan.body;
    const { features: customFeatures } = this.resource.body;

    return (
      <dl class="features">
        {expanded_features.map(feature => [
          <FeatureLabel feature={feature} />,
          <FeatureValue
            features={customFeatures || initialFeatures(expanded_features)}
            feature={feature}
            isExistingResource
            onChange={() => {}}
          />,
        ])}
      </dl>
    );
  }
}

Tunnel.injectProps(ManifoldResourceDetails, ['connection']);
