export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * ProfileIdentity allows fetching a profile by its `id` or
   * by its `subject`.
 **/
  ProfileIdentity: any,
  /** 
 * Time represents a point in time formatted as an
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) formatted string.
   * 
   * Example: `2009-11-10T23:00:00Z`
 **/
  Time: any,
};

/** CalculationType are the known calculation types possible for SubLineItems. */
export enum CalculationType {
  Prorate = 'PRORATE',
  UsageTier = 'USAGE_TIER'
}

/** Category is a category an entity is in. */
export type Category = {
   __typename?: 'Category',
  label: Scalars['String'],
  products: ProductConnection,
};


/** Category is a category an entity is in. */
export type CategoryProductsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<ProductOrderBy>
};

/** CategoryConnection is a connection between an entity and its categories. */
export type CategoryConnection = {
   __typename?: 'CategoryConnection',
  edges: Array<CategoryEdge>,
  pageInfo: PageInfo,
};

/** CategoryEdge is an edge of a CategoryConnection. */
export type CategoryEdge = {
   __typename?: 'CategoryEdge',
  node: Category,
  cursor: Scalars['String'],
};

/** ChargeTime is representation of when the charge for a cycle occurs. */
export enum ChargeTime {
  PostPaid = 'POST_PAID'
}

/** Order by which to sort configurable features. */
export type ConfigurableFeaturesOrderBy = {
  field: ConfigurableFeaturesOrderByField,
  direction: OrderByDirection,
};

/** Fields by which to sort configurable features. */
export enum ConfigurableFeaturesOrderByField {
  Label = 'LABEL',
  DisplayName = 'DISPLAY_NAME'
}

/** 
 * Credential represents a plain text value for a credential which can be used to
 * configure a resource.
 **/
export type Credential = {
   __typename?: 'Credential',
  /**  The key to which we can reference the credential as.  */
  key: Scalars['String'],
  /** 
 * The plain text value of the credential. This value is the value that can be
   * used in the actual configuration for the resource.
 **/
  value: Scalars['String'],
};

/** 
 * CredentialsConnection allows a type to set up a connection to list associated
 * credentials.
 **/
export type CredentialConnection = {
   __typename?: 'CredentialConnection',
  pageInfo: PageInfo,
  edges: Array<CredentialEdge>,
};

/** 
 * CredentialsEdge represents a single item on a Credentials Connection page which
 * has a cursor which can be used for pagination and holds the actual credential
 * information.
 **/
export type CredentialEdge = {
   __typename?: 'CredentialEdge',
  cursor: Scalars['String'],
  node?: Maybe<Credential>,
};

/** Currency is the supported currency represented as an ISO currency code. */
export enum Currency {
  Usd = 'USD'
}

/** Duration is a representation of how long a cycle is. */
export enum Duration {
  Monthly = 'MONTHLY'
}

/** Order by which to sort fixed features. */
export type FixedFeaturesOrderBy = {
  field: FixedFeaturesOrderByField,
  direction: OrderByDirection,
};

/** Fields by which to sort fixed features. */
export enum FixedFeaturesOrderByField {
  DisplayName = 'DISPLAY_NAME'
}

/** Invoice represents the total due in a specific billing period. */
export type Invoice = Node & {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  /** 
 * Cost is the amount due for the invoice.
   * 
   * The cost is provided in the currency’s smallest unit.
   * 
   * Example: `1000` is `1000 cents` which is `$10 USD`.
 **/
  cost: Scalars['Int'],
  /** Currency is the currency of the `cost` field. */
  currency: Currency,
  /** Start indicates when the invoice's period starts. */
  start: Scalars['Time'],
  /** End indicates when the invoice's period ends. */
  end: Scalars['Time'],
  /** List LineItems composing the invoice. */
  lineItems?: Maybe<LineItemConnection>,
};


/** Invoice represents the total due in a specific billing period. */
export type InvoiceLineItemsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};

