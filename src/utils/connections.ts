export interface Connection {
  catalog: string;
  gateway: string;
}

export type Env = 'stage' | 'prod';
type Connections = { [K in Env]: Connection };

export const connections: Connections = {
  stage: {
    catalog: 'https://api.catalog.stage.manifold.co/v1',
    gateway: 'https://api.stage.manifold.co/v1',
  },
  prod: {
    catalog: 'https://api.catalog.manifold.co/v1',
    gateway: 'https://api.manifold.co/v1',
  },
};
