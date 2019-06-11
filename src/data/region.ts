/**
 * Region fallback
 * There aren’t many things it makes sense to cache, but this is one of them
 */

import { Catalog } from '../types/catalog';

export const globalRegion: Catalog.Region = {
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
