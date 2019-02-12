export interface Service {
  body: {
    label: string;
    logo_url: string;
    name: string;
    tagline: string;
    tags?: Array<string>;
  };
}
