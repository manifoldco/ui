namespace Billing {
  export interface UpdateCoupon {
    body: UpdateCouponBody;
  }
  export interface UpdateCouponBody {
    code?: string;
    active?: boolean;
    // Dollar value in cents
    amount?: number;
    // Expiry datetime for this coupon. If omitted, the coupon does not
    // expire.
    expires_at?: string;
  }
  export interface SubscriptionEventBody {
    event_type: string;
    event_number: number;
    parent_event?: string;
    operation_id: string;
    occurred_at: string;
    user_id?: string;
    team_id?: string;
    provider_id?: string;
    resource_id?: string;
    rollover_id?: string;
  }
  export interface SubscriptionEvent {
    id?: string;
    version?: 1;
    type?: 'subscription_event';
    body?: SubscriptionEventBody;
    signature?: SubscriptionEventSignature;
  }
  export interface SubscriptionEventSignature {
    alg?: 'eddsa';
    value?: string;
    public_key?: string;
    endorsement?: string;
  }
  export interface StripeLegalEntity {}
  export interface StripeAccount {
    email: string;
    business_name: string;
    country: string;
  }
  export interface Source {
    name: string;
    country: string;
    zip?: string;
    last_four: string;
    exp_month: number;
    exp_year: number;
    brand?:
      | 'Unknown'
      | 'Visa'
      | 'American Express'
      | 'MasterCard'
      | 'Discover'
      | 'JCB'
      | 'Diners Club';
  }
  export interface ResourceMeasuresUsage {
    updated_at?: string;
    period_start?: string;
    period_end?: string;
    measures?: ResourceMeasure[];
  }
  export interface ResourceMeasuresBody {
    resource_id: string;
    updated_at: string;
    period_start: string;
    period_end: string;
    measures: object;
  }
  export interface ResourceMeasures {
    id?: string;
    version?: 1;
    type?: 'resource_measures';
    body?: ResourceMeasuresBody;
    signature?: ResourceMeasuresSignature;
  }
  export interface ResourceMeasuresSignature {
    alg?: 'eddsa';
    value?: string;
    public_key?: string;
    endorsement?: string;
  }
  export interface ResourceMeasure {
    feature: ResourceMeasureFeature;
    feature_value: ResourceMeasureFeature_value;
    usage: number;
    max?: number;
    suffix?: string;
  }
  export interface ResourceMeasureFeature_value {
    label?: string;
    name?: string;
  }
  export interface ResourceMeasureFeature {
    label?: string;
    name?: string;
  }
  export interface QueJob {
    priority: number;
    run_at: string;
    job_id: number;
    job_class: string;
    args?: object;
    error_count?: number;
    last_error?: string;
    queue?: string;
  }
  export interface ProviderSubAdjustment {
    // Month for which the Payout to adjust is for
    month?: number;
    // Year for which they payout to adjust is for
    year?: number;
    user_id?: string;
    resource_id?: string;
  }
  export interface ProfileUpdateRequest {
    // Tokenized source of funds
    token: string;
  }
  export interface ProfileCreateRequest {
    user_id?: string;
    team_id?: string;
    // Tokenized source of funds
    token: string;
  }
  export interface PricingRequest {
    plan_id: string;
    features: FeatureMap;
  }
  export interface Price {
    cost: number;
    currency: string;
  }
  export interface PlanDetails {
    id?: string;
    billing_type?: string;
    cost?: number;
    currency?: string;
    label?: string;
    name?: string;
    product_id?: string;
    product_label?: string;
    trial_seconds?: number;
  }
  export interface PayoutResendRequest {
    payout_id: string;
    emails?: string[];
  }
  export interface PayoutProfileCreateRequest {
    // Tokenized destination of funds
    token: string;
    provider_id: string;
    account: StripeAccount;
    legal_entity: StripeLegalEntity;
  }
  export interface PayoutProfile {
    id: string;
    version: 1;
    type: 'payout_profile';
    body: PayoutProfileBody;
  }
  export interface PayoutProfileBody {
    provider_id: string;
    account_id: string;
    account: StripeAccount;
    legal_entity: StripeLegalEntity;
  }
  export interface PayoutLineItemBody {
    provider_id?: string;
    product_id?: string;
    plan_id?: string;
    gross?: number;
    payout?: number;
    estimate_payout?: number;
    fee?: number;
    estimate_fee?: number;
    currency?: string;
    plan?: PlanDetails;
    start_at?: string;
    end_at?: string;
  }
  export interface PayoutLineItem {
    id?: string;
    version?: 1;
    type?: 'invoice';
    body?: PayoutLineItemBody;
  }
  export interface PayoutBody {
    provider_id?: string;
    product_id?: string;
    plan_id?: string;
    line_items?: PayoutLineItem[];
  }
  export interface PayoutAdjustmentRequest {
    // Dollar value of credit in cents
    amount?: number;
    // Month for which the Payout to adjust is for
    month?: number;
    // Year for which they payout to adjust is for
    year?: number;
    currency?: string;
    reason: string;
  }
  export interface Payout {
    id?: string;
    version?: 1;
    type?: 'payout';
    body?: PayoutBody;
    signature?: PayoutSignature;
  }
  export interface PayoutSignature {
    alg?: 'eddsa';
    value?: string;
    public_key?: string;
    endorsement?: string;
  }
  export interface InvoiceResendRequest {
    invoice_id?: string;
    team_id?: string;
  }
  export interface InvoiceLineItemBody {
    resource_id?: string;
    period_start?: string;
    period_end?: string;
    due?: number;
    currency?: string;
    plan?: PlanDetails;
    start_at?: string;
    start_event?: SubscriptionEvent;
    end_at?: string;
    end_event?: SubscriptionEvent;
  }
  export interface InvoiceLineItem {
    id?: string;
    version?: 1;
    type?: 'invoice';
    body?: InvoiceLineItemBody;
  }
  export interface InvoiceEventCreate {
    // The event type
    type: 'waive';
    reason: string;
  }
  export interface InvoiceBody {
    start_event?: SubscriptionEvent;
    end_event?: SubscriptionEvent;
    user_id?: string;
    team_id?: string;
    line_items?: InvoiceLineItem[];
  }
  export interface Invoice {
    id?: string;
    version?: 1;
    type?: 'invoice';
    body?: InvoiceBody;
    signature?: InvoiceSignature;
  }
  export interface InvoiceSignature {
    alg?: 'eddsa';
    value?: string;
    public_key?: string;
    endorsement?: string;
  }
  export interface FeatureValue {
    // Feature is equivalent to a product feature label
    feature?: string;
    type?: 'number';
    // Value is equivalent to a plan feature value label
    value?: string;
    min?: number;
    // If a product has multiple possible value of a feature, one can be defined as
    // default for the plan.
    default?: boolean;
    // Cost ranges must have valid integers as keys and values.
    // Each key indicates the max of the range for which the value cost is in effect.
    // -1 as a key is equivalent to no upper limit for the range.
    // Values are in 10,000,000 ths of cents.
    cost_ranges?: object;
  }
  export interface FeatureMap {
    [name: string]: any;
  }
  export interface Error {
    // The error type
    type?:
      | 'bad_request'
      | 'forbidden'
      | 'unauthorized'
      | 'not_found'
      | 'internal';
    // Explanation of the errors
    message?: string[];
  }
  export interface DiscountCreateRequest {
    code: string;
    team_id?: string;
  }
  export interface credit extends SubscriptionEventBody {
    // Dollar value of credit in cents
    amount?: number;
    currency?: 'usd';
    reason?: string;
    coupon_id?: string;
    code?: string;
  }
  export interface Coupon {
    id: string;
    version: 1;
    type: 'payout_profile';
    body: CouponBody;
  }
  export interface CouponBody {
    type: 'standard' | 'signup';
    code: string;
    active: boolean;
    // Dollar value in cents
    amount?: number;
    // Total claimed codes for this coupon.
    claimed: number;
    // Expiry datetime for this coupon. If omitted, the coupon does not
    // expire.
    expires_at?: string;
    // Total claimable codes for this coupon. If omitted, there are infinite
    // coupons.
    total?: number;
  }
  export interface BillingSubTransfer {
    new_owner_id: string;
    operation_id: string;
    occurred_at: string;
    features?: FeatureMap;
  }
  export interface BillingSubDelete {
    operation_id: string;
    occurred_at: string;
  }
  export interface BillingSubCreate {
    source: 'catalog' | 'partner';
    // plan_id is required if source is catalog
    plan_id?: string;
    // details is required if source isn't catalog
    details?: BillingDetails;
    operation_id: string;
    occurred_at: string;
    features?: FeatureMap;
  }
  export interface BillingSubAdjustment {
    // Dollar value of credit in cents
    amount?: number;
    currency?: string;
    reason: string;
    resource_id?: string;
    provider_id?: string;
  }
  export interface BillingProfile {
    id: string;
    version: 1;
    type: 'billing_profile';
    body: BillingProfileBody;
  }
  export interface BillingProfileBody {
    user_id?: string;
    team_id?: string;
    owner_id?: string;
    sources: Source[];
    status?: string;
  }
  export interface BillingDetails {
    partner_id: string;
    plan: BillingDetailsPlan;
    product: BillingDetailsProduct;
    feature_values?: FeatureValue[];
  }
  export interface BillingDetailsProduct {
    id: string;
    label: string;
    name: string;
    currency: string;
    billing_type: string;
  }
  export interface BillingDetailsPlan {
    id: string;
    label: string;
    name: string;
    cost: number;
  }
  export interface BillingCreditCreate {
    provider_id?: string;
    resource_id?: string;
    operation_id: string;
    occurred_at: string;
    reason?: string;
    // Dollar value in cents
    amount?: number;
  }
  export interface BillingCouponCreate {
    type: 'standard' | 'signup';
    provider_id?: string;
    // Expiry datetime for this coupon. If omitted, the coupon does not
    // expire.
    expires_at?: string;
    // Total claimable codes for this coupon. If omitted, there are infinite
    // coupons.
    total?: number;
    code: string;
    // Dollar value in cents
    amount: number;
  }
}