/** InvoiceConnection is the connection between an entity and its invoices. */
export type InvoiceConnection = {
   __typename?: 'InvoiceConnection',
  pageInfo: PageInfo,
  edges: Array<InvoiceEdge>,
};

/** InvoiceEdge is an edge of InvoiceConnection */
export type InvoiceEdge = {
   __typename?: 'InvoiceEdge',
  cursor: Scalars['String'],
  node?: Maybe<Invoice>,
};

/** InvoiceOrderBy defines how an invoice connection is to be ordered. */
export type InvoiceOrderBy = {
  field: InvoiceOrderByField,
  direction: OrderByDirection,
};

/** InvoiceOrderByField is a the field by which an Invoice list will be ordered. */
export enum InvoiceOrderByField {
  CreatedAt = 'CREATED_AT'
}

/** LineItem represents the amount due for a resource. */
export type LineItem = Node & {
   __typename?: 'LineItem',
  id: Scalars['ID'],
  /** 
 * Cost is the amount due for the associated resource.
   * 
   * The cost is provided in the currency’s smallest unit.
   * 
   * Example: `1000` is `1000 cents` which is `$10 USD`.
 **/
  cost: Scalars['Int'],
  /** Currency is the currency of the `cost` field. */
  currency: Currency,
  /** Duration is the time horizon for associated resource’s billing (monthly, yearly) */
  duration: Duration,
  /** RenewalPoint describes the renewal behavior (calendar, anniversary) */
  renewalPoint: RenewalPoint,
  /** ChargeTime describes the charge behavior (post-paid, pre-paid) */
  chargeTime: ChargeTime,
  /** Resource is the resource accociated with this line item. */
  resource?: Maybe<Resource>,
  /** List SubLineItems composing the line item. */
  subLineItems?: Maybe<SubLineItemConnection>,
};


/** LineItem represents the amount due for a resource. */
export type LineItemSubLineItemsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};

/** LineItemConnection is the connection between an invoice and its lineItems. */
export type LineItemConnection = {
   __typename?: 'LineItemConnection',
  pageInfo: PageInfo,
  edges: Array<LineItemEdge>,
};

/** LineItemEdge is an edge of LineItemConnection */
export type LineItemEdge = {
   __typename?: 'LineItemEdge',
  cursor: Scalars['String'],
  node?: Maybe<LineItem>,
};

/** Order by which to sort metered features. */
export type MeteredFeaturesOrderBy = {
  field: MeteredFeaturesOrderByField,
  direction: OrderByDirection,
};

/** Fields by which to sort metered features. */
export enum MeteredFeaturesOrderByField {
  Label = 'LABEL',
  DisplayName = 'DISPLAY_NAME'
}

export type Node = {
  id: Scalars['ID'],
};

/** The direction use to order results. */
export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** 
 * PageInfo provides support for
 * [Relay](https://facebook.github.io/relay/graphql/connections.htm) cursor
 * connections style pagination.
 **/
export type PageInfo = {
   __typename?: 'PageInfo',
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
};

/** A Plan is a plan in a product */
export type Plan = Node & {
   __typename?: 'Plan',
  id: Scalars['ID'],
  /** A human readable display name for this plan. */
  displayName: Scalars['String'],
  /** 
 * A URL friendly label for this Region, combining its platform and dataCenter
   * with a hyphen. Globally unique.
 **/
  label: Scalars['String'],
  /** The product this plan is associated with. */
  product: Product,
  /** The current state of the plan. */
  state: PlanState,
  /** A list of fixed features associated with the plan. */
  fixedFeatures?: Maybe<PlanFixedFeatureConnection>,
  /** A list of metered features associated with the plan. */
  meteredFeatures?: Maybe<PlanMeteredFeatureConnection>,
  /** A list of configurable features associated with the plan. */
  configurableFeatures?: Maybe<PlanConfigurableFeatureConnection>,
  /** The plan's base cost without the addition of metered features costs */
  cost: Scalars['Int'],
  /** If the plan is free, including if there are metered features changing the cost of a plan with base cost 0. */
  free: Scalars['Boolean'],
  /** The datacenters associated with this plan. */
  regions?: Maybe<RegionConnection>,
};


/** A Plan is a plan in a product */
export type PlanFixedFeaturesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<FixedFeaturesOrderBy>
};


