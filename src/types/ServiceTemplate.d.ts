declare interface ServiceTemplate {
  id: string;
  category: string;
  name: string;
  description: string;
  url: string;
  config: string[];
  label: string;
  image: string;
  listing_labels?: string[];
}
