export interface Connection {
  billing: string;
  catalog: string;
  gateway: string;
  marketplace: string;
}

export type Env = 'stage' | 'prod';
type Connections = { [K in Env]: Connection };

export const connections: Connections = {
  stage: {
    billing: 'https://api.billing.stage.manifold.co/v1',
    catalog: 'https://api.catalog.stage.manifold.co/v1',
    gateway: 'https://api.stage.manifold.co/v1',
    marketplace: 'https://api.marketplace.stage.manifold.co/v1',
  },
  prod: {
    billing: 'https://api.billing.manifold.co/v1',
    catalog: 'https://api.catalog.manifold.co/v1',
    gateway: 'https://api.manifold.co/v1',
    marketplace: 'https://api.marketplace.manifold.co/v1',
  },
};