/** A Plan is a plan in a product */
export type PlanMeteredFeaturesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<MeteredFeaturesOrderBy>
};


/** A Plan is a plan in a product */
export type PlanConfigurableFeaturesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<ConfigurableFeaturesOrderBy>
};


/** A Plan is a plan in a product */
export type PlanRegionsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<RegionsOrderBy>
};

/** PlanConfigurableFeature is a configurable feature of a plan. */
export type PlanConfigurableFeature = {
   __typename?: 'PlanConfigurableFeature',
  label: Scalars['String'],
  displayName: Scalars['String'],
  type: PlanFeatureType,
  options?: Maybe<Array<PlanFixedFeature>>,
  numericDetails?: Maybe<PlanConfigurableFeatureNumericDetails>,
};

/** PlanConfigurableFeatureConnection is the connection between a plan and its configurable properties. */
export type PlanConfigurableFeatureConnection = {
   __typename?: 'PlanConfigurableFeatureConnection',
  pageInfo: PageInfo,
  edges: Array<PlanConfigurableFeatureEdge>,
};

/** PlanConfigurableFeatureEdge is an edge of a PlanConfigurableFeatureConnection. */
export type PlanConfigurableFeatureEdge = {
   __typename?: 'PlanConfigurableFeatureEdge',
  cursor: Scalars['String'],
  node: PlanConfigurableFeature,
};

/** PlanConfigurableFeatureNumericDetails contains the numeric details of a configurable plan feature. */
export type PlanConfigurableFeatureNumericDetails = {
   __typename?: 'PlanConfigurableFeatureNumericDetails',
  increment: Scalars['Int'],
  min: Scalars['Int'],
  max: Scalars['Int'],
  unit: Scalars['String'],
  costTiers?: Maybe<Array<PlanFeatureCostTier>>,
};

/** A PlanConnection is the connection between a Plan and its containing Product */
export type PlanConnection = {
   __typename?: 'PlanConnection',
  edges: Array<PlanEdge>,
  pageInfo: PageInfo,
};

/** A PlanEdge is an edge of a PlanConnection */
export type PlanEdge = {
   __typename?: 'PlanEdge',
  node: Plan,
  cursor: Scalars['String'],
};

/** PlanFeatureCostTier represents a cost tier in a plan. */
export type PlanFeatureCostTier = {
   __typename?: 'PlanFeatureCostTier',
  limit: Scalars['Int'],
  cost: Scalars['Int'],
};

/** PlanFeatureType is an enumeration of different types of plans. */
export enum PlanFeatureType {
  Boolean = 'BOOLEAN',
  String = 'STRING',
  Number = 'NUMBER'
}

/** PlanFixedFeature is a value property of a plan. */
export type PlanFixedFeature = {
   __typename?: 'PlanFixedFeature',
  displayName: Scalars['String'],
  displayValue: Scalars['String'],
};

/** PlanFixedFeaturesConnection is the connection between a plan and its value properties. */
export type PlanFixedFeatureConnection = {
   __typename?: 'PlanFixedFeatureConnection',
  pageInfo: PageInfo,
  edges: Array<PlanFixedFeatureEdge>,
};

/** PlanFixedFeatureEdge is an edge of a PlanFixedFeatureConnection. */
export type PlanFixedFeatureEdge = {
   __typename?: 'PlanFixedFeatureEdge',
  cursor: Scalars['String'],
  node: PlanFixedFeature,
};

