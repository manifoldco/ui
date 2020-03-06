import {
  h,
  Element,
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Method,
  Watch,
} from '@stencil/core';
import * as clipboard from 'clipboard-polyfill';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';
import query from './credentials.graphql';
import {
  ResourceWithCredentialsQuery,
  ResourceWithCredentialsQueryVariables,
} from '../../types/graphql';

interface ErrorDetail {
  message: string;
  resourceLabel?: string;
}

interface SuccessDetail {
  resourceLabel?: string;
}

@Component({ tag: 'manifold-copy-credentials' })
export class ManifoldCopyCredentials {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** The label of the resource to fetch credentials for */
  @Prop() resourceLabel?: string;
  @Prop() ownerId?: string;
  @State() credentials?: string;
  @Event({ eventName: 'manifold-copyCredentials-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-copyCredentials-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange() {
    this.refresh();
  }

  @loadMark()
  componentWillLoad() {
    this.refresh();
  }

  componentDidLoad() {
    // important: this must be bound using a “vanilla” click listener to work cross-browser, for security reasons
    const button = this.el.querySelector('button');
    if (button) {
      button.addEventListener('click', () => this.handleClick());
    } else {
      console.error('<manifold-copy-credentials>: couldn’t attach clipboard listener');
    }
  }

  @Method()
  async refresh() {
    if (!this.graphqlFetch || !this.resourceLabel) {
      return;
    }

    // disable button while loading
    this.credentials = undefined;

    const variables: ResourceWithCredentialsQueryVariables = {
      resourceLabel: this.resourceLabel,
      owner: this.ownerId,
    };
    const { data, errors } = await this.graphqlFetch<ResourceWithCredentialsQuery>({
      query,
      variables,
      element: this.el,
    });

    // if errors, report them but keep going
    if (Array.isArray(errors)) {
      errors.forEach(({ message }) => {
        const detail: ErrorDetail = { resourceLabel: this.resourceLabel, message };
        this.error.emit(detail);
      });
    }

    // if creds, set it and continue
    if (data && data.resource && data.resource.credentials) {
      const credentials: string[] = data.resource.credentials.edges.map(({ node }) =>
        node ? `${node.key}=${node.value}` : ''
      );
      this.credentials = credentials.join('\n');
    }
  }

  private handleClick() {
    if (this.credentials) {
      clipboard
        .writeText(this.credentials)
        .then(() => {
          const detail: SuccessDetail = { resourceLabel: this.resourceLabel };
          this.success.emit(detail);
        })
        .catch(() => {
          const message = 'couldn’t access clipboard';
          const detail: ErrorDetail = { message, resourceLabel: this.resourceLabel };
          this.error.emit(detail);
          console.error(message);
        });
    }
  }

  @logger()
  render() {
    return (
      <button disabled={!this.credentials || undefined}>
        <slot />
      </button>
    );
  }
}
