import { Component, Prop, State, Event, Element, EventEmitter } from '@stencil/core';
import { Option } from 'types/Select';

import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-region-selector' })
export class ManifoldRegionSelector {
  @Element() el: HTMLElement;
  @Prop() allowedRegions: string[] = [];
  @Prop() ariaLabel: string;
  @Prop() connection: Connection = connections.prod;
  @Prop() name: string;
  @State() globalRegion: Catalog.Region = globalRegion;
  @State() regions?: Catalog.Region[];
  @Event() change: EventEmitter;

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/regions`, withAuth())
      .then(response => response.json())
      .then((regions: Catalog.Region[]) => {
        this.regions = regions;
        // Set global region (the one in src/data is just a fallback; we should always grab live)
        const global = this.regions.find(({ body: { location } }) => location === 'global');
        if (global) this.globalRegion = global;
      });
  }

  handleChange = ({ detail }: CustomEvent) => {
    this.change.emit({ ...detail });
  };

  filterRegions(regions: Catalog.Region[]): Catalog.Region[] {
    const regionMap: { [index: string]: Catalog.Region } = regions.reduce(
      (map, region) => ({
        ...map,
        [region.id]: region,
      }),
      {}
    );
    const filtered = this.allowedRegions.map(id => regionMap[id]);
    return filtered.length > 1 ? filtered : [this.globalRegion];
  }

  regionOptions(regions: Catalog.Region[]): Option[] {
    return regions.map(({ id, body: { name } }) => ({
      label: name,
      value: id,
    }));
  }

  render() {
    const regions = this.filterRegions(this.regions || []);

    return regions.length > 1 ? (
      <manifold-select
        aria-label={this.ariaLabel}
        name={this.name}
        onUpdateValue={this.handleChange}
        defaultValue={this.allowedRegions[0]}
        options={this.regionOptions(regions)}
      />
    ) : (
      <div class="region-name">{this.globalRegion.body.name}</div>
    );
  }
}

Tunnel.injectProps(ManifoldRegionSelector, ['connection']);
