export namespace Provisioning {
  export interface transfer extends OperationBody {
    resource_id?: string;
    // State must be specified as creating on a PUT operation
    state?: 'transfer' | 'billing' | 'commit' | 'error' | 'done';
    new_owner_id?: string;
  }
  export interface resize extends OperationBody {
    resource_id?: string;
    // State must be specified as resize on a PUT operation
    state?: 'resize' | 'billing' | 'commit' | 'error' | 'done';
    plan_id?: string;
    features?: FeatureMap;
  }
  export interface provision extends OperationBody {
    resource_id?: string;
    // State must be specified as creating on a PUT operation
    state?: 'provision' | 'binding' | 'billing' | 'commit' | 'error' | 'done';
    product_id?: string;
    plan_id?: string;
    region_id?: string;
    project_id?: string;
    name?: string;
    label?: string;
    // The source of the resource to be created. If not provided,
    // `marketplace` is assumed. Resources of type `custom` must omit
    // the `product_id`, `plan_id`, `region_id`, and `features`, fields.
    // They must be included for `catalog` resources.
    source?: 'catalog' | 'custom';
    features?: FeatureMap;
    annotations?: AnnotationsMap;
    metadata?: Metadata;
  }
  export interface project_delete extends OperationBody {
    // The the project to delete.
    project_id?: string;
    // State must be specified as delete on a PUT operation
    state?: 'delete' | 'commit' | 'error' | 'done';
  }
  export interface OperationBody {
    // Type of operation this object represents
    type: string;
    // User owning the operation, cannot be supplied if team_id defined
    user_id?: string;
    // Team owning the operation, cannot be supplied if user_id defined
    team_id?: string;
    // A message associated with the operation to display to the user.
    message: string;
    // A date time string representing the time the operation was created.
    created_at: string;
    // A date time string representing the time the operation was last updated.
    updated_at: string;
  }
  export interface Operation {
    id: string;
    type: 'operation';
    version: 1;
    body: OperationBody;
  }
  export interface move extends OperationBody {
    resource_id?: string;
    // State must be specified as move on a PUT operation
    state?: 'move' | 'commit' | 'error' | 'done';
    // The new project for this resource. If `null`, remove
    // any existing project from this resource.
    project_id?: string;
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
    // The error type
    type?: 'bad_request' | 'unauthorized' | 'not_found' | 'conflict' | 'internal';
    // Explanation of the errors
    message?: string[];
  }
  export interface deprovision extends OperationBody {
    resource_id?: string;
    // State must be specified as deprovision on a PUT operation.
    state?: 'deprovision' | 'billing' | 'commit' | 'error' | 'done';
  }
  export interface CallbackResponse {
    state: 'done' | 'error';
    message: string;
    credentials?: object;
  }
  export interface Callback {
    id?: string;
    type?: 'callback';
    version?: 1;
    body?: CallbackBody;
  }
  export interface CallbackBody {
    operation_id?: string;
    payload?: CallbackResponse;
  }
  export interface AnnotationsMap {
    [name: string]: any;
  }
}
