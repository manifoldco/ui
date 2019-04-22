namespace Marketplace {
  export interface UpdateCredential {
    body: UpdateCredentialBody;
  }
  export interface UpdateCredentialBody {
    // Map of configuration variable names to aliases
    custom_names?: object;
  }
  export interface ResourceBody {
    name: string;
    label: string;
    owner_id?: string;
    product_id?: string;
    plan_id?: string;
    region_id?: string;
    project_id?: string;
    features: FeatureMap;
    annotations?: AnnotationsMap;
    metadata?: Metadata;
    source: 'catalog' | 'custom';
    created_at: string;
    updated_at: string;
  }
  export interface Resource {
    id: string;
    type: 'resource';
    version: 1;
    body: ResourceBody;
  }
  export interface PublicUpdateResource {
    body: PublicUpdateResourceBody;
  }
  export interface PublicUpdateResourceBody {
    name?: string;
    label?: string;
    annotations?: AnnotationsMap;
  }
  export interface PublicUpdateProject {
    body: PublicUpdateProjectBody;
  }
  export interface PublicUpdateProjectBody {
    name?: string;
    label?: string;
    description?: string;
  }
  export interface PublicResourceBody extends ResourceBody {
    user_id?: string;
    team_id?: string;
  }
  export interface PublicResource {
    id: string;
    type: 'resource';
    version: 1;
    body: PublicResourceBody;
  }
  export interface Project {
    id: string;
    type: 'project';
    version: 1;
    body: ProjectBody;
  }
  export interface ProjectBody {
    user_id?: string;
    team_id?: string;
    name: string;
    label: string;
    description?: string;
  }
  export interface PatchCredential {
    body: PatchCredentialBody;
  }
  export interface PatchCredentialBody {
    // Map of configuration variable names to values, names
    // must IEEE 1003.1 - 2001 Standard (checked in code).
    value?: object;
  }
  export interface MetadataValue {
    type?: 'int' | 'float' | 'bool' | 'string' | 'object';
    value?: object;
  }
  export interface Metadata {
    [name: string]: any;
  }
  export interface InternalUpdateResource {
    body: InternalUpdateResourceBody;
  }
  export interface InternalUpdateResourceBody {
    plan_id?: string;
    project_id?: string;
    owner_id?: string;
    features?: FeatureMap;
  }
  export interface InternalGetResources {
    product_ids?: string[];
    owner_id?: string;
  }
  export interface FeatureMap {
    [name: string]: any;
  }
  export interface Error {
    // The error type
    type?:
      | 'bad_request'
      | 'not_found'
      | 'unauthorized'
      | 'conflict'
      | 'internal';
    // Explanation of the errors
    message?: string[];
  }
  export interface Credential {
    id: string;
    type: 'credential';
    version: 1;
    body: CredentialBody;
  }
  export interface CredentialBody {
    resource_id: string;
    // Map of configuration variable aliases to original names
    custom_names?: object;
    // Map of configuration variable names to values, names
    // must IEEE 1003.1 - 2001 Standard (checked in code).
    values: object;
    source: 'catalog' | 'custom';
    created_at: string;
    updated_at: string;
  }
  export interface CreateProject {
    body: CreateProjectBody;
  }
  export interface CreateProjectBody {
    user_id?: string;
    team_id?: string;
    name: string;
    label: string;
    description?: string;
  }
  export interface CreateCredential {
    id: string;
    type: 'credential';
    version: 1;
    body: CreateCredentialBody;
  }
  export interface CreateCredentialBody {
    resource_id: string;
    // Map of configuration variable names to values, names
    // must IEEE 1003.1 - 2001 Standard (checked in code).
    values: object;
  }
  export interface ConfigPatch {
    [name: string]: any;
  }
  export interface AnnotationsMap {
    [name: string]: any;
  }
}
