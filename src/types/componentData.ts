import { Product as GraphQLProduct, ProductEdge as GraphQLProductEdge } from './graphql';

export type Product = GraphQLProduct & {
  hasFreePlan: boolean;
};

export type ProductEdge = GraphQLProductEdge & {
  node: Product;
};
