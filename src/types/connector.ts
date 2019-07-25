export namespace Connector {
  export interface Team {
    id?: string;
    label?: string;
    name?: string;
    user_role?: string;
    projects?: Project[];
    resources?: Resource[];
  }
  export interface ResourceMeasuresUsage {
    updated_at?: string;
    period_start?: string;
    period_end?: string;
    measures?: ResourceMeasure[];
  }
  export interface ResourceMeasuresBody {
    resource_id: string;
    period_start: string;
    period_end: string;
    measures: object;
  }
  export interface ResourceMeasures {
    body: ResourceMeasuresBody;
  }
  export interface ResourceMeasure {
    feature: ResourceMeasureFeature;
    feature_value: ResourceMeasureFeatureValue;
    usage: number;
    max?: number;
    suffix?: string;
  }
  export interface ResourceMeasureFeatureValue {
    // A machine readable unique label, which is url safe.
    label?: string;
    name?: string;
  }
  export interface ResourceMeasureFeature {
    label?: string;
    name?: string;
  }
  export interface ResourceCredentials {
    // Map of configuration variable aliases to original names
    custom_names?: object;
    // Map of configuration variable names to values, names
    // must IEEE 1003.1 - 2001 Standard (checked in code).
    keys: object;
    created_on: string;
  }
  export interface Resource {
    id?: string;
    product?: string;
    plan?: string;
    region?: string;
    features?: FeatureMap;
    // This field is deprecated in favor of label
    name?: string;
    label?: string;
    created_at?: string;
    updated_at?: string;
  }
  export interface Project {
    id?: string;
    label?: string;
    name?: string;
    description?: string;
    resources?: Resource[];
  }
  export interface Profile {
    id?: string;
    name: string;
    email: string;
    role?: string;
  }
  export interface OAuthError {
    // The error type
    error:
      | 'invalid_request'
      | 'invalid_client'
      | 'invalid_grant'
      | 'unauthorized_client'
      | 'unsupported_grant_type'
      | 'invalid_scope'
      | 'access_denied';
    // Explanation of the error
    error_description?: string;
  }
  export interface OAuthCredentialCreateRequest {
    // Product identifier to scope the credential to a single product.
    product_id?: string;
    // **ALPHA** Provider identifier to scope the credential to
    // all products of a provider.
    provider_id?: string;
    // A human readable description of this credential pair.
    description: string;
  }
  export interface Identity {
    type: 'user' | 'product' | 'provider';
  }
  export interface FeatureMap {
    [name: string]: any;
  }
  export interface Error {
    // The error type
    type?:
      | 'bad_request'
      | 'unauthorized'
      | 'not_found'
      | 'method_not_allowed'
      | 'internal'
      | 'invalid_grant'
      | 'unsupported_grant_type';
    // Explanation of the errors
    message?: string[];
  }
  export interface CredentialRotationRequest {
    resource_id: string;
    credential_id: string;
    reason: string;
  }
  export interface client_credentials extends AccessTokenRequest {}
  export interface CallbackResponse {
    state: 'done' | 'error';
    message: string;
    credentials?: object;
  }
  export interface AuthorizationCode {
    id: string;
    version: '1';
    type: 'authorization_code';
    body: AuthorizationCodeBody;
  }
  export interface AuthorizationCodeBody {
    user_id: string;
    team_id?: string;
    resource_id: string;
    created_at: string;
    expires_at: string;
    code: string;
    redirect_uri: string;
  }
  export interface authorization_code extends AccessTokenRequest {
    code?: string;
  }
  export interface AuthCodeRequest {
    body: AuthCodeRequestBody;
  }
  export interface AuthCodeRequestBody {
    resource_id: string;
  }
  export interface AccessTokenRequest {
    grant_type: 'authorization_code' | 'client_credentials';
    client_id?: string;
    client_secret?: string;
  }
  export interface AccessToken {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
  }
}
