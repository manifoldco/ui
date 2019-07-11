import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';
import { eye, lock, loader } from '@manifoldco/icons';

import { Marketplace } from '../../types/marketplace';

@Component({
  tag: 'manifold-resource-credentials-view',
  styleUrl: 'manifold-credentials-view.css',
  shadow: true,
})
export class ManifoldResourceCredentials {
  @Prop() credentials?: Marketplace.Credential[];
  @Prop() resourceName: string = '';
  @Prop() loading: boolean = false;
  @Event() credentialsRequested: EventEmitter;

  get lines() {
    // Returns # of lines for creds.
    if (!this.credentials) {
      return 0;
    }
    const linesPerResource = 3;
    return this.credentials.reduce(
      (lines, creds) => lines + linesPerResource + Object.keys(creds.body.values).length,
      0
    );
  }

  hideCredentials = () => {
    this.credentials = undefined;
  };

  requestCredentials = () => {
    this.credentialsRequested.emit();
  };

  render() {
    return [
      <menu class="secrets-menu" data-showing={!!this.credentials}>
        <manifold-button color="white" size="small" stencilClickEvent={this.hideCredentials}>
          <manifold-icon marginRight icon={lock} />
          Hide credentials
        </manifold-button>
      </menu>,
      <div
        class="credential"
        data-showing={!!this.credentials}
        style={{ height: `${this.lines * 1.75}em` }}
      >
        <div class="screen-left" />
        <div class="screen-right" />

        {Array.isArray(this.credentials) && (
          <div class="secrets">
            <pre class="env">
              <code>
                {this.credentials.map(({ body }) => [
                  <span class="comment"># {this.resourceName}</span>,
                  '\n\n',
                  Object.entries(body.values).map(([key, value]) => [
                    <span class="env-key">{key}</span>,
                    '=',
                    <span class="env-value">{value}</span>,
                    '\n',
                  ]),
                ])}
              </code>
            </pre>
          </div>
        )}
        <div class="hidden">
          {this.loading ? (
            <manifold-button color="black" disabled>
              <span class="spin">
                <manifold-icon icon={loader} />
              </span>
            </manifold-button>
          ) : (
            <manifold-button color="black" stencilClickEvent={this.requestCredentials}>
              <manifold-icon marginRight icon={eye} /> Show credentials
            </manifold-button>
          )}
        </div>
      </div>,
    ];
  }
}
