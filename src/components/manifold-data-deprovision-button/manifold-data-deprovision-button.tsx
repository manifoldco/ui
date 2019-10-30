import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import deleteMutation from './delete.graphql';
import { DeleteResourceMutation } from '../../types/graphql';

interface SuccessMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
}

interface ErrorMessage {
  message: string;
  resourceLabel: string;
  resourceId?: string;
}

const resourceIdQuery = gql`
  query RESOURCE_ID($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      id
    }
  }
`;

@Component({ tag: 'manifold-data-deprovision-button' })
export class ManifoldDataDeprovisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
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
    });

    const { data, errors } = await this.graphqlFetch<DeleteResourceMutation>({
      query: deleteMutation,
      variables: {
        resourceId: this.resourceId,
      },
      element: this.el,
    });

    if (data && data.deleteResource) {
      // success
      const success: SuccessMessage = {
        message: `${data.deleteResource.data.label} successfully deleted`,
        resourceLabel: data.deleteResource.data.label,
        resourceId: data.deleteResource.data.id,
      };
      this.success.emit(success);
    }

    if (errors) {
      errors.forEach(({ message }) => {
        const error: ErrorMessage = {
          message,
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

    const { data } = await this.graphqlFetch({
      query: resourceIdQuery,
      variables: {
        resourceLabel,
      },
      element: this.el,
    });

    if (data && data.resource) {
      this.resourceId = data.resource.id;
    }
  }

  @logger()
  render() {
    return (
      <button type="submit" onClick={() => this.deprovision()} disabled={!this.resourceId}>
        <slot />
      </button>
    );
  }
}
