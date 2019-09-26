import {
  Product,
  ProductState,
  Provider,
  Plan,
  PlanState,
  Resource,
  ResourceStatusLabel,
} from '../../types/graphql';
import {
  Product as prodMock,
  Provider as provMock,
  ExpandedPlan,
  ExpandedFreePlan,
} from './catalog';

export const product: Product = {
  __typename: 'Product',
  id: prodMock.id,
  displayName: prodMock.body.name,
  label: prodMock.body.label,
  logoUrl: prodMock.body.logo_url,
  state: prodMock.body.state as ProductState,
  tagline: prodMock.body.tagline,
  supportEmail: prodMock.body.support_email,
  documentationUrl: prodMock.body.documentation_url,
  termsUrl: prodMock.body.terms.provided && prodMock.body.terms.url ? prodMock.body.terms.url : '',
  categories: prodMock.body.tags
    ? prodMock.body.tags.map(tag => ({
        __typename: 'Category',
        label: tag,
        products: {
          __typename: 'ProductConnection',
          edges: [],
          pageInfo: {
            __typename: 'PageInfo',
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      }))
    : [],
  screenshots: prodMock.body.images.map((image, index) => ({
    __typename: 'ProductScreenshot',
    order: index,
    url: image,
  })),
  valueProps: prodMock.body.value_props.map(valueProp => ({
    __typename: 'ValueProp',
    body: valueProp.body,
    header: valueProp.header,
  })),
  valuePropsHtml: '',
  setupStepsHtml: '',
  plans: {
    edges: [
      {
        cursor: '',
        node: {
          id: ExpandedFreePlan.id,
          displayName: ExpandedFreePlan.body.name,
          label: ExpandedFreePlan.body.label,
          state: ExpandedFreePlan.body.state as PlanState,
          cost: ExpandedFreePlan.body.cost,
          free: true,
        },
      },
      {
        cursor: '',
        node: {
          id: ExpandedPlan.id,
          displayName: ExpandedPlan.body.name,
          label: ExpandedPlan.body.label,
          state: ExpandedPlan.body.state as PlanState,
          cost: ExpandedPlan.body.cost,
          free: false,
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  provider: {
    id: provMock.id,
    displayName: provMock.body.name,
    label: provMock.body.label,
    supportEmail: provMock.body.support_email as string,
    logoUrl: provMock.body.logo_url as string,
    url: provMock.body.documentation_url as string,
  },
};

const provider: Provider = {
  __typename: 'Provider',
  id: provMock.id,
  displayName: provMock.body.name,
  label: provMock.body.label,
  supportEmail: provMock.body.support_email as string,
  logoUrl: provMock.body.logo_url as string,
  url: provMock.body.documentation_url as string,
  products: {
    __typename: 'ProductConnection',
    edges: [
      {
        __typename: 'ProductEdge',
        node: product,
        cursor: '',
      },
    ],
    pageInfo: {
      __typename: 'PageInfo',
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

export const freePlan: Plan = {
  __typename: 'Plan',
  id: ExpandedFreePlan.id,
  displayName: ExpandedFreePlan.body.name,
  label: ExpandedFreePlan.body.label,
  state: ExpandedFreePlan.body.state as PlanState,
  product,
  cost: ExpandedFreePlan.body.cost,
  free: true,
  fixedFeatures: {
    __typename: 'PlanFixedFeatureConnection',
    edges: ExpandedFreePlan.body.expanded_features
      .filter(feature => !feature.measurable && !feature.customizable)
      .map(feature => ({
        __typename: 'PlanFixedFeatureEdge',
        cursor: '',
        node: {
          __typename: 'PlanFixedFeature',
          displayName: feature.name,
          displayValue: feature.value_string as string,
          label: feature.label,
          id: feature.label,
        },
      })),
    pageInfo: {
      __typename: 'PageInfo',
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  meteredFeatures: {
    __typename: 'PlanMeteredFeatureConnection',
    edges: ExpandedFreePlan.body.expanded_features
      .filter(feature => feature.measurable)
      .map(feature => ({
        __typename: 'PlanMeteredFeatureEdge',
        cursor: '',
        node: {
          __typename: 'PlanMeteredFeature',
          displayName: feature.name,
          label: feature.label,
          id: feature.label,
          displayValue: feature.value_string as string,
          numericDetails: {
            __typename: 'PlanMeteredFeatureNumericDetails',
            unit: feature.value.numeric_details
              ? (feature.value.numeric_details.suffix as string)
              : '',
            costTiers:
              feature.value.numeric_details && feature.value.numeric_details.cost_ranges
                ? feature.value.numeric_details.cost_ranges.map(range => ({
                    __typename: 'PlanFeatureCostTier',
                    limit: range.limit as number,
                    cost: range.cost_multiple as number,
                  }))
                : [],
          },
        },
      })),
    pageInfo: {
      __typename: 'PageInfo',
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

export const plan = {
  __typename: 'Plan',
  id: ExpandedPlan.id,
  displayName: ExpandedPlan.body.name,
  label: ExpandedPlan.body.label,
  state: ExpandedPlan.body.state as PlanState,
  product,
  cost: ExpandedPlan.body.cost,
  free: false,
  fixedFeatures: {
    __typename: 'PlanFixedFeatureConnection',
    edges: ExpandedPlan.body.expanded_features
      .filter(feature => !feature.measurable && !feature.customizable)
      .map(feature => ({
        __typename: 'PlanFixedFeatureEdge',
        cursor: '',
        node: {
          __typename: 'PlanFixedFeature',
          displayName: feature.name,
          displayValue: feature.value_string as string,
          label: feature.label,
          id: feature.label,
        },
      })),
    pageInfo: {
      __typename: 'PageInfo',
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  meteredFeatures: {
    __typename: 'PlanMeteredFeatureConnection',
    edges: ExpandedPlan.body.expanded_features
      .filter(feature => feature.measurable)
      .map(feature => ({
        __typename: 'PlanMeteredFeatureEdge',
        cursor: '',
        node: {
          __typename: 'PlanMeteredFeature',
          displayName: feature.name,
          label: feature.label,
          displayValue: feature.value_string as string,
          id: feature.label,
          numericDetails: {
            __typename: 'PlanMeteredFeatureNumericDetails',
            unit: feature.value.numeric_details
              ? (feature.value.numeric_details.suffix as string)
              : '',
            costTiers:
              feature.value.numeric_details && feature.value.numeric_details.cost_ranges
                ? feature.value.numeric_details.cost_ranges.map(range => ({
                    __typename: 'PlanFeatureCostTier',
                    limit: range.limit as number,
                    cost: range.cost_multiple as number,
                  }))
                : [],
          },
        },
      })),
    pageInfo: {
      __typename: 'PageInfo',
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

// prevent circular deps
export const resource: Resource = {
  displayName: 'my-resource',
  id: '26841468fmyhcn3h69ednm65knx44',
  label: 'my-resource',
  ssoSupported: true,
  ssoUrl: '',
  status: {
    label: ResourceStatusLabel.Available,
    message: '',
    percentDone: 100,
  },
  plan: {
    cost: 0,
    displayName: 'Free',
    free: true,
    id: '235abe2ba8b39e941u2h70ayw5m9j',
    label: 'free',
    state: PlanState.Available,
  },
};
