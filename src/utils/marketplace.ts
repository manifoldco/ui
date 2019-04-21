import {
  activity,
  ai,
  cpu,
  credit_card,
  database,
  dollar_sign,
  file,
  image,
  infrastructure,
  logging,
  message_circle,
  play_circle,
  plug,
  search,
  shield,
  shopping_cart,
  square,
  tool,
  worker,
} from '@manifoldco/icons';
import serviceTemplates from '../data/templates';

export interface CategoryMap {
  [category: string]: Catalog.Product[];
}

export function formatCategoryLabel(tag: string): string {
  switch (tag) {
    case 'cms':
      return 'CMS';
    case 'ai-ml':
      return 'AI/ML';
    default:
      return tag.replace(/-/g, ' ');
  }
}

export function categories(services?: Catalog.Product[]): CategoryMap {
  const categoryMap: CategoryMap = {};

  if (Array.isArray(services)) {
    services.forEach(service => {
      const tags = service.body.tags || ['uncategorized'];
      tags.forEach(tag => {
        categoryMap[tag] = categoryMap[tag] || [];
        categoryMap[tag].push(service);
      });

      return {};
    });
  }

  serviceTemplates.forEach(({ category }) => {
    if (!Array.isArray(categoryMap[category])) {
      categoryMap[category] = [];
    }
  });

  return categoryMap;
}

export function filteredServices(filter: string, services?: Catalog.Product[]): Catalog.Product[] {
  if (!filter || !services) {
    return [];
  }

  const searchTerm = filter.toLocaleLowerCase();
  return services.filter(s => {
    const searchTargets = [s.body.label, s.body.name.toLocaleLowerCase()].concat(s.body.tags || []);
    return searchTargets.some(t => t.includes(searchTerm));
  });
}

export const categoryIcon: { [key: string]: string } = {
  'ai-ml': ai,
  api: plug,
  authentication: shield,
  cms: file,
  database,
  infrastructure,
  logging,
  'memory-store': cpu,
  monitoring: activity,
  messaging: message_circle,
  optimization: image,
  payment: credit_card,
  runtime: play_circle,
  search,
  'sell-your-service': dollar_sign,
  worker,
  uncategorized: square,
  utility: tool,
  ecommerce: shopping_cart,
};
