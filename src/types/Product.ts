export interface Product {
  body: {
    documentation_url: string;
    images: string[];
    label: string;
    logo_url: string;
    name: string;
    support_email: string;
    tagline: string;
    tags: string[];
    value_props: {
      body: string;
      header: string;
    }[];
  };
  id: string;
}
