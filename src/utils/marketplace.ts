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
import { Catalog } from '../types/catalog';

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
