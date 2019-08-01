import { h, Component, Prop, State, Event, Element, EventEmitter } from '@stencil/core';

import { Option } from '../../types/Select';
import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-region-selector' })
export class ManifoldRegionSelector {
  @Element() el: HTMLElement;
  @Prop() allowedRegions: string[] = [];
  @Prop() ariaLabel: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  @Prop() name: string;
  @Prop() preferredRegions?: string[];
  @Prop() value?: string;
  @Prop({ mutable: true }) regions?: Catalog.Region[];
  @State() globalRegion: Catalog.Region = globalRegion;
  @Event() updateValue: EventEmitter;

  async componentDidLoad() {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Catalog.Region[]>({
      service: 'catalog',
      endpoint: `/regions`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    // Sorting is important, otherwise the region selector is in a different order every plan
    this.regions = this.sortRegions(response, this.preferredRegions);
    // Set global region (the one in src/data is just a fallback; we should always grab live)
    const global = this.regions.find(({ body: { location } }) => location === 'global');
    if (global) {
      this.globalRegion = global;
    }
  }

  handleChange = ({ detail }: CustomEvent) => {
    this.updateValue.emit({ ...detail });
  };

  filterRegions(regions: Catalog.Region[]): Catalog.Region[] {
    return regions.filter(({ id }) => this.allowedRegions.includes(id));
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
        if (indexA === -1) {
          indexA = preferredRegions.length;
        }
        let indexB = preferredRegions.indexOf(regionB);
        if (indexB === -1) {
          indexB = preferredRegions.length;
        }
        return indexA - indexB;
      }
      // For all unspecified regions, sort alphabetically
      return a.body.name.localeCompare(b.body.name);
    });
  }

  regionCode({ body: { location, platform } }: Catalog.Region) {
    return `${platform.replace('digital-ocean', 'do')}-${location}`;
  }

  @logger()
  render() {
    const regions = this.filterRegions(this.regions || []);

    if (!regions) {
      return null;
    }

    if (regions.length === 1) {
      return <div class="region-name">{regions[0].body.name}</div>;
    }

    return (
      <manifold-select
        aria-label={this.ariaLabel}
        name={this.name}
        onUpdateValue={this.handleChange}
        defaultValue={this.value}
        options={this.regionOptions(regions)}
      />
    );
  }
}

Tunnel.injectProps(ManifoldRegionSelector, ['restFetch']);
