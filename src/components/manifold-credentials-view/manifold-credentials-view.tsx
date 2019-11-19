import { h, Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import { eye, lock, loader } from '@manifoldco/icons';

import { ResourceCredentialsQuery } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-credentials-view',
  styleUrl: 'manifold-credentials-view.css',
  shadow: true,
})
export class ManifoldCredentialsView {
  @Element() private el: HTMLElement;
  @Prop() credentials?: ResourceCredentialsQuery['resource']['credentials']['edges'];
  @Prop() loading?: boolean = false;
  @State() shouldTransition: boolean = false;
  @Event() credentialsRequested: EventEmitter;

  showButtonEl?: Element;
  hideButtonEl?: Element;

  @loadMark()
  componentWillLoad() {
    this.findNodes();
    this.addListeners();
  }

  componentDidLoad() {
    // hide the first transition for 250ms (long enough to transition in)
    setTimeout(() => {
      this.shouldTransition = true;
    }, 250);
  }

  componentDidUpdate() {
    this.removeListeners();
    this.findNodes();
    this.addListeners();
  }

  componentWillUnload() {
    this.removeListeners();
  }

  findNodes() {
    this.el.childNodes.forEach((child: HTMLElement) => {
      if (child.getAttribute('slot') === 'show-button') {
        this.showButtonEl = child.querySelector('*:not(manifold-forward-slot)') || undefined;
      } else if (child.getAttribute('slot') === 'hide-button') {
        this.hideButtonEl = child.querySelector('*:not(manifold-forward-slot)') || undefined;
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
        style={{ height: this.credentials ? `${this.credentials.length * 1.75}em` : undefined }}
      >
        <div class="screen-left" />
        <div class="screen-right" />

        {Array.isArray(this.credentials) && (
          <div class="secrets">
            <pre class="env">
              <code>
                {this.credentials.map(({ node }) =>
                  node
                    ? [
                        <span class="env-key">{node.key}</span>,
                        '=',
                        <span class="env-value">{node.value}</span>,
                        '\n',
                      ]
                    : null
                )}
              </code>
            </pre>
          </div>
        )}
        <div class="hidden">
          {this.loading ? (
            <manifold-button color="black" disabled data-testid="spinner">
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
