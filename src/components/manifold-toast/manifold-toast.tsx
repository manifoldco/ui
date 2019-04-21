import { Component, Element, Prop, State } from '@stencil/core';
import { alert_triangle, check_circle, bell, slash, x } from '@manifoldco/icons';
import observeRect, { Observer } from '@reach/observe-rect';

const READY = 'READY';
const DISMISSED = 'DISMISSED';

@Component({
  tag: 'manifold-toast',
  styleUrl: 'manifold-toast.css',
  shadow: true,
})
export class ManifoldToast {
  @Element() el: HTMLElement;
  /** Is this dismissable? */
  @Prop() dismissable?: boolean = false;
  /** Use custom icon path data (1024×1024) */
  @Prop() icon?: string;
  /** `success` | `warning` | `error` */
  @Prop() alertType?: 'success' | 'warning' | 'error' | undefined;
  @State() status: string = READY;
  @State() lastHeight: string = '42px';
  @State() observer: Observer | undefined = undefined;

  componentDidLoad() {
    // Listen to the element’s height, and save it for animating (dismissable only)
    if (!this.dismissable) return;
    const el = this.el.shadowRoot || this.el; // Dumb fallback for polyfills
    const alert = el.querySelector('[role="alert"]');
    if (!alert) return;
    const observer = observeRect(alert, rect => this.handleResize(rect));
    observer.observe();
    this.observer = observer;
  }

  componentDidUnload() {
    // Handle breakdown
    if (this.observer) this.observer.unobserve();
  }

  handleDismiss() {
    this.status = DISMISSED;
    if (this.observer) this.observer.unobserve();
  }

  handleResize({ height }: ClientRect) {
    // Handle element resizes performantly using RAF
    if (this.status === DISMISSED) return;
    const px = `${height}px`;
    if (this.lastHeight !== px) this.lastHeight = px;
  }

  hostData() {
    // Set CSS variable on host, accessible to the entire stylesheet
    if (!this.dismissable) return {};
    return {
      style: { '--height': this.lastHeight },
    };
  }

  get alertTypeIcon() {
    switch (this.alertType) {
      case 'success':
        return check_circle;
      case 'warning':
        return alert_triangle;
      case 'error':
        return slash;
      default:
        return bell;
    }
  }

  render() {
    return (
      <p
        role="alert"
        class="toast"
        data-alert-type={this.alertType}
        data-dismissed={this.status === DISMISSED}
      >
        <div class="grid" data-dismissable={this.dismissable}>
          {this.dismissable && (
            <button class="close" type="button" onClick={() => this.handleDismiss()}>
              <manifold-icon icon={x} />
            </button>
          )}
          <manifold-icon icon={this.icon || this.alertTypeIcon} />
          <slot />
        </div>
      </p>
    );
  }
}
