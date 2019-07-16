export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Category is a category an entity is in. */
export type Category = {
  __typename?: 'Category';
  label: Scalars['String'];
  products: ProductConnection;
};

/** Category is a category an entity is in. */
export type CategoryProductsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<ProductOrderBy>;
};

/** CategoryConnection is a connection between an entity and its categories. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  edges: Array<CategoryEdge>;
  pageInfo: PageInfo;
};

/** CategoryEdge is an edge of a CategoryConnection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  node: Category;
  cursor: Scalars['String'];
};

/** Order by which to sort configurable features. */
export type ConfigurableFeaturesOrderBy = {
  field: ConfigurableFeaturesOrderByField;
  direction: OrderByDirection;
};

/** Fields by which to sort configurable features. */
export enum ConfigurableFeaturesOrderByField {
  Label = 'LABEL',
  DisplayName = 'DISPLAY_NAME',
}

/** Order by which to sort fixed features. */
export type FixedFeaturesOrderBy = {
  field: FixedFeaturesOrderByField;
  direction: OrderByDirection;
};

/** Fields by which to sort fixed features. */
export enum FixedFeaturesOrderByField {
  DisplayName = 'DISPLAY_NAME',
}

/** Order by which to sort metered features. */
export type MeteredFeaturesOrderBy = {
  field: MeteredFeaturesOrderByField;
  direction: OrderByDirection;
};

/** Fields by which to sort metered features. */
export enum MeteredFeaturesOrderByField {
  Label = 'LABEL',
  DisplayName = 'DISPLAY_NAME',
}

export type Node = {
  id: Scalars['ID'];
};

/** The direction use to order results. */
export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** PageInfo provides support for
 * [Relay](https://facebook.github.io/relay/graphql/connections.htm) cursor
 * connections style pagination.
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  startCurser?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

/** A Plan is a plan in a product */
export type Plan = Node & {
  __typename?: 'Plan';
  id: Scalars['ID'];
  /** A human readable display name for this plan. */
  displayName: Scalars['String'];
  /** A URL friendly label for this Region, combining its platform and dataCenter
   * with a hyphen. Globally unique.
   */
  label: Scalars['String'];
  /** The product this plan is associated with. */
  product: Product;
  /** The current state of the plan. */
  state: PlanState;
  /** A list of fixed features associated with the plan. */
  fixedFeatures?: Maybe<PlanFixedFeatureConnection>;
  /** A list of metered features associated with the plan. */
  meteredFeatures?: Maybe<PlanMeteredFeatureConnection>;
  /** A list of configurable features associated with the plan. */
  configurableFeatures?: Maybe<PlanConfigurableFeatureConnection>;
  cost: Scalars['Int'];
  /** The datacenters associated with this plan. */
  regions?: Maybe<RegionConnection>;
};

/** A Plan is a plan in a product */
export type PlanFixedFeaturesArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<FixedFeaturesOrderBy>;
};

/** A Plan is a plan in a product */
export type PlanMeteredFeaturesArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<MeteredFeaturesOrderBy>;
};

/** A Plan is a plan in a product */
export type PlanConfigurableFeaturesArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<ConfigurableFeaturesOrderBy>;
};

/** A Plan is a plan in a product */
export type PlanRegionsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<RegionsOrderBy>;
};

/** PlanConfigurableFeature is a configurable feature of a plan. */
export type PlanConfigurableFeature = {
  __typename?: 'PlanConfigurableFeature';
  label: Scalars['String'];
  displayName: Scalars['String'];
  type: PlanFeatureType;
  options?: Maybe<Array<PlanFixedFeature>>;
  numericDetails?: Maybe<PlanConfigurableFeatureNumericDetails>;
};

/** PlanConfigurableFeatureConnection is the connection between a plan and its configurable properties. */
export type PlanConfigurableFeatureConnection = {
  __typename?: 'PlanConfigurableFeatureConnection';
  pageInfo: PageInfo;
  edges: Array<PlanConfigurableFeatureEdge>;
};

/** PlanConfigurableFeatureEdge is an edge of a PlanConfigurableFeatureConnection. */
export type PlanConfigurableFeatureEdge = {
  __typename?: 'PlanConfigurableFeatureEdge';
  cursor: Scalars['String'];
  node: PlanConfigurableFeature;
};

/** PlanConfigurableFeatureNumericDetails contains the numeric details of a configurable plan feature. */
export type PlanConfigurableFeatureNumericDetails = {
  __typename?: 'PlanConfigurableFeatureNumericDetails';
  increment: Scalars['Int'];
  min: Scalars['Int'];
  max: Scalars['Int'];
  unit: Scalars['String'];
  costTiers?: Maybe<Array<PlanFeatureCostTier>>;
};

