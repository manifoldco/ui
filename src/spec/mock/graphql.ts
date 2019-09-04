import { Product, ProductState, Provider, Plan, PlanState } from '../../types/graphql';
import {
  Product as prodMock,
  Provider as provMock,
  ExpandedPlan,
  ExpandedFreePlan,
} from './catalog';

export const provider: Provider = {
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
        // Ignoring the "block variable used before declaration"
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
  // Ignoring the "block variable used before declaration"
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

export const plan: Plan = {
  __typename: 'Plan',
  id: ExpandedPlan.id,
  displayName: ExpandedPlan.body.name,
  label: ExpandedPlan.body.label,
  state: ExpandedPlan.body.state as PlanState,
  // Ignroeing the "block vabiable used before decalaration"
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
  integration: {
    __typename: 'ProductIntegration',
    baseUrl: prodMock.body.integration.base_url,
    ssoUrl: prodMock.body.integration.sso_url as string,
  },
  provider,
  plans: {
    __typename: 'PlanConnection',
    edges: [
      {
        __typename: 'PlanEdge',
        node: freePlan,
        cursor: '',
      },
      {
        __typename: 'PlanEdge',
        node: plan,
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
