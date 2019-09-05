import { h, Component, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import ClipboardJS from 'clipboard';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';

interface ErrorDetail {
  error: string;
  resourceLabel?: string;
}

interface SuccessDetail {
  resourceLabel?: string;
}

@Component({ tag: 'manifold-copy-credentials' })
export class ManifoldCopyCredentials {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** The label of the resource to fetch credentials for */
  @Prop() resourceLabel?: string;
  @State() clipboard?: ClipboardJS;
  @State() credentials?: string;
  @State() loading: boolean = true;
  @Event({ eventName: 'manifold-copyCredentials-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-copyCredentials-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange() {
    this.refresh();
    this.attachClipboard();
  }

  componentWillLoad() {
    this.refresh();
  }

  componentDidLoad() {
    this.attachClipboard(); // attach clipboard only after render
  }

  private get id() {
    return `copy-creds-${this.resourceLabel}`;
  }

  private attachClipboard() {
    // clean up existing clipboard if there is one
    if (this.clipboard) {
      this.clipboard.destroy();
    }

    // re-initialize and re-bind events for clipboard
    this.clipboard = new ClipboardJS(`#${this.id}`); // use IDs for performance
    this.clipboard.on('error', e => {
      const detail: ErrorDetail = { error: 'Copy failed', resourceLabel: this.resourceLabel };
      this.error.emit({ detail });
      console.error(e);
    });
    this.clipboard.on('success', () => {
      const detail: SuccessDetail = { resourceLabel: this.resourceLabel };
      this.success.emit({ detail });
    });
  }

  async refresh() {
    if (!this.graphqlFetch) {
      return;
    }

    // disable clicks while loading
    this.loading = true;

    const { data, errors } = await this.graphqlFetch({
      query: gql`
        query RESOURCE_WITH_CREDENTIALS($resourceLabel: String!) {
          resource(label: $resourceLabel) {
            credentials(first: 100) {
              edges {
                node {
                  key
                  value
                }
              }
            }
          }
        }
      `,
      variables: { resourceLabel: this.resourceLabel },
    });

    // if errors, report them but keep going
    if (Array.isArray(errors)) {
      errors.forEach(error => {
        const detail: ErrorDetail = { resourceLabel: this.resourceLabel, error: error.message };
        this.error.emit(detail);
      });
    }

    // if creds, set it and continue
    if (data && data.resource && data.resource.credentials) {
      const credentials: string[] = data.resource.credentials.edges.reduce(
        (credList, { node }) => (node ? [...credList, `${node.key}=${node.value}`] : credList),
        []
      );
      this.credentials = credentials.join('\n');
    }

    // unset loading
    this.loading = false;
  }

  @logger()
  render() {
    const disabled = this.loading === true || !this.credentials || undefined;

    return (
      <button
        data-clipboard-text={this.credentials ? this.credentials : undefined}
        id={this.id}
        disabled={disabled}
      >
        <slot />
      </button>
    );
  }
}
