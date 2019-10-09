import { h, Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

interface ClickMessage {
  planId?: string;
  resourceId: string;
  resourceLabel: string;
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
}

const resourceIdQuery = gql`
  query RESOURCE_ID($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      id
    }
  }
`;

const resourcePlanMutation = gql`
  mutation RESOURCE_CHANGE_PLAN($resourceId: String!, $planId: ID!) {
    updateResourcePlan(input: { resourceId: $resourceId, newPlanID: $planId }) {
      data {
        id
        label
      }
    }
  }
`;

@Component({ tag: 'manifold-data-resize-button' })
export class ManifoldDataResizeButton {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() planId?: string;
  @Prop() resourceLabel?: string;
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

    const { data } = await this.graphqlFetch({
      query: resourceIdQuery,
      variables: {
        resourceLabel,
      },
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
    };
    this.click.emit(clickDetail);

    const { data, errors } = await this.graphqlFetch({
      query: resourcePlanMutation,
      variables: {
        resourceId: this.resourceId,
        planId: this.planId,
      },
    });

    if (data && data.data) {
      // success event
      const success: SuccessMessage = {
        message: `${data.data.label} successfully updated to ${this.planId}`,
        planId: this.planId,
        resourceId: this.resourceId,
        resourceLabel: data.data.label,
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
