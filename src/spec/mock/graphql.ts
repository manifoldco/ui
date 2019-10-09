import {
  Plan,
  PlanState,
  Product,
  ProductCredentialsSupportType,
  ProductState,
  Provider,
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
  settings: {
    ssoSupported: true,
    credentialsSupport: ProductCredentialsSupportType.Single,
  },
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
    id: '23558gd5kaw5z462e3mvaknj5veuj',
    label: 'quaco',
    displayName: 'Quaco',
    state: PlanState.Available,
    cost: 0,
    free: true,
    regions: {
      pageInfo: {
        startCursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
        endCursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          node: {
            id: '235n4f9pxf8eyraj3y159x89z6jer',
            displayName: 'All Regions',
            platform: 'all',
            dataCenter: 'global',
          },
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
        },
      ],
    },
    product: {
      id: '234qkjvrptpy3thna4qttwt7m2nf6',
      label: 'logdna',
      displayName: 'LogDNA',
      tagline:
        'Real-time log aggregation, monitoring, and analysis from any platform, at any volume',
      state: ProductState.Available,
      logoUrl: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
      supportEmail: 'support@logdna.com',
      documentationUrl: 'https://docs.logdna.com/docs/',
      termsUrl: 'https://logdna.com/terms.html',
      images: [
        'https://cdn.manifold.co/providers/logdna/logdna/images/1ew2g2d9bahjjdvrcyd7k71nwr.png',
        'https://cdn.manifold.co/providers/logdna/logdna/images/4uy1kt8we9nzbnehyzev94117m.png',
        'https://cdn.manifold.co/providers/logdna/logdna/images/nawd3ffc9nwpkw6347b8y8whgw.png',
      ],
      categories: [
        {
          label: 'logging',
          products: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
        },
        {
          label: 'monitoring',
          products: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
        },
      ],
      provider: {
        id: '23409yv8yfy06gt8553wzz5x8k164',
        label: 'logdna',
        displayName: 'LogDNA',
        logoUrl: '',
        url: '',
        supportEmail: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      valueProps: [
        {
          header: 'Aggregate Logs & Analyze Events',
          body:
            'Centralize your logs in one place instead of tailing one file at a time. Aggregate, search & filter from all your hosts and apps. See related events across your infrastructure on one screen.',
        },
        {
          header: 'Powerful Search & Alerts',
          body:
            'With our blazing fast speeds, search like a pro and set up alerts with just a few clicks. Easily send important event notifications through email, Slack, or even a custom webhook.',
        },
        {
          header: 'Easy Setup',
          body:
            'Get up and running in mere minutes! Spend that saved time building your awesome product instead.',
        },
        {
          header: 'Automatic Field Parsing',
          body:
            'Search for specific fields and values automatically picked up from common log formats, such as JSON, Redis, HTTP access logs, and a whole host of others.',
        },
        {
          header: 'Debug & Troubleshoot Faster',
          body:
            'Diagnose issues, chase down server errors and look up customer activity, fast! Use live streaming tail to instantly surface hard-to-find bugs.',
        },
        {
          header: 'Modern User Interface',
          body:
            'Filter, search, live tail, jump back in time, create views and alerts, all from one interface without leaving the page.',
        },
      ],
      valuePropsHtml:
        '<h3>Aggregate Logs &amp; Analyze Events</h3><p>Centralize your logs in one place instead of tailing one file at a time. Aggregate, search &amp; filter from all your hosts and apps. See related events across your infrastructure on one screen.</p><h3>Powerful Search &amp; Alerts</h3><p>With our blazing fast speeds, search like a pro and set up alerts with just a few clicks. Easily send important event notifications through email, Slack, or even a custom webhook.</p><h3>Easy Setup</h3><p>Get up and running in mere minutes! Spend that saved time building your awesome product instead.</p><h3>Automatic Field Parsing</h3><p>Search for specific fields and values automatically picked up from common log formats, such as JSON, Redis, HTTP access logs, and a whole host of others.</p><h3>Debug &amp; Troubleshoot Faster</h3><p>Diagnose issues, chase down server errors and look up customer activity, fast! Use live streaming tail to instantly surface hard-to-find bugs.</p><h3>Modern User Interface</h3><p>Filter, search, live tail, jump back in time, create views and alerts, all from one interface without leaving the page.</p>',
      setupStepsHtml:
        '<ol><li><p><a href="https://docs.logdna.com" rel="nofollow">Select a code library from the LogDNA documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Configure the logger with your API key</p>\n</li><li><p>Start your application</p>\n</li><li><p>Monitor your logs from the LogDNA dashboard</p>\n</li></ol>',
    },
    fixedFeatures: {
      pageInfo: {
        startCursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
        endCursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
          node: {
            id: 'e5up2rvfbxtparbjcdm2uwk5ehjpw',
            label: 'search-retention',
            displayName: 'Search Retention',
            displayValue: '0 Days',
          },
        },
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
          node: {
            id: 'e5up2rvfbxtq8vvjc5kpabbpdxp7a',
            label: 'storage-volume',
            displayName: 'Storage Volume Per Day',
            displayValue: '0 MB',
          },
        },
        {
          cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
          node: {
            id: 'e5up2rvfbxuq6tbjec00000000000',
            label: 'users',
            displayName: 'Users',
            displayValue: '1',
          },
        },
      ],
    },
    meteredFeatures: {
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [],
    },
    configurableFeatures: {
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [],
    },
  },
};
