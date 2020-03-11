import { h, Component, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';

import updatePlan from './updatePlan.graphql';
import resourceIdQuery from '../queries/resource-id.graphql';
import {
  ResourceChangePlanMutation,
  ResourceIdQuery,
  ResourceIdQueryVariables,
  ConfiguredFeatureInput,
  ResourceChangePlanMutationVariables,
} from '../../types/graphql';

interface ClickMessage {
  planId?: string;
  resourceId: string;
  resourceLabel: string;
  configuredFeatures?: ConfiguredFeatureInput[];
}

interface SuccessMessage {
  message: string;
  planId?: string;
  resourceId?: string;
  resourceLabel?: string;
}

interface ErrorMessage {
  message: string;
  resourceId?: string;
  resourceLabel?: string;
  planId?: string;
  configuredFeatures?: ConfiguredFeatureInput[];
}

@Component({ tag: 'manifold-data-resize-button' })
export class ManifoldDataResizeButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() planId?: string;
  @Prop() resourceLabel?: string;
  @Prop() configuredFeatures?: ConfiguredFeatureInput[];
  @Prop({ mutable: true }) resourceId?: string;
  @Event({ eventName: 'manifold-resizeButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-resizeButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-resizeButton-success', bubbles: true }) success: EventEmitter;
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResourceId(newResource);
  }

  @loadMark()
  componentWillLoad() {
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel);
    }
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const variables: ResourceIdQueryVariables = { resourceLabel, owner: this.ownerId };
    const { data } = await this.graphqlFetch<ResourceIdQuery>({
      query: resourceIdQuery,
      variables,
      element: this.el,
    });

    if (data && data.resource) {
      this.resourceId = data.resource.id;
    }
  }

  async update() {
    if (!this.graphqlFetch || !this.resourceLabel || !this.resourceId || !this.planId) {
      return;
    }

    // click event
    const clickDetail: ClickMessage = {
      planId: this.planId,
      resourceLabel: this.resourceLabel,
      resourceId: this.resourceId,
      configuredFeatures: this.configuredFeatures,
    };
    this.click.emit(clickDetail);

    // Note(drew): because we submit resourceId here, we DO NOT need owner
    const variables: ResourceChangePlanMutationVariables = {
      resourceId: this.resourceId,
      planId: this.planId,
      configuredFeatures: this.configuredFeatures,
    };
    const { data, errors } = await this.graphqlFetch<ResourceChangePlanMutation>({
      query: updatePlan,
      variables,
      element: this.el,
    });

    if (data && data.updateResourcePlan) {
      // success event
      const success: SuccessMessage = {
        message: `${data.updateResourcePlan.data.label} successfully updated to ${this.planId}`,
        planId: this.planId,
        resourceId: this.resourceId,
        resourceLabel: data.updateResourcePlan.data.label,
      };
      this.success.emit(success);
    }

    if (errors) {
      // error event
      errors.forEach(({ message }) => {
        const error: ErrorMessage = {
          message,
          planId: this.planId,
          resourceId: this.resourceId,
          resourceLabel: this.resourceLabel,
          configuredFeatures: this.configuredFeatures,
        };
        this.error.emit(error);
      });
    }
  }

  @logger()
  render() {
    return (
      <button
        type="button"
        disabled={!this.resourceLabel || !this.resourceId || !this.planId}
        onClick={() => this.update()}
      >
        <slot />
      </button>
    );
  }
}
