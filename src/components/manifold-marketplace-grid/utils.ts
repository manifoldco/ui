import { ProductEdge } from '../../types/componentData';

export function filteredServices(filter: string, services?: ProductEdge[]): ProductEdge[] {
  if (!filter || !services) {
    return [];
  }

  const searchTerm = filter.toLocaleLowerCase();
  return services.filter(s => {
    const searchTargets = [s.node.label, s.node.displayName.toLocaleLowerCase()].concat(
      s.node.categories.map(c => c.label)
    );
    return searchTargets.some(t => t.includes(searchTerm));
  });
}

interface CategoryMap {
  [category: string]: ProductEdge[];
}

export function categories(services?: ProductEdge[]): CategoryMap {
  const categoryMap: CategoryMap = {};

  if (Array.isArray(services)) {
    services.forEach(service => {
      const tags = service.node.categories.length
        ? service.node.categories.map(c => c.label)
        : ['uncategorized'];
      tags.forEach(tag => {
        categoryMap[tag] = categoryMap[tag] || [];
        categoryMap[tag].push(service);
      });

      return {};
    });
  }

  return categoryMap;
}
