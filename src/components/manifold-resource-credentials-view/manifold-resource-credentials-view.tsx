import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';
import { eye, lock, loader } from '@manifoldco/icons';

import { ResourceState } from '../../data/resource';

@Component({
  tag: 'manifold-resource-credentials-view',
  styleUrl: 'manifold-resource-credentials.css',
  shadow: true,
})
export class ManifoldResourceCredentials {
  @Prop() credentials?: Marketplace.Credential[];
  @Prop() resourceState: ResourceState;
  @Event() credentialsRequested: EventEmitter;

  get lines() {
    // Returns # of lines for creds.
    if (!this.credentials) return 0;
    const linesPerResource = 3;
    return this.credentials.reduce(
      (lines, creds) => lines + linesPerResource + Object.keys(creds.body.values).length,
      0
    );
  }

  get label() {
    return this.resourceState.resource && this.resourceState.resource.label;
  }

  hideCredentials = () => {
    this.credentials = undefined;
  };

  requestCredentials = () => {
    this.credentialsRequested.emit(this.resourceState.resource);
  };

  render() {
    return [
      <menu class="secrets-menu" data-showing={!!this.credentials}>
        <manifold-button color="white" size="small" onClickEvent={this.hideCredentials}>
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
                  <span class="comment"># {this.label}</span>,
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
          {this.resourceState.loading ? (
            <manifold-button color="black" disabled>
              <span class="spin">
                <manifold-icon icon={loader} />
              </span>
            </manifold-button>
          ) : (
            <manifold-button color="black" onClick={this.requestCredentials}>
              <manifold-icon marginRight icon={eye} /> Show credentials
            </manifold-button>
          )}
        </div>
      </div>,
    ];
  }
}
