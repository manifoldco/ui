import { h, Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import { eye, lock, loader } from '@manifoldco/icons';

import { Marketplace } from '../../types/marketplace';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-credentials-view',
  styleUrl: 'manifold-credentials-view.css',
  shadow: true,
})
export class ManifoldResourceCredentials {
  @Element() private el: HTMLElement;
  @Prop() credentials?: Marketplace.Credential[];
  @Prop() resourceLabel: string = '';
  @Prop() loading: boolean = false;
  @State() shouldTransition: boolean = false;
  @Event() credentialsRequested: EventEmitter;

  showButtonEl?: Element;
  hideButtonEl?: Element;

  componentWillLoad() {
    this.findNodes();
    this.addListeners();
  }

  componentDidLoad() {
    // hack to prevent “Hide credentials” from being visible on load in Firefox
    setTimeout(() => {
      this.shouldTransition = true;
    }, 250);
  }

  componentDidUpdate() {
    this.removeListeners();
    this.findNodes();
    this.addListeners();
  }

  componentDidUnload() {
    this.removeListeners();
  }

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

  findNodes() {
    this.el.childNodes.forEach(child => {
      if ((child as HTMLElement).slot === 'show-button') {
        this.showButtonEl =
          (child as HTMLElement).querySelector(':not(manifold-forward-slot)') || undefined;
      } else if ((child as HTMLElement).slot === 'hide-button') {
        this.hideButtonEl =
          (child as HTMLElement).querySelector(':not(manifold-forward-slot)') || undefined;
      }
    });
  }

  addListeners() {
    if (this.showButtonEl) {
      this.showButtonEl.addEventListener('click', this.requestCredentials);
    }
    if (this.hideButtonEl) {
      this.hideButtonEl.addEventListener('click', this.hideCredentials);
    }
  }

  removeListeners() {
    if (this.showButtonEl) {
      this.showButtonEl.removeEventListener('click', this.requestCredentials);
    }
    if (this.hideButtonEl) {
      this.hideButtonEl.removeEventListener('click', this.hideCredentials);
    }
  }

  hideCredentials = () => {
    this.credentials = undefined;
  };

  requestCredentials = () => {
    this.credentialsRequested.emit();
  };

  @logger()
  render() {
    const showButton = this.showButtonEl ? (
      <slot name="show-button" />
    ) : (
      <manifold-button color="black" stencilClickEvent={this.requestCredentials}>
        <manifold-icon marginRight icon={eye} /> Show credentials
      </manifold-button>
    );

    return [
      <menu
        class="secrets-menu"
        data-showing={!!this.credentials || undefined}
        data-transitions={this.shouldTransition || undefined}
      >
        {this.hideButtonEl ? (
          <slot name="hide-button" />
        ) : (
          <manifold-button color="white" size="small" stencilClickEvent={this.hideCredentials}>
            <manifold-icon marginRight icon={lock} />
            Hide credentials
          </manifold-button>
        )}
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
                  <span class="comment"># {this.resourceLabel}</span>,
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
            showButton
          )}
        </div>
      </div>,
    ];
  }
}
