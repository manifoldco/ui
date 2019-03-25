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
      return tag.replace('-', ' ');
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
