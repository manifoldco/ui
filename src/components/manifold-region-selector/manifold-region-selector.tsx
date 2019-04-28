import { Component, Prop, State, Event, Element, EventEmitter, Watch } from '@stencil/core';
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
  @Prop() preferredRegions?: string[];
  @Prop() value?: string;
  @State() globalRegion: Catalog.Region = globalRegion;
  @State() regions?: Catalog.Region[];
  @Event() change: EventEmitter;
  @Watch('allowedRegions') regionChange() {
    // Trigger update if allowed regions changes
    if (this.regions) this.regions = this.sortRegions(this.regions, this.preferredRegions);
  }

  async componentWillLoad() {
    const response = await fetch(`${this.connection.catalog}/regions`, withAuth());
    const regions: Catalog.Region[] = await response.json();
    // Sorting is important, otherwise the region selector is in a different order every plan
    this.regions = this.sortRegions(regions, this.preferredRegions);
    // Set global region (the one in src/data is just a fallback; we should always grab live)
    const global = this.regions.find(({ body: { location } }) => location === 'global');
    if (global) this.globalRegion = global;
  }

  handleChange = ({ detail }: CustomEvent) => {
    this.change.emit({ ...detail });
  };

  filterRegions(regions: Catalog.Region[]): Catalog.Region[] {
    if (!this.regions) return [this.globalRegion];
    const filtered = regions.filter(({ id }) => this.allowedRegions.includes(id));
    return filtered.length > 1 ? filtered : [this.globalRegion];
  }

  regionOptions(regions: Catalog.Region[]): Option[] {
    return regions.map(({ id, body: { name } }) => ({
      label: name,
      value: id,
    }));
  }

  sortRegions(regions: Catalog.Region[], preferredRegions?: string[]): Catalog.Region[] {
    return [...regions].sort((a, b) => {
      // If user specified preferred regions first
      const regionA = this.regionCode(a);
      const regionB = this.regionCode(b);
      if (
        Array.isArray(preferredRegions) &&
        (preferredRegions.includes(regionA) || preferredRegions.includes(regionB))
      ) {
        // Get preferred region index and compare; otherwise move to end
        let indexA = preferredRegions.indexOf(regionA);
        if (indexA === -1) indexA = preferredRegions.length;
        let indexB = preferredRegions.indexOf(regionB);
        if (indexB === -1) indexB = preferredRegions.length;
        return indexA - indexB;
      }
      // For all unspecified regions, sort alphabetically
      return a.body.name.localeCompare(b.body.name);
    });
  }

  regionCode({ body: { location, platform } }: Catalog.Region) {
    return `${platform.replace('digital-ocean', 'do')}-${location}`;
  }

  render() {
    const regions = this.filterRegions(this.regions || []);

    return regions.length > 1 ? (
      <manifold-select
        aria-label={this.ariaLabel}
        name={this.name}
        onUpdateValue={this.handleChange}
        defaultValue={this.value}
        options={this.regionOptions(regions)}
      />
    ) : (
      <div class="region-name">{this.globalRegion.body.name}</div>
    );
  }
}

Tunnel.injectProps(ManifoldRegionSelector, ['connection']);
