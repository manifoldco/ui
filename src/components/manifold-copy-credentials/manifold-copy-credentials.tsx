import { h, Component, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import ClipboardJS from 'clipboard';

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
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch;
  /** The label of the resource to fetch credentials for */
  @Prop() resourceLabel?: string;
  @State() clipboard?: ClipboardJS;
  @State() credentials?: string;
  @State() loading: boolean = true;
  @Event({ eventName: 'manifold-copyCredentials-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-copyCredentials-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-copyCredentials-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange() {
    this.refresh();
  }

  componentWillLoad() {
    this.refresh();
  }

  get id() {
    return `clipboard-${this.resourceLabel}`;
  }

  async refresh() {
    if (!this.graphqlFetch) {
      return;
    }

    // clean up listeners
    if (this.clipboard) {
      this.clipboard.destroy();
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
    if (errors) {
      errors.forEach(error => {
        const detail: ErrorDetail = { resourceLabel: this.resourceLabel, error: error.message };
        this.error.emit(detail);
      });
    }

    // if creds, set it and continue to unset loading
    if (data && data.resource && data.resource.credentials) {
      // DO NOT emit creds in a success message here
      const detail: SuccessDetail = { resourceLabel: this.resourceLabel };
      this.success.emit({ detail });

      const credentials: string[] = data.resource.credentials.edges.reduce(
        (credList, { node }) => (node ? [...credList, `\n${node.key}=${node.value}`] : credList),
        []
      );
      this.credentials = credentials.join('\n');
    }

    // re-initialize clipboard
    this.clipboard = new ClipboardJS(`#${this.id}`); // eslint-disable-line no-new

    this.loading = false;
  }

  @logger()
  render() {
    return (
      <button
        data-clipboard-text={this.credentials ? this.credentials : undefined}
        id={this.id}
        disabled={this.loading || !this.credentials}
      >
        <slot />
      </button>
    );
  }
}
