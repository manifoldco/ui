export interface Connection {
  billing: string;
  catalog: string;
  gateway: string;
  marketplace: string;
  provisioning: string;
  connector: string;
  graphQl: string;
}

export type Env = 'local' | 'stage' | 'prod';
type Connections = { [K in Env]: Connection };

export const connections: Connections = {
  local: {
    billing: 'http://api.billing.arigato.tools/v1',
    catalog: 'http://api.catalog.arigato.tools/v1',
    gateway: 'http://api.gateway.arigato.tools/v1',
    marketplace: 'http://api.marketplace.arigato.tools/v1',
    provisioning: 'http://api.provisioning.arigato.tools/v1',
    connector: 'http://api.connector.arigato.tools/v1',
    graphQl: 'http://graphql.arigato.tools/graphql',
  },
  stage: {
    billing: 'https://api.billing.stage.manifold.co/v1',
    catalog: 'https://api.catalog.stage.manifold.co/v1',
    gateway: 'https://api.stage.manifold.co/v1',
    marketplace: 'https://api.marketplace.stage.manifold.co/v1',
    provisioning: 'https://api.provisioning.stage.manifold/v1',
    connector: 'https://api.connector.stage.manifold/v1',
    graphQl: 'https://api.stage.manifold.co/graphql',
  },
  prod: {
    billing: 'https://api.billing.manifold.co/v1',
    catalog: 'https://api.catalog.manifold.co/v1',
    gateway: 'https://api.manifold.co/v1',
    marketplace: 'https://api.marketplace.manifold.co/v1',
    provisioning: 'https://api.provisioning.manifold.co/v1',
    connector: 'https://api.connector.manifold.co/v1',
    graphQl: 'https://api.manifold.co/graphql',
  },
};
