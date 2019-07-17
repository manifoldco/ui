export namespace Gateway {
  export interface Timed {
    created_at: string;
    updated_at: string;
  }
  export interface ResourceUpdateRequest extends ResourceBodyWrite {
    plan_id?: string;
    project_id?: string;
    features?: FeatureMap;
    annotations?: AnnotationsMap;
  }
  export interface ResourceCreateRequest extends ResourceBodyWrite, ResourceBodySource {
    product_id?: string;
    plan_id?: string;
    region_id?: string;
    project_id?: string;
    features?: FeatureMap;
    annotations?: AnnotationsMap;
  }
  export interface ResourceBodyWrite {
    label?: string;
    owner?: Owner;
  }
  export interface ResourceBodySource {
    source: 'catalog' | 'custom';
  }
  export interface ResourceBodyRequired {
    label: string;
    name: string;
    owner: Owner;
  }
  export interface ResourceBodyReadSource extends ResourceBodySource, ResourceBodyRead {}
  export interface ResourceBodyReadFeatures extends ResourceBodyReadSource {
    features?: ResolvedFeature[];
  }
  export interface ResourceBodyRead {
    type: 'resource';
    state?:
      | 'provision'
      | 'transfer'
      | 'resize'
      | 'move'
      | 'deprovision'
      | 'project_delete'
      | 'available';
    operation?: ResourceBodyReadOperation;
  }
  export interface ResourceBodyReadOperation {
    status?: string;
    state?: string;
    message?: string;
  }
  export interface ResourceBodyFeatures extends ResourceBodyRequired, ResourceBodyReadFeatures {}
  export interface ResourceBody extends ResourceBodyRequired, ResourceBodyReadSource {}
  export interface Resource extends ResourceBodyFeatures, Timed {
    id?: string;
    product?: ResolvedProduct;
    plan?: ResolvedPlan;
    region?: ResolvedRegion;
    project?: ResolvedProject;
    estimated_cost?: Price;
    metadata?: Metadata;
    annotations?: AnnotationsMap;
  }
  export interface ResolvedValueProp {
    // Heading of a value proposition.
    header: string;
    // Body of a value proposition.
    body: string;
  }
  export interface ResolvedRegion {
    id?: string;
    name?: string;
  }
  export interface ResolvedProvider {
    id?: string;
    name?: string;
    label?: string;
  }
  export interface ResolvedProject {
    id?: string;
    name?: string;
    label?: string;
  }
  export interface ResolvedProduct extends CatalogProductBody {
    id?: string;
    provider?: ResolvedProvider;
    plans?: ResolvedPlan[];
    // An array of marketing labels for the product listing, generated from the product details.
    listing_labels?: string[];
  }
  export interface ResolvedPlan extends CatalogExpandedPlanBody {
    id?: string;
  }
  export interface ResolvedFeature {
    label: string;
    name: string;
    measured?: boolean;
    type: 'boolean' | 'string' | 'number';
    value: ResolvedFeatureValue;
  }
  export interface ResolvedFeatureValue {
    value?: boolean | string | number;
    displayValue?: string;
    // Applied to the end of the number for display, for example the ‘GB’ in ‘20 GB’.
    suffix?: string;
    price?: ResolvedFeatureValuePrice;
  }
  export interface ResolvedFeatureValuePrice {
    cost?: number;
    multiply_factor: number;
    formula: string;
  }
  export interface Price {
    cost: number;
    currency: string;
  }
  export interface PlanCostRequest {
    features: FeatureMap;
  }
  export interface Owner {
    id: string;
    type: 'team' | 'user';
    name?: string;
  }
  export interface MetadataValue {
    type?: 'int' | 'float' | 'bool' | 'string' | 'object';
    value?: object;
  }
  export interface Metadata {
    [name: string]: any;
  }
  export interface FeatureMap {
    [name: string]: any;
  }
  export interface Error {
    // An opaque identifier for this error occurance
    id: string;
    // The error type
    type: 'error';
    // A machine readable string representing the HTTP status code for this error
    code:
      | 'bad_request'
      | 'not_found'
      | 'unauthorized'
      | 'forbidden'
      | 'conflict'
      | 'unprocessable_entity'
      | 'internal'
      | 'not_implemented'
      | 'methods_not_allowed';
    // A machine readable string representing the details error subclass. Valid values are based
    // on the value of the code, and the request being made.
    class: 'validation' | 'internal' | 'insufficient_priviledges';
    // A human readable description of the error, suitable for UI display
    message: string;
  }
  export interface CatalogProductBody {
    provider_id: string;
    // Product labels are globally unique and contain the provider name.
    label: string;
    name: string;
    state: 'available' | 'hidden' | 'grandfathered' | 'new' | 'upcoming';
    listing: CatalogProductBodyListing;
    // Logo used for Provider and Product listings.
    //
    // Must be square (same width and height) and minimum 400px. Maximum of 800px.
    logo_url: string;
    // 140 character sentence positioning the product.
    tagline: string;
    // A list of value propositions of the product.
    value_props: CatalogProductBodyValue_props[];
    images: string[];
    support_email: string;
    documentation_url: string;
    // URL to this Product's Terms of Service. If provided is true, then
    // a url must be set. Otherwise, provided is false.
    terms: CatalogProductBodyTerms;
    feature_types: CatalogFeatureType[];
    billing: CatalogProductBodyBilling;
    integration: CatalogProductBodyIntegration;
    // List of tags for product categorization and search
    tags?: string[];
  }
  export interface CatalogProductBodyIntegration {
    // Provider Only, implies that the product should only be provisionable by the
    //   provider; so members of the provider team, no one else should be allowed.
    // Pre-Order, should not be used yet. But in the future it should allow people to
    //   pre-provision a resource for when it does go live.
    // Public, means the resource is live and everyone should be able to provision it.
    provisioning: 'provider-only' | 'pre-order' | 'public';
    base_url: string;
    sso_url?: string;
    version: 'v1';
    features: CatalogProductBodyIntegrationFeatures;
  }
  export interface CatalogProductBodyIntegrationFeatures {
    // Indicates whether or not this product supports resource transitions to
    // manifold by access_code.
    access_code?: boolean;
    // Represents whether or not this product supports Single
    // Sign On
    sso?: boolean;
    // Represents whether or not this product supports changing
    // the plan of a resource.
    plan_change?: boolean;
    // Describes how the region for a resource is specified, if
    // unspecified, then regions have no impact on this
    // resource.
    region?: 'user-specified' | 'unspecified';
  }
  export interface CatalogProductBodyBilling {
    type: 'monthly-prorated';
    currency: 'usd';
  }
  export interface CatalogProductBodyTerms {
    url: string;
    provided: boolean;
  }
  export interface CatalogProductBodyValue_props {
    // Heading of a value proposition.
    header: string;
    // Body of a value proposition.
    body: string;
  }
  export interface CatalogProductBodyListing {
    // When true, everyone can see the product when requested. When false it will
    // not be visible to anyone except those on the provider team.
    public?: boolean;
    // When true, the product will be displayed in product listings alongside
    // other products. When false the product will be excluded from listings,
    // but can still be provisioned directly if it's label is known.
    // Any pages that display information about the product when not listed,
    // should indicate to webcrawlers that the content should not be indexed.
    listed?: boolean;
    // Object to hold various flags for marketing purposes only. These are values
    // that need to be stored, but should not affect decision making in code. If
    // we find ourselves in a position where we think they should, we should
    // consider refactoring our listing definition.
    marketing?: CatalogProductBodyListingMarketing;
  }
  export interface CatalogProductBodyListingMarketing {
    // Indicates whether or not the product is in `Beta` and should be
    // advertised as such. This does not have any impact on who can access the
    // product, it is just used to inform consumers through our clients.
    beta?: boolean;
    // Indicates whether or not the product is in `New` and should be
    // advertised as such. This does not have any impact on who can access the
    // product, it is just used to inform consumers through our clients.
    new?: boolean;
    // Indicates whether or not the product is in `New` and should be
    // advertised as such. This does not have any impact on who can access the
    // product, it is just used to inform consumers through our clients.
    featured?: boolean;
  }
  export interface CatalogFeatureValueDetails {
    label: string;
    name: string;
    // The cost that will be added to the monthly plan cost when this value
    // is selected or is default for the plan.
    // Cost is deprecated in favor of the `price.cost` field.
    cost?: number;
    // Price describes the cost of a feature. It should be preferred over
    // the `cost` property.
    price?: CatalogFeatureValueDetailsPrice;
    numeric_details?: CatalogFeatureNumericDetails;
  }
  export interface CatalogFeatureValueDetailsPrice {
    // Cost is the price in cents that will be added to plan's base cost
    // when this value is selected or is default for the plan.
    // Number features should use the cost range instead.
    cost?: number;
    // When a feature is used to multiply the cost of the plan or of
    // another feature, multiply factor is used for calculation.
    // A feature cannot have both a cost and a multiply factor.
    multiply_factor?: number;
    // Price describes how the feature cost should be calculated.
    formula?: string;
    // Description explains how a feature is calculated to the user.
    description?: string;
  }
  export interface CatalogFeatureValue {
    feature: string;
    value: string;
  }
  export interface CatalogFeatureType {
    label: string;
    name: string;
    type: 'boolean' | 'string' | 'number';
    // This sets whether or not the feature can be customized by a consumer.
    customizable?: boolean;
    // This sets whether or not the feature can be upgraded by the consumer after the
    // resource has provisioned. Upgrading means setting a higher value or selecting a
    // higher element in the list.
    upgradable?: boolean;
    // This sets whether or not the feature can be downgraded by the consumer after the
    // resource has provisioned. Downgrading means setting a lower value or selecting a
    // lower element in the list.
    downgradable?: boolean;
    // Sets if this feature’s value is trackable from the provider,
    // this only really affects numeric constraints.
    measurable?: boolean;
    values?: CatalogFeatureValueDetails[];
  }
  export interface CatalogFeatureNumericRange {
    // Defines the end of the range ( inclusive ), from the previous, or 0;
    // where the cost_multiple starts taking effect. If set to -1 this defines the
    // range to infinity, or the maximum integer the system can handle
    // ( whichever comes first ).
    limit?: number;
    // An integer in 10,000,000ths of cents, will be multiplied by the
    // numeric value set in the feature to determine the cost.
    cost_multiple?: number;
  }
  export interface CatalogFeatureNumericDetails {
    // Sets the increment at which numbers can be selected if customizable, by
    // default this is 1; for example, setting this to 8 would only allow integers
    // in increments of 8 ( 0, 8, 16, ... ). This property is not used if the
    // feature is measurable; except if it is set to 0, setting the increment to 0
    // means this numeric details has no scale, and will not be or customizable.
    // Some plans may not have a measureable or customizable feature.
    increment?: number;
    // Minimum value that can be set by a user if customizable
    min?: number;
    // Maximum value that can be set by a user if customizable
    max?: number;
    // Applied to the end of the number for display, for example the ‘GB’ in ‘20 GB’.
    suffix?: string;
    cost_ranges?: CatalogFeatureNumericRange[];
  }
  export interface CatalogExpandedPlanBody {
    name: string;
    label: string;
    state: string;
    // Array of Feature Values
    features: CatalogFeatureValue[];
    // Dollar value in cents.
    cost: number;
    // An array of feature definitions for the plan, as defined on the Product.
    expanded_features: CatalogExpandedFeature[];
    // A boolean flag that indicates if a plan is free or not based on it's cost and features.
    free: boolean;
    // Plan cost using its default features plus base cost.
    defaultCost?: number;
    // A boolean flag that indicates if a plan has customizable features.
    customizable?: boolean;
  }
  export interface CatalogExpandedFeature extends CatalogFeatureType {
    // The string value set for the feature on the plan, this should only be used if the value property is null.
    value_string?: string;
    value?: CatalogFeatureValueDetails;
  }
  export interface AnnotationsMap {
    [name: string]: any;
  }
}
