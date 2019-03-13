export interface ExpandedFeature {
  name: string;
  label: string;
  measurable: boolean;
  type: 'boolean' | 'number' | 'string';
  value: any;
  value_string: string;
  values: any[];
  customizable?: boolean;
}

export interface Feature {
  feature: string;
  value: string;
}

export interface Plan {
  body: {
    cost: number;
    free: boolean;
    customizable?: boolean;
    name: string;
    label: string;
    features: Feature[];
    expanded_features: ExpandedFeature[];
  };
  id: string;
}
