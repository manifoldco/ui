export interface Connection {
  catalog: string;
  gateway: string;
  marketplace: string;
  provisioning: string;
}

export type Env = 'stage' | 'prod';
type Connections = { [K in Env]: Connection };

export const connections: Connections = {
  stage: {
    catalog: 'https://api.catalog.stage.manifold.co/v1',
    gateway: 'https://api.stage.manifold.co/v1',
    marketplace: 'https://api.marketplace.stage.manifold.co/v1',
    provisioning: 'https://api.provisioning.stage.manifold.co/v1',
  },
  prod: {
    catalog: 'https://api.catalog.manifold.co/v1',
    gateway: 'https://api.manifold.co/v1',
    marketplace: 'https://api.marketplace.manifold.co/v1',
    provisioning: 'https://api.provisioning.manifold.co/v1',
  },
};
