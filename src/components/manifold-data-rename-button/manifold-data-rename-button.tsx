import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import connection from '../../state/connection';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

import resourceIdQuery from '../queries/resource-id.graphql';
import renameResourceMutation from './rename-resource.graphql';
import {
  ResourceIdQuery,
  ResourceIdQueryVariables,
  RenameResourceMutation,
  RenameResourceMutationVariables,
} from '../../types/graphql';

interface ClickMessage {
  newLabel?: string;
  resourceLabel: string;
  resourceId: string;
}

interface InvalidMessage {
  message: string;
  newLabel?: string;
  resourceLabel: string;
  resourceId: string;
}

interface SuccessMessage {
  message: string;
  newLabel?: string;
  resourceLabel: string;
  resourceId: string;
}

interface ErrorMessage {
  message: string;
  newLabel?: string;
  resourceLabel: string;
  resourceId?: string;
}

@Component({ tag: 'manifold-data-rename-button' })
export class ManifoldDataRenameButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** The label of the resource to rename */
  @Prop() resourceLabel?: string;
  /** The new label to give to the resource */
  @Prop() newLabel?: string;
  /** The id of the resource to rename, will be fetched if not set */
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @Prop() disabled?: boolean;
  @Event({ eventName: 'manifold-renameButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-success', bubbles: true }) success: EventEmitter;
  @Watch('resourceLabel') labelChange(newLabel: string) {
    this.fetchResourceId(newLabel);
  }

  @loadMark()
  componentWillLoad() {
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel);
    }
  }

  async rename() {
    const newLabel = this.newLabel; // eslint-disable-line prefer-destructuring
    if (!this.graphqlFetch || this.loading || !newLabel) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    const resourceDetails = {
      resourceLabel: this.resourceLabel || '',
      newLabel,
      resourceId: this.resourceId,
    };

    // invalid event
    if (newLabel.length < 3) {
      const message: InvalidMessage = {
        ...resourceDetails,
        message: 'Must be at least 3 characters',
      };
      this.invalid.emit(message);
      return;
    }
    if (!this.validate(newLabel)) {
      const message: InvalidMessage = {
        ...resourceDetails,
        message: 'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens',
      };
      this.invalid.emit(message);
      return;
    }

    // click event
    const clickMessage: ClickMessage = { ...resourceDetails };
    this.click.emit(clickMessage);

    // attempt rename
    const variables: RenameResourceMutationVariables = {
      resourceId: this.resourceId,
      newLabel,
    };
    const { data, errors } = await this.graphqlFetch<RenameResourceMutation>({
      query: renameResourceMutation,
      variables,
      element: this.el,
    });

    // error event
    if (errors) {
      this.reportErrors(errors);
    }

    if (data && data.updateResource) {
      this.newLabel = data.updateResource.data.label;
      resourceDetails.newLabel = this.newLabel;
    }

    // success event
    const successMessage: SuccessMessage = {
      ...resourceDetails,
      message: `${this.resourceLabel} renamed to ${this.newLabel}`,
    };

    this.success.emit(successMessage);
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const variables: ResourceIdQueryVariables = { resourceLabel };
    const { data, errors } = await this.graphqlFetch<ResourceIdQuery>({
      query: resourceIdQuery,
      variables,
      element: this.el,
    });

    if (errors) {
      this.reportErrors(errors);
    }

    if (data && data.resource) {
      this.resourceId = data.resource.id;
    }
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  reportErrors(errors: GraphqlError[]) {
    errors.forEach(({ message }) => {
      const detail: ErrorMessage = {
        message,
        newLabel: this.newLabel,
        resourceId: this.resourceId,
        resourceLabel: this.resourceLabel || '',
      };
      console.error(detail.message);
      this.error.emit(detail);
    });
  }

  @logger()
  render() {
    return (
      <button
        type="submit"
        onClick={() => this.rename()}
        disabled={(!this.resourceId && this.loading) || this.disabled}
      >
        <slot />
      </button>
    );
  }
}
