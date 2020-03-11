import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';

import {
  DeleteResourceMutation,
  ResourceIdQuery,
  ResourceIdQueryVariables,
  DeleteResourceMutationVariables,
} from '../../types/graphql';

import resourceIdQuery from '../queries/resource-id.graphql';
import deleteMutation from './delete.graphql';

interface SuccessMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
  ownerId?: string;
}

interface ErrorMessage {
  message: string;
  ownerId?: string;
  resourceId?: string;
  resourceLabel: string;
}

@Component({ tag: 'manifold-data-deprovision-button' })
export class ManifoldDataDeprovisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() disabled?: boolean;
  @Prop() ownerId?: string;
  /** resource ID */
  @Prop({ mutable: true }) resourceId?: string = '';
  /** The label of the resource to deprovision */
  @Prop() resourceLabel?: string;
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-deprovisionButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange(newLabel: string) {
    // fetch new ID regardless on label change
    this.fetchResourceId(newLabel);
  }

  @loadMark()
  componentWillLoad() {
    // fetch resource ID
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel);
    }
  }

  async deprovision() {
    if (!this.graphqlFetch || this.loading) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    this.click.emit({
      resourceId: this.resourceId,
      resourceLabel: this.resourceLabel || '',
      ownerId: this.ownerId,
    });

    // Note(drew): because we send resourceId here, we DO NOT need owner
    const variables: DeleteResourceMutationVariables = { resourceId: this.resourceId };
    const { data, errors } = await this.graphqlFetch<DeleteResourceMutation>({
      query: deleteMutation,
      variables,
      element: this.el,
    });

    if (data && data.deleteResource) {
      // success
      const success: SuccessMessage = {
        message: `${data.deleteResource.data.label} successfully deleted`,
        ownerId: this.ownerId,
        resourceId: data.deleteResource.data.id,
        resourceLabel: data.deleteResource.data.label,
      };
      this.success.emit(success);
    }

    if (errors) {
      errors.forEach(({ message }) => {
        const error: ErrorMessage = {
          message,
          ownerId: this.ownerId,
          resourceLabel: this.resourceLabel || '',
          resourceId: this.resourceId,
        };
        this.error.emit(error);
      });
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

  @logger()
  render() {
    return (
      <button
        type="submit"
        onClick={() => this.deprovision()}
        disabled={this.disabled || !this.resourceId}
      >
        <slot />
      </button>
    );
  }
}
