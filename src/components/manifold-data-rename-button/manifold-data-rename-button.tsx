import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';

/* eslint-disable no-console */

interface ClickMessage {
  newLabel: string;
  resourceLabel: string;
  resourceId: string;
}

interface InvalidMessage {
  message: string;
  newLabel: string;
  resourceLabel: string;
  resourceId: string;
}

interface SuccessMessage {
  message: string;
  newLabel: string;
  resourceLabel: string;
  resourceId: string;
}

interface ErrorMessage {
  message: string;
  newLabel: string;
  resourceLabel: string;
  resourceId: string;
}

@Component({ tag: 'manifold-data-rename-button' })
export class ManifoldDataRenameButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** The label of the resource to rename */
  @Prop() resourceLabel?: string;
  /** The new label to give to the resource */
  @Prop() newLabel: string = '';
  /** The id of the resource to rename, will be fetched if not set */
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-renameButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange(newLabel: string) {
    if (!this.resourceId) {
      this.fetchResourceId(newLabel);
    }
  }

  componentWillLoad() {
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel);
    }
  }

  async rename() {
    if (!this.restFetch || this.loading) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    if (this.newLabel.length < 3) {
      const message: InvalidMessage = {
        message: 'Must be at least 3 characters.',
        resourceLabel: this.resourceLabel || '',
        newLabel: this.newLabel,
        resourceId: this.resourceId,
      };
      this.invalid.emit(message);
      return;
    }
    if (!this.validate(this.newLabel)) {
      const message: InvalidMessage = {
        message:
          'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.',
        resourceLabel: this.resourceLabel || '',
        newLabel: this.newLabel,
        resourceId: this.resourceId,
      };
      this.invalid.emit(message);
      return;
    }

    const clickMessage: ClickMessage = {
      resourceLabel: this.resourceLabel || '',
      newLabel: this.newLabel,
      resourceId: this.resourceId,
    };
    this.click.emit(clickMessage);

    const body: Marketplace.PublicUpdateResource = {
      body: {
        name: this.newLabel,
        label: this.newLabel,
      },
    };

    const response = await this.restFetch({
      service: 'marketplace',
      endpoint: `/resources/${this.resourceId}`,
      body,
      options: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      },
    });

    if (response instanceof Error) {
      const error: ErrorMessage = {
        message: response.message,
        resourceLabel: this.resourceLabel || '',
        newLabel: this.newLabel,
        resourceId: this.resourceId,
      };
      this.error.emit(error);
      return;
    }

    const success: SuccessMessage = {
      message: `${this.resourceLabel} successfully renamed`,
      resourceLabel: this.resourceLabel || '',
      newLabel: this.newLabel,
      resourceId: this.resourceId,
    };
    this.success.emit(success);
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me&label=${resourceLabel}`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }
    const resources: Marketplace.Resource[] = response;

    if (!Array.isArray(resources) || !resources.length) {
      console.error(`${resourceLabel} product not found`);
      return;
    }

    this.resourceId = resources[0].id;
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  render() {
    return (
      <button
        type="submit"
        onClick={() => this.rename()}
        disabled={!this.resourceId && !this.loading}
      >
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataRenameButton, ['restFetch']);
