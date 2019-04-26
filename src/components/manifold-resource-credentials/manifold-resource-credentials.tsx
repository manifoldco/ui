import { Component, Prop, State, Element, Watch } from '@stencil/core';
import { eye, lock } from '@manifoldco/icons';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({
  tag: 'manifold-resource-credentials',
  styleUrl: 'manifold-resource-credentials.css',
  shadow: true,
})
export class ManifoldResourceCredentials {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Which resource does this belong to? */
  @Prop() resourceName: string;
  @State() credentials?: Marketplace.Credential[];
  @State() resource: Gateway.Resource;
  @Watch('resourceName') resourceChange(newName: string) {
    this.fetchResource(newName);
  }

  componentWillLoad() {
    this.fetchResource();
  }

  get lines() {
    // Returns # of lines for creds.
    if (!this.credentials) return 0;
    const linesPerResource = 3;
    return this.credentials.reduce(
      (lines, creds) => lines + linesPerResource + Object.keys(creds.body.values).length,
      0
    );
  }

  hideCredentials = () => {
    this.credentials = undefined;
  };

  fetchCredentials = () => {
    if (!this.resource) return;

    fetch(`${this.connection.marketplace}/credentials/?resource_id=${this.resource.id}`, withAuth())
      .then(response => response.json())
      .then((credentials: Marketplace.Credential[]) => {
        this.credentials = credentials;
      });
  };

  fetchResource = (resourceName: string = this.resourceName) => {
    fetch(`${this.connection.gateway}/resources/me/${resourceName}`, withAuth())
      .then(response => response.json())
      .then((resource: Gateway.Resource) => {
        this.resource = resource;
      });
  };

  render() {
    return [
      <menu class="secrets-menu" data-showing={!!this.credentials}>
        <manifold-link-button color="white" size="small" onClick={this.hideCredentials}>
          <manifold-icon marginRight icon={lock} />
          Hide credentials
        </manifold-link-button>
      </menu>,
      <div class="credential" data-showing={!!this.credentials}>
        <div class="screen-left" />
        <div class="screen-right" />

        {Array.isArray(this.credentials) && (
          <div class="secrets" style={{ '--cred-height': `${this.lines}` }}>
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
          <manifold-link-button color="black" onClick={this.fetchCredentials}>
            <manifold-icon marginRight icon={eye} /> Show credentials
          </manifold-link-button>
        </div>
      </div>,
    ];
  }
}
Tunnel.injectProps(ManifoldResourceCredentials, ['connection']);