/** A PlanConnection is the connection between a Plan and its containing Product */
export type PlanConnection = {
  __typename?: 'PlanConnection';
  edges: Array<PlanEdge>;
  pageInfo: PageInfo;
};

/** A PlanEdge is an edge of a PlanConnection */
export type PlanEdge = {
  __typename?: 'PlanEdge';
  node: Plan;
  cursor: Scalars['String'];
};

/** PlanFeatureCostTier represents a cost tier in a plan. */
export type PlanFeatureCostTier = {
  __typename?: 'PlanFeatureCostTier';
  limit: Scalars['Int'];
  cost: Scalars['Int'];
};

/** PlanFeatureType is an enumeration of different types of plans. */
export enum PlanFeatureType {
  Boolean = 'BOOLEAN',
  String = 'STRING',
  Number = 'NUMBER',
}

/** PlanFixedFeature is a value property of a plan. */
export type PlanFixedFeature = {
  __typename?: 'PlanFixedFeature';
  displayName: Scalars['String'];
  displayValue: Scalars['String'];
};

/** PlanFixedFeaturesConnection is the connection between a plan and its value properties. */
export type PlanFixedFeatureConnection = {
  __typename?: 'PlanFixedFeatureConnection';
  pageInfo: PageInfo;
  edges: Array<PlanFixedFeatureEdge>;
};

/** PlanFixedFeatureEdge is an edge of a PlanFixedFeatureConnection. */
export type PlanFixedFeatureEdge = {
  __typename?: 'PlanFixedFeatureEdge';
  cursor: Scalars['String'];
  node: PlanFixedFeature;
};

/** PlanMeteredFeature is a metered feature of a plan. */
export type PlanMeteredFeature = {
  __typename?: 'PlanMeteredFeature';
  label: Scalars['String'];
  displayName: Scalars['String'];
  numericDetails: PlanMeteredFeatureNumericDetails;
};

/** PlanMeteredFeatureConnection is the connection between a plan and its metered properties. */
export type PlanMeteredFeatureConnection = {
  __typename?: 'PlanMeteredFeatureConnection';
  pageInfo: PageInfo;
  edges: Array<PlanMeteredFeatureEdge>;
};

/** PlanMeteredFeatureEdge is an edge of a PlanMeteredFeatureConnection. */
export type PlanMeteredFeatureEdge = {
  __typename?: 'PlanMeteredFeatureEdge';
  cursor: Scalars['String'];
  node: PlanMeteredFeature;
};

/** PlanMeteredFeatureNumericDetails contains the numeric details of a metered plan feature. */
export type PlanMeteredFeatureNumericDetails = {
  __typename?: 'PlanMeteredFeatureNumericDetails';
  unit: Scalars['String'];
  costTiers?: Maybe<Array<PlanFeatureCostTier>>;
};

/** PlanOrderBy defines how a plan connection is to be ordered. */
export type PlanOrderBy = {
  field: PlanOrderByField;
  direction: OrderByDirection;
};

/** PlanOrderByField is a the field by which a plan list will be ordered. */
export enum PlanOrderByField {
  Label = 'LABEL',
  DisplayName = 'DISPLAY_NAME',
  Cost = 'COST',
}

/** PlanState is an enumeration of possible Plan states. */
export enum PlanState {
  Hidden = 'HIDDEN',
  Available = 'AVAILABLE',
  Grandfathered = 'GRANDFATHERED',
  Unlisted = 'UNLISTED',
}

/** A Product is a provider's product */
export type Product = Node & {
  __typename?: 'Product';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  label: Scalars['String'];
  logoUrl: Scalars['String'];
  /** Provider is the provider associated with this product. It can be null if
   * providerID is null or a provider cannot be retrieved.
   */
  provider?: Maybe<Provider>;
  /** State is the currect product state. */
  state: ProductState;
  tagline: Scalars['String'];
  supportEmail: Scalars['String'];
  documentationUrl: Scalars['String'];
  termsUrl: Scalars['String'];
  integration?: Maybe<ProductIntegration>;
  /** Screenshots are a list of all the images set for this product listing details. */
  screenshots?: Maybe<Array<ProductScreenshot>>;
  /** ValueProps is a list of property values with a header and a body. It is non-nullable, but it can be empty. */
  valueProps: Array<ValueProp>;
  /** List Plans associated with the product */
  plans?: Maybe<PlanConnection>;
  categories: Array<Category>;
};

/** A Product is a provider's product */
export type ProductPlansArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<PlanOrderBy>;
};

/** A ProductConnection is the connection containing Product edges */
export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges: Array<ProductEdge>;
  pageInfo: PageInfo;
};

