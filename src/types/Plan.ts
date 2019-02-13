interface PlanFeature {
  name: string;
  label: string;
}

export interface Plan {
  body: {
    name: string;
    label: string;
    expanded_features: PlanFeature[];
  };
  id: string;
}
