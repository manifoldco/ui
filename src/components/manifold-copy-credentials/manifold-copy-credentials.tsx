import { h, Component, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';

interface ClickDetail {
  resourceLabel?: string;
}

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
  @State() credentials?: string;
  @State() loading: boolean = true;
  @Event({ eventName: 'manifold-copyCredentials-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-copyCredentials-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-copyCredentials-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange() {
    this.refresh();
  }

  componentWillLoad() {
    if (!this.resourceLabel) {
      const detail: ErrorDetail = {
        resourceLabel: this.resourceLabel,
        error: 'Attribute `resource-label` is missing',
      };
      this.error.emit({ detail });
      return;
    }

    this.refresh();
  }

  async refresh() {
    if (!this.graphqlFetch) {
      return;
    }

    this.loading = true;

    const { data, errors } = await this.graphqlFetch({
      query: gql`
        query RESOURCE_WITH_CREDENTIALS($resourceLabel: String!) {
          resource(label: $resourceLabel) {
            credentials {
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

      this.credentials = data.resource.credentials.edges.reduce(
        (display, { node }) => (node ? `${display}\n${node.key}=${node.value}` : display),
        ''
      );
    }

    this.loading = false;
  }

  // in order to work in Firefox and Safari, this *must* be a sync action (i.e. creds must already be fetched)
  sendToClipboard = (): void => {
    if (!this.credentials) {
      const detail: ErrorDetail = {
        error: 'Credentials still loading',
        resourceLabel: this.resourceLabel,
      };
      this.error.emit({ detail });
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.innerHTML = this.credentials;

    this.el.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    this.el.removeChild(textArea);

    const detail: ClickDetail = { resourceLabel: this.resourceLabel };
    this.click.emit({ detail });
  };

  @logger()
  render() {
    return (
      <button onClick={this.sendToClipboard} disabled={this.loading || !this.credentials}>
        <slot />
      </button>
    );
  }
}
