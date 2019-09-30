import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import connection from '../../state/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

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
  resourceId?: string;
}

@Component({ tag: 'manifold-data-rename-button' })
export class ManifoldDataRenameButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;
  /** The label of the resource to rename */
  @Prop() resourceLabel?: string;
  /** The new label to give to the resource */
  @Prop() newLabel: string = '';
  /** The id of the resource to rename, will be fetched if not set */
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @Prop() disabled?: boolean;
  @Event({ eventName: 'manifold-renameButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange(newLabel: string) {
    if (!this.resourceId) {
      this.fetchResourceId(newLabel);
    }
  }

  @loadMark()
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

    const resourceDetails = {
      resourceLabel: this.resourceLabel || '',
      newLabel: this.newLabel,
      resourceId: this.resourceId,
    };

    if (this.newLabel.length < 3) {
      const message: InvalidMessage = {
        ...resourceDetails,
        message: 'Must be at least 3 characters',
      };
      this.invalid.emit(message);
      return;
    }
    if (!this.validate(this.newLabel)) {
      const message: InvalidMessage = {
        ...resourceDetails,
        message: 'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens',
      };
      this.invalid.emit(message);
      return;
    }

    // fire click event
    const clickMessage: ClickMessage = { ...resourceDetails };
    this.click.emit(clickMessage);

    const body: Marketplace.PublicUpdateResource = {
      body: { name: this.newLabel, label: this.newLabel },
    };

    // rename
    const renamedResource = await this.restFetch<Marketplace.Resource>({
      service: 'marketplace',
      endpoint: `/resources/${this.resourceId}`,
      body,
      options: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      },
    }).catch(e => {
      const errorMessage: ErrorMessage = {
        ...resourceDetails,
        message: e.message,
      };
      this.error.emit(errorMessage);
      return Promise.reject(errorMessage);
    });
    if (renamedResource) {
      this.newLabel = renamedResource.body.label;
      resourceDetails.newLabel = this.newLabel;
    }

    // Poll until rename complete
    await this.pollRename();

    const successMessage: SuccessMessage = {
      ...resourceDetails,
      message: `${this.resourceLabel} renamed to ${this.newLabel}`,
    };

    this.success.emit(successMessage);
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me&label=${resourceLabel}`,
    });

    if (!Array.isArray(response) || !response.length) {
      console.error(`${resourceLabel} product not found`);
      return;
    }

    this.resourceId = response[0].id;
  }

  async pollRename() {
    const pollInterval = 300;

    return new Promise((resolve, reject) => {
      if (this.restFetch) {
        const start = performance.now();
        return this.restFetch<Marketplace.Resource[]>({
          service: 'marketplace',
          endpoint: `/resources/?me&label=${this.newLabel}`,
        }).then(renamedResource => {
          if (Array.isArray(renamedResource) && renamedResource.length) {
            resolve();
          } else {
            // wait till interval has passed at least to continue
            const diff = Math.round(performance.now() - start - pollInterval);
            setTimeout(() => this.pollRename(), Math.max(diff, 0));
          }
        });
      }
      return reject();
    });
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  @logger()
  render() {
    return (
      <button
        type="submit"
        onClick={() => this.rename()}
        disabled={(!this.resourceId && !this.loading) || this.disabled}
      >
        <slot />
      </button>
    );
  }
}