/** A ProductEdge is an edge of a ProductConnection */
export type ProductEdge = {
  __typename?: 'ProductEdge';
  node: Product;
  cursor: Scalars['String'];
};

/** ProductIntegration contains information about integrating products. */
export type ProductIntegration = {
  __typename?: 'ProductIntegration';
  baseUrl: Scalars['String'];
  ssoUrl: Scalars['String'];
};

/** ProductOrderBy defines how a product connection is to be ordered. */
export type ProductOrderBy = {
  field: ProductOrderByField;
  direction: OrderByDirection;
};

/** ProductOrderByField is a the field by which a Product list will be ordered. */
export enum ProductOrderByField {
  DisplayName = 'DISPLAY_NAME',
}

/** ProductScreenshot includes the information to find and order a screenshot. */
export type ProductScreenshot = {
  __typename?: 'ProductScreenshot';
  url: Scalars['String'];
  order: Scalars['Int'];
};

/** ProductState is an enum of possible product states. */
export enum ProductState {
  Available = 'AVAILABLE',
  Hidden = 'HIDDEN',
  Grandfathered = 'GRANDFATHERED',
  New = 'NEW',
  Upcoming = 'UPCOMING',
}

/** A Provider in Manifold's catalog. Providers own Products. */
export type Provider = Node & {
  __typename?: 'Provider';
  id: Scalars['ID'];
  /** A URL friendly label for this Provider. Globally unique. */
  label: Scalars['String'];
  /** A human readble display name for this Provider. */
  displayName: Scalars['String'];
  /** The URL of the logo for this Provider. */
  logoUrl: Scalars['String'];
  /** The URL of this Provider's primary website. */
  url: Scalars['String'];
  /** The email address for contacting this Provider with support requests. */
  supportEmail: Scalars['String'];
  /** The list of products associated with this provider. */
  products?: Maybe<ProductConnection>;
};

/** A Provider in Manifold's catalog. Providers own Products. */
export type ProviderProductsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<ProductOrderBy>;
};

/** Queries for the Manifold GraphQL API. */
export type Query = {
  __typename?: 'Query';
  /** Look up a Provider by it's `id` or `label`. Exactly one of `id` or `label` is
   * required, and `id` has precedence over `label`.
   */
  provider?: Maybe<Provider>;
  /** Look up a Plan by its `id`. `id` is required. */
  plan?: Maybe<Plan>;
  /** Look up a product by its `id` or label. Exactly one of `id` or `label` is required, and `id` has precedence over `label`. */
  product?: Maybe<Product>;
  /** List all available categories in the system. */
  categories: CategoryConnection;
  /** Look up a category by its label. */
  category?: Maybe<Category>;
  /** List all availabkle products */
  products?: Maybe<ProductConnection>;
  /** Look up a node by its `id`. */
  node: Node;
};

/** Queries for the Manifold GraphQL API. */
export type QueryProviderArgs = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
};

/** Queries for the Manifold GraphQL API. */
export type QueryPlanArgs = {
  id: Scalars['ID'];
};

/** Queries for the Manifold GraphQL API. */
export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
};

/** Queries for the Manifold GraphQL API. */
export type QueryCategoriesArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

/** Queries for the Manifold GraphQL API. */
export type QueryCategoryArgs = {
  label: Scalars['String'];
};

/** Queries for the Manifold GraphQL API. */
export type QueryProductsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  orderBy?: Maybe<ProductOrderBy>;
};

/** Queries for the Manifold GraphQL API. */
export type QueryNodeArgs = {
  id: Scalars['ID'];
};

/** A Region is a Data Center within a cloud provider's platform. */
export type Region = Node & {
  __typename?: 'Region';
  id: Scalars['ID'];
  /** A human readble display name for this Region. */
  displayName: Scalars['String'];
  /** The commercial cloud provider that hosts the Region. */
  platform: Scalars['String'];
  /** A platform specific data center identifier. */
  dataCenter: Scalars['String'];
};

export type RegionConnection = {
  __typename?: 'RegionConnection';
  edges: Array<RegionEdge>;
  pageInfo: PageInfo;
};

export type RegionEdge = {
  __typename?: 'RegionEdge';
  node: Region;
  cursor: Scalars['String'];
};

/** RegionsOrderBy is an input defining how to order regions. */
export type RegionsOrderBy = {
  field: RegionsOrderByField;
  direction: OrderByDirection;
};

/** RegionsOrderByField is an enum of fields to order regions by. */
export enum RegionsOrderByField {
  DisplayName = 'DISPLAY_NAME',
  Platform = 'PLATFORM',
  DataCenter = 'DATA_CENTER',
}

/** ValueProp is a property value */
export type ValueProp = {
  __typename?: 'ValueProp';
  header: Scalars['String'];
  body: Scalars['String'];
};
