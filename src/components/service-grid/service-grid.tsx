import { Component, Prop } from '@stencil/core';
import { Service } from 'types/Service';

@Component({
  tag: 'service-grid',
  styleUrl: 'service-grid.css',
  shadow: true,
})
export class ManifoldMarketplace {
  @Prop() themeColor: { [index: string]: string };
  @Prop() services: Service[];

  render() {
    return (
      <div class="wrapper" style={this.themeColor}>
        {this.services.map(({ body: { name, tagline, logo_url } }) => (
          <service-card name={name} description={tagline} logo={logo_url} />
        ))}
      </div>
    );
  }
}
