import { h, Component, Prop } from '@stencil/core';

@Component({ tag: 'manifold-text-toast' })
export class ManifoldTextToast {
  @Prop() dismissable?: boolean = false;
  /** Use custom icon path data (1024×1024) */
  @Prop() icon?: string;
  /** `success` | `warning` | `error` */
  @Prop() alertType?: 'success' | 'warning' | 'error' | undefined;
  @Prop() text: string;

  render() {
    return (
      <manifold-toast dismissable={this.dismissable} icon={this.icon} alertType={this.alertType}>
        {this.text}
      </manifold-toast>
    );
  }
}
