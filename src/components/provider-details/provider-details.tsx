import { Component } from '@stencil/core';

@Component({
  tag: 'provider-details',
  styleUrl: 'provider-details.css',
  shadow: true,
})
export class ProviderDetails {
  render() {
    return <div class="wrapper">Provider Details</div>;
  }
}
