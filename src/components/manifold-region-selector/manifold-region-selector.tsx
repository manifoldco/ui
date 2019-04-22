import { Component, Prop, State, Element } from '@stencil/core';
import { Option } from 'types/Select';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

const globalRegion: Catalog.Region = {
  id: '235n4f9pxf8eyraj3y159x89z6jer',
  type: 'region',
  version: 1,
  body: {
    location: 'global',
    name: 'All Regions',
    platform: 'all',
    priority: 100,
  },
};

@Component({
  tag: 'manifold-region-selector',
})
export class ManifoldRegionSelector {
  @Element() el: HTMLElement;
  @Prop() allowedRegions: string[] = [];
  @Prop() ariaLabel: string;
  @Prop() connection: Connection = connections.prod;
  @Prop() name: string;
  @State() globalRegion: Catalog.Region = globalRegion;
  @State() regions?: Catalog.Region[];

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/regions`, withAuth())
      .then(response => response.json())
      .then((regions: Catalog.Region[]) => {
        this.regions = [...regions].sort((a, b) => a.body.name.localeCompare(b.body.name));

        // Set global region
        const global = this.regions.find(({ body: { location } }) => location === 'global');
        if (global) this.globalRegion = global;
      });
  }

  get filteredRegions(): Catalog.Region[] {
    if (!this.regions) return [];
    const regions = this.regions.filter(({ id }) => this.allowedRegions.includes(id));
    return regions || [this.globalRegion];
  }

  get regionOptions(): Option[] {
    return this.filteredRegions.map(({ body: { location, name } }) => ({
      label: name,
      value: location,
    }));
  }

  render() {
    return this.filteredRegions.length > 1 ? (
      <manifold-select
        aria-label={this.ariaLabel}
        name={this.ariaLabel}
        options={this.regionOptions}
        defaultValue={this.filteredRegions[0].body.location}
      />
    ) : (
      <div class="region-name">{this.globalRegion.body.name}</div>
    );
  }
}

Tunnel.injectProps(ManifoldRegionSelector, ['connection']);