/** PlanMeteredFeature is a metered feature of a plan. */
export type PlanMeteredFeature = {
   __typename?: 'PlanMeteredFeature',
  label: Scalars['String'],
  displayName: Scalars['String'],
  numericDetails: PlanMeteredFeatureNumericDetails,
};

/** PlanMeteredFeatureConnection is the connection between a plan and its metered properties. */
export type PlanMeteredFeatureConnection = {
   __typename?: 'PlanMeteredFeatureConnection',
  pageInfo: PageInfo,
  edges: Array<PlanMeteredFeatureEdge>,
};

/** PlanMeteredFeatureEdge is an edge of a PlanMeteredFeatureConnection. */
export type PlanMeteredFeatureEdge = {
   __typename?: 'PlanMeteredFeatureEdge',
  cursor: Scalars['String'],
  node: PlanMeteredFeature,
};

/** PlanMeteredFeatureNumericDetails contains the numeric details of a metered plan feature. */
export type PlanMeteredFeatureNumericDetails = {
   __typename?: 'PlanMeteredFeatureNumericDetails',
  unit: Scalars['String'],
  costTiers?: Maybe<Array<PlanFeatureCostTier>>,
};

/** PlanOrderBy defines how a plan connection is to be ordered. */
export type PlanOrderBy = {
  field: PlanOrderByField,
  direction: OrderByDirection,
};

/** PlanOrderByField is a the field by which a plan list will be ordered. */
export enum PlanOrderByField {
  Label = 'LABEL',
  DisplayName = 'DISPLAY_NAME',
  Cost = 'COST'
}

/** PlanState is an enumeration of possible Plan states. */
export enum PlanState {
  Hidden = 'HIDDEN',
  Available = 'AVAILABLE',
  Grandfathered = 'GRANDFATHERED',
  Unlisted = 'UNLISTED'
}

/** 
 * Platform represents one of the platforms on which Manifold has published its
 * marketplace.
 **/
export type Platform = {
   __typename?: 'Platform',
  /** The ID of the Platform for internal usage. */
  id: Scalars['ID'],
  /** The domain associated with the platform. */
  domain: Scalars['String'],
};

/** A Product is a provider's product */
export type Product = Node & {
   __typename?: 'Product',
  id: Scalars['ID'],
  displayName: Scalars['String'],
  label: Scalars['String'],
  logoUrl: Scalars['String'],
  /** 
 * Provider is the provider associated with this product. It can be null if
   * providerID is null or a provider cannot be retrieved.
 **/
  provider?: Maybe<Provider>,
  /** State is the currect product state. */
  state: ProductState,
  tagline: Scalars['String'],
  supportEmail: Scalars['String'],
  documentationUrl: Scalars['String'],
  termsUrl: Scalars['String'],
  integration?: Maybe<ProductIntegration>,
  /** Screenshots are a list of all the images set for this product listing details. */
  screenshots?: Maybe<Array<ProductScreenshot>>,
  /** ValueProps is a list of property values with a header and a body. It is non-nullable, but it can be empty. */
  valueProps: Array<ValueProp>,
  /** ValuePropsHtml is the HTML representation of the value propositions. It is non-nullable, but it can be empty. */
  valuePropsHtml: Scalars['String'],
  /** 
 * SetupStepsHtml is the HTML representation of the setup steps required to
   * configure a new product. It is non-nullable, but it can be empty.
 **/
  setupStepsHtml: Scalars['String'],
  /** List Plans associated with the product */
  plans?: Maybe<PlanConnection>,
  categories: Array<Category>,
};


/** A Product is a provider's product */
export type ProductPlansArgs = {
  free?: Maybe<Scalars['Boolean']>,
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<PlanOrderBy>
};

/** A ProductConnection is the connection containing Product edges */
export type ProductConnection = {
   __typename?: 'ProductConnection',
  edges: Array<ProductEdge>,
  pageInfo: PageInfo,
};

/** A ProductEdge is an edge of a ProductConnection */
export type ProductEdge = {
   __typename?: 'ProductEdge',
  node: Product,
  cursor: Scalars['String'],
};

/** ProductIntegration contains information about integrating products. */
export type ProductIntegration = {
   __typename?: 'ProductIntegration',
  baseUrl: Scalars['String'],
  ssoUrl: Scalars['String'],
};

/** ProductOrderBy defines how a product connection is to be ordered. */
export type ProductOrderBy = {
  field: ProductOrderByField,
  direction: OrderByDirection,
};

/** ProductOrderByField is a the field by which a Product list will be ordered. */
export enum ProductOrderByField {
  DisplayName = 'DISPLAY_NAME'
}

/** ProductScreenshot includes the information to find and order a screenshot. */
export type ProductScreenshot = {
   __typename?: 'ProductScreenshot',
  url: Scalars['String'],
  order: Scalars['Int'],
};

/** ProductState is an enum of possible product states. */
export enum ProductState {
  Available = 'AVAILABLE',
  Hidden = 'HIDDEN',
  Grandfathered = 'GRANDFATHERED',
  New = 'NEW',
  Upcoming = 'UPCOMING'
}

/** Profile represents a consumer in the Manifold system. */
export type Profile = {
   __typename?: 'Profile',
  /** The ID of the profile which is internally used. */
  id: Scalars['ID'],
  /** Subject represents the identifier of the profile on the platform's side. */
  subject: Scalars['String'],
  /** Platform represents the platform this profile belongs to. */
  platform: Platform,
  /** 
 * InvoicePreview represents the preview of the customer’s invoice
   * for the current billing cycle as of midnight UTC.
   * 
   * An invoice preview consist of the amount due and related details at
   * a specific moment in time. It does not represent an estimation of the
   * amount that will be due at the end of the billing cycle.
   * 
   * *This is only an invoice preview. It should not be used to charge users.*
   * 
   * Note: this is currently only available with a Platform API Token.
 **/
  invoicePreview?: Maybe<Invoice>,
  /** 
 * Invoices will return a paginated list of invoices.
   * 
   * Note: this is currently only available with a Platform API Token.
 **/
  invoices?: Maybe<InvoiceConnection>,
};


/** Profile represents a consumer in the Manifold system. */
export type ProfileInvoicesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<InvoiceOrderBy>
};

/** ProfileConnection is the connection containing Profile edges */
export type ProfileConnection = {
   __typename?: 'ProfileConnection',
  pageInfo: PageInfo,
  edges: Array<ProfileEdge>,
};

/** ProfileEdge is the edge of a ProfileConnection */
export type ProfileEdge = {
   __typename?: 'ProfileEdge',
  cursor: Scalars['String'],
  node: Profile,
};


/** A Provider in Manifold's catalog. Providers own Products. */
export type Provider = Node & {
   __typename?: 'Provider',
  id: Scalars['ID'],
  /** A URL friendly label for this Provider. Globally unique. */
  label: Scalars['String'],
  /** A human readble display name for this Provider. */
  displayName: Scalars['String'],
  /** The URL of the logo for this Provider. */
  logoUrl: Scalars['String'],
  /** The URL of this Provider's primary website. */
  url: Scalars['String'],
  /** The email address for contacting this Provider with support requests. */
  supportEmail: Scalars['String'],
  /** The list of products associated with this provider. */
  products?: Maybe<ProductConnection>,
};


/** A Provider in Manifold's catalog. Providers own Products. */
export type ProviderProductsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<ProductOrderBy>
};

/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type Query = {
   __typename?: 'Query',
  /** 
 * Look up a Provider by it's `id` or `label`. Exactly one of `id` or `label` is
   * required, and `id` has precedence over `label`.
 **/
  provider?: Maybe<Provider>,
  /** Look up a Plan by its `id`. `id` is required. */
  plan?: Maybe<Plan>,
  /** Look up a product by its `id` or label. Exactly one of `id` or `label` is required, and `id` has precedence over `label`. */
  product?: Maybe<Product>,
  /** List all available categories in the system. */
  categories: CategoryConnection,
  /** Look up a category by its label. */
  category?: Maybe<Category>,
  /** List all available products */
  products?: Maybe<ProductConnection>,
  /** 
 * Look up a profile by `id`, `subject` or based on the currently authenticated profile.
   * 
   * Note: this query can only be performed when authenticated.
 **/
  profile: Profile,
  /** Look up a node by its `id`. */
  node: Node,
  /** 
 * Resources will return a paginated list of resources. It will either contain
   * all available resources linked to the token, or it will be filtered down to
   * fetch data for the specified profile. The owner can either be a ProfileID or
   * a Subject ID which represents the ProfileID within a specific Platform.
   * 
   * Note: this is currently only available with a Platform API Token.
 **/
  resources?: Maybe<ResourceConnection>,
  /** 
 * Fetch a resource for the specific label or ID. When authenticated as a
   * profile, this will fetch the resource associated with the profile. If
   * authenticated as a platform, an owner needs to be provided when a label is
   * used.
   * 
   * Note: this is currently only available with a Platform API Token.
 **/
  resource?: Maybe<Resource>,
  /** 
 * Profiles will return a paginated list of profiles for a Platform, optionally
   * querying for only profiles with subscription usage over a provided time.
   * 
   * Note: this is currently only available with a Platform API Token.
 **/
  profiles?: Maybe<ProfileConnection>,
  /** Look up an invoice by its `id`. */
  invoice?: Maybe<Invoice>,
  /** Look up a line item by it's `id`. */
  lineItem?: Maybe<LineItem>,
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryProviderArgs = {
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryPlanArgs = {
  id: Scalars['ID']
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryCategoriesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryCategoryArgs = {
  label: Scalars['String']
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryProductsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  orderBy?: Maybe<ProductOrderBy>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryProfileArgs = {
  id?: Maybe<Scalars['ProfileIdentity']>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryNodeArgs = {
  id: Scalars['ID']
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryResourcesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  owner?: Maybe<Scalars['ProfileIdentity']>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryResourceArgs = {
  id?: Maybe<Scalars['ID']>,
  label?: Maybe<Scalars['String']>,
  owner?: Maybe<Scalars['ProfileIdentity']>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryProfilesArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>,
  withUsage?: Maybe<WithUsage>
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryInvoiceArgs = {
  id: Scalars['ID']
};


/** 
 * Queries for the Manifold GraphQL API.
 * 
 * More details and usage available on the
 * [platform documentation page](https://docs.manifold.co/docs/graphql-apis-AWRk3LPzpjcI5ynoCtuZs).
 **/
export type QueryLineItemArgs = {
  id: Scalars['ID']
};

/** A Region is a Data Center within a cloud provider's platform. */
export type Region = Node & {
   __typename?: 'Region',
  id: Scalars['ID'],
  /** A human readble display name for this Region. */
  displayName: Scalars['String'],
  /** The commercial cloud provider that hosts the Region. */
  platform: Scalars['String'],
  /** A platform specific data center identifier. */
  dataCenter: Scalars['String'],
};

export type RegionConnection = {
   __typename?: 'RegionConnection',
  edges: Array<RegionEdge>,
  pageInfo: PageInfo,
};

export type RegionEdge = {
   __typename?: 'RegionEdge',
  node: Region,
  cursor: Scalars['String'],
};

/** RegionsOrderBy is an input defining how to order regions. */
export type RegionsOrderBy = {
  field: RegionsOrderByField,
  direction: OrderByDirection,
};

/** RegionsOrderByField is an enum of fields to order regions by. */
export enum RegionsOrderByField {
  DisplayName = 'DISPLAY_NAME',
  Platform = 'PLATFORM',
  DataCenter = 'DATA_CENTER'
}

/** RenewalPoint is a representation of when the cycle renewal occurs. */
export enum RenewalPoint {
  Calendar = 'CALENDAR'
}

/** 
 * A resource represents the provisioned version of a selected product. It is
 * linked to a plan and has credentials associated with it.
 **/
export type Resource = Node & {
   __typename?: 'Resource',
  id: Scalars['ID'],
  /**  A human readable display name for this resource.  */
  displayName: Scalars['String'],
  /**  A machine readable label for this resource. It is unique per owner.  */
  label: Scalars['String'],
  /** 
 * The plan for which this resource is provisioned. The plan can be null if the
   * resource is a custom resource, or if there's a transient failure.
 **/
  plan?: Maybe<Plan>,
  /** 
 * The profile which owns the resource.
   * 
   * Note: if the resource is not owned by a Platform Profile, this will be null.
 **/
  owner?: Maybe<Profile>,
  /** A list of credentials which are used to access the Resource */
  credentials?: Maybe<CredentialConnection>,
};


/** 
 * A resource represents the provisioned version of a selected product. It is
 * linked to a plan and has credentials associated with it.
 **/
export type ResourceCredentialsArgs = {
  first: Scalars['Int'],
  after?: Maybe<Scalars['String']>
};

/** 
 * ResourceConnection allows a type to set up a connection to list associated
 * resources.
 **/
export type ResourceConnection = {
   __typename?: 'ResourceConnection',
  pageInfo: PageInfo,
  edges: Array<ResourceEdge>,
};

/** 
 * ResourceEdge represents a single item on a Resources Connection page which has
 * a cursor which can be used for pagination and holds the actual resource
 * information.
 **/
export type ResourceEdge = {
   __typename?: 'ResourceEdge',
  cursor: Scalars['String'],
  node?: Maybe<Resource>,
};

/** 
 * SubLineItem represents the break down by base cost, features and metered usage
 * of the amount due by resource.
 **/
export type SubLineItem = {
   __typename?: 'SubLineItem',
  /** 
 * Cost is the amount due for the feature.
   * 
   * The cost is provided in the currency’s smallest unit.
   * 
   * Example: `1000` is `1000 cents` which is `$10 USD`.
 **/
  cost: Scalars['Int'],
  /** Currency is the currency of the `cost` field. */
  currency: Currency,
  /** Plan is the plan associated with the SubLineItem. */
  plan?: Maybe<Plan>,
  /** Item is the feature name (base-cost, or a customized name) */
  item: Scalars['String'],
  /** Description is the value for the feature, or a metering bucket. */
  description: Scalars['String'],
  /** CalculationType defines the feature’s billing behavior (prorated, usage) */
  calculationType: CalculationType,
  /** Start indicates when the feature started to take effect. */
  start: Scalars['Time'],
  /** End indicates when the feature stopped to take effect. */
  end: Scalars['Time'],
};

/** SubLineItemConnection is the connection between a lineItem and its subLineItems. */
export type SubLineItemConnection = {
   __typename?: 'SubLineItemConnection',
  pageInfo: PageInfo,
  edges: Array<SubLineItemEdge>,
};

/** SubLineItemEdge is an edge of SubLineItemConnection */
export type SubLineItemEdge = {
   __typename?: 'SubLineItemEdge',
  cursor: Scalars['String'],
  node?: Maybe<SubLineItem>,
};


/** ValueProp is a property value */
export type ValueProp = {
   __typename?: 'ValueProp',
  header: Scalars['String'],
  body: Scalars['String'],
};

/** 
 * WithUsage allows fetching profiles that have been used after the start date,
 * before the end date or between the start and end date.
 **/
export type WithUsage = {
  /** Start allows fetching profiles used after this date */
  start?: Maybe<Scalars['Time']>,
  /** End allows fetching profiles used before this date */
  end?: Maybe<Scalars['Time']>,
};
