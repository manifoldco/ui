import { Component, h, Prop, State } from '@stencil/core';
import { Gateway } from '../../types/gateway';
import { PlanState, ProductState, Resource, ResourceStatusLabel } from '../../types/graphql';
import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

const GraphQLResource: Resource = {
  id: '268a3d5z80rq7dau0yv25nyf00jfe',
  label: 'logdna-elaborate-old-moss-green-deltoid',
  displayName: 'logdna-elaborate-old-moss-green-deltoid',
  status: {
    label: ResourceStatusLabel.Available,
    message: '',
    percentDone: 100,
  },
  ssoSupported: true,
  ssoUrl: '',
  owner: null,
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

const ResourceMock: Gateway.Resource = {
  id: '1',
  annotations: { 'manifold.co/projects': ['test-project'] },
  created_at: '2019-04-25T22:11:06.691Z',
  label: 'logdna',
  name: 'logdna',
  source: 'catalog',
  updated_at: '2019-04-25T22:11:06.691Z',
  type: 'resource',
  state: 'available',
  estimated_cost: {
    cost: 5000,
    currency: 'USD',
  },
  features: [],
  owner: {
    type: 'user',
    id: 'manifold.co/user/2',
    name: 'John Doe',
  },
  project: {
    id: '3',
    label: 'test-project',
    name: 'Test project',
  },
  product: {
    billing: { currency: 'usd', type: 'monthly-prorated' },
    documentation_url: 'https://docs.logdna.com/docs/',
    feature_types: [
      {
        label: 'users',
        name: 'Users',
        type: 'string',
        values: [
          { label: 'users-generated-0', name: '1' },
          { label: 'users-generated-3', name: '5' },
          { label: 'users-generated-8', name: '10' },
          { label: 'users-generated-15', name: '25' },
        ],
      },
      {
        label: 'search-retention',
        name: 'Search Retention',
        type: 'string',
        values: [
          { label: 'search-retention-generated-1', name: '0 Days' },
          { label: 'search-retention-generated-4', name: '7 Days' },
          { label: 'search-retention-generated-9', name: '14 Days' },
          { label: 'search-retention-generated-16', name: '30 Days' },
        ],
      },
      {
        label: 'storage-volume',
        name: 'Storage Volume Per Day',
        type: 'string',
        values: [
          { label: 'storage-volume-generated-2', name: '0 MB' },
          { label: 'storage-volume-generated-5', name: '90 MB' },
          { label: 'storage-volume-generated-6', name: '175 MB' },
          { label: 'storage-volume-generated-7', name: '350 MB' },
          { label: 'storage-volume-generated-10', name: '700 MB' },
          { label: 'storage-volume-generated-11', name: '1.5 GB' },
          { label: 'storage-volume-generated-12', name: '3 GB' },
          { label: 'storage-volume-generated-13', name: '5.5 GB' },
          { label: 'storage-volume-generated-14', name: '10 GB' },
          { label: 'storage-volume-generated-17', name: '20 GB' },
        ],
      },
    ],
    images: [
      'https://cdn.manifold.co/providers/logdna/logdna/images/1ew2g2d9bahjjdvrcyd7k71nwr.png',
      'https://cdn.manifold.co/providers/logdna/logdna/images/4uy1kt8we9nzbnehyzev94117m.png',
      'https://cdn.manifold.co/providers/logdna/logdna/images/nawd3ffc9nwpkw6347b8y8whgw.png',
    ],
    integration: {
      base_url: 'https://api.logdna.com/manifold',
      features: {
        access_code: false,
        plan_change: true,
        region: 'unspecified',
        sso: true,
      },
      provisioning: 'public',
      sso_url: 'https://api.logdna.com/manifold',
      version: 'v1',
    },
    label: 'logdna',
    listing: {
      listed: true,
      marketing: { beta: false, featured: false, new: false },
      public: true,
    },
    logo_url: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
    name: 'LogDNA',
    provider_id: '4',
    state: 'available',
    support_email: 'support@logdna.com',
    tagline: 'The best logging service you will ever use',
    tags: ['logging', 'monitoring'],
    terms: { provided: true, url: 'https://logdna.com/terms.html' },
    value_props: [
      {
        body:
          'Centralize your logs in one place instead of tailing one file at a time. Aggregate, search \u0026 filter from all your hosts and apps. See related events across your infrastructure on one screen.',
        header: 'Aggregate Logs \u0026 Analyze Events',
      },
      {
        body:
          'With our blazing fast speeds, search like a pro and set up alerts with just a few clicks. Easily send important event notifications through email, Slack, or even a custom webhook.',
        header: 'Powerful Search \u0026 Alerts',
      },
      {
        body:
          'Get up and running in mere minutes! Spend that saved time building your awesome product instead.',
        header: 'Easy Setup',
      },
      {
        body:
          'Search for specific fields and values automatically picked up from common log formats, such as JSON, Redis, HTTP access logs, and a whole host of others.',
        header: 'Automatic Field Parsing',
      },
      {
        body:
          'Diagnose issues, chase down server errors and look up customer activity, fast! Use live streaming tail to instantly surface hard-to-find bugs.',
        header: 'Debug \u0026 Troubleshoot Faster',
      },
      {
        body:
          'Filter, search, live tail, jump back in time, create views and alerts, all from one interface without leaving the page.',
        header: 'Modern User Interface',
      },
    ],
    id: '5',
    listing_labels: [],
    plans: [
      {
        cost: 0,
        features: [
          { feature: 'users', value: 'users-generated-0' },
          { feature: 'search-retention', value: 'search-retention-generated-1' },
          { feature: 'storage-volume', value: 'storage-volume-generated-2' },
        ],
        label: 'quaco',
        name: 'Quaco',
        state: 'available',
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-0', name: '1' },
            value_string: '1',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-1', name: '0 Days' },
            value_string: '0 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-2', name: '0 MB' },
            value_string: '0 MB',
          },
        ],
        free: true,
        id: '6',
      },
      {
        cost: 75000,
        features: [
          { feature: 'users', value: 'users-generated-8' },
          { feature: 'search-retention', value: 'search-retention-generated-9' },
          { feature: 'storage-volume', value: 'storage-volume-generated-14' },
        ],
        label: 'centi',
        name: 'Centi',
        state: 'available',
        defaultCost: 75000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-8', name: '10' },
            value_string: '10',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-9', name: '14 Days' },
            value_string: '14 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-14', name: '10 GB' },
            value_string: '10 GB',
          },
        ],
        free: false,
        id: '7',
      },
      {
        cost: 100000,
        features: [
          { feature: 'users', value: 'users-generated-15' },
          { feature: 'search-retention', value: 'search-retention-generated-16' },
          { feature: 'storage-volume', value: 'storage-volume-generated-14' },
        ],
        label: 'deci',
        name: 'Deci',
        state: 'available',
        defaultCost: 100000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-15', name: '25' },
            value_string: '25',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-16', name: '30 Days' },
            value_string: '30 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-14', name: '10 GB' },
            value_string: '10 GB',
          },
        ],
        free: false,
        id: '8',
      },
      {
        cost: 150000,
        features: [
          { feature: 'users', value: 'users-generated-8' },
          { feature: 'search-retention', value: 'search-retention-generated-9' },
          { feature: 'storage-volume', value: 'storage-volume-generated-17' },
        ],
        label: 'deca',
        name: 'Deca',
        state: 'available',
        defaultCost: 150000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-8', name: '10' },
            value_string: '10',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-9', name: '14 Days' },
            value_string: '14 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-17', name: '20 GB' },
            value_string: '20 GB',
          },
        ],
        free: false,
        id: '9',
      },
      {
        cost: 200000,
        features: [
          { feature: 'users', value: 'users-generated-15' },
          { feature: 'search-retention', value: 'search-retention-generated-16' },
          { feature: 'storage-volume', value: 'storage-volume-generated-17' },
        ],
        label: 'hecto',
        name: 'Hecto',
        state: 'available',
        defaultCost: 200000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-15', name: '25' },
            value_string: '25',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-16', name: '30 Days' },
            value_string: '30 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-17', name: '20 GB' },
            value_string: '20 GB',
          },
        ],
        free: false,
        id: '10',
      },
      {
        cost: 500,
        features: [
          { feature: 'users', value: 'users-generated-3' },
          { feature: 'search-retention', value: 'search-retention-generated-4' },
          { feature: 'storage-volume', value: 'storage-volume-generated-5' },
        ],
        label: 'zepto',
        name: 'Zepto',
        state: 'available',
        defaultCost: 500,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-3', name: '5' },
            value_string: '5',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-4', name: '7 Days' },
            value_string: '7 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-5', name: '90 MB' },
            value_string: '90 MB',
          },
        ],
        free: false,
        id: '11',
      },
      {
        cost: 1000,
        features: [
          { feature: 'users', value: 'users-generated-3' },
          { feature: 'search-retention', value: 'search-retention-generated-4' },
          { feature: 'storage-volume', value: 'storage-volume-generated-6' },
        ],
        label: 'atto',
        name: 'Atto',
        state: 'available',
        defaultCost: 1000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-3', name: '5' },
            value_string: '5',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-4', name: '7 Days' },
            value_string: '7 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-6', name: '175 MB' },
            value_string: '175 MB',
          },
        ],
        free: false,
        id: '12',
      },
      {
        cost: 2000,
        features: [
          { feature: 'users', value: 'users-generated-3' },
          { feature: 'search-retention', value: 'search-retention-generated-4' },
          { feature: 'storage-volume', value: 'storage-volume-generated-7' },
        ],
        label: 'femto',
        name: 'Femto',
        state: 'available',
        defaultCost: 2000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-3', name: '5' },
            value_string: '5',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-4', name: '7 Days' },
            value_string: '7 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-7', name: '350 MB' },
            value_string: '350 MB',
          },
        ],
        free: false,
        id: '13',
      },
      {
        cost: 5000,
        features: [
          { feature: 'users', value: 'users-generated-8' },
          { feature: 'search-retention', value: 'search-retention-generated-9' },
          { feature: 'storage-volume', value: 'storage-volume-generated-10' },
        ],
        label: 'pico',
        name: 'Pico',
        state: 'available',
        defaultCost: 5000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-8', name: '10' },
            value_string: '10',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-9', name: '14 Days' },
            value_string: '14 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-10', name: '700 MB' },
            value_string: '700 MB',
          },
        ],
        free: false,
        id: '14',
      },
      {
        cost: 10000,
        features: [
          { feature: 'users', value: 'users-generated-8' },
          { feature: 'search-retention', value: 'search-retention-generated-9' },
          { feature: 'storage-volume', value: 'storage-volume-generated-11' },
        ],
        label: 'nano',
        name: 'Nano',
        state: 'available',
        defaultCost: 10000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-8', name: '10' },
            value_string: '10',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-9', name: '14 Days' },
            value_string: '14 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-11', name: '1.5 GB' },
            value_string: '1.5 GB',
          },
        ],
        free: false,
        id: '14',
      },
      {
        cost: 20000,
        features: [
          { feature: 'users', value: 'users-generated-8' },
          { feature: 'search-retention', value: 'search-retention-generated-9' },
          { feature: 'storage-volume', value: 'storage-volume-generated-12' },
        ],
        label: 'micro',
        name: 'Micro',
        state: 'available',
        defaultCost: 20000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-8', name: '10' },
            value_string: '10',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-9', name: '14 Days' },
            value_string: '14 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-12', name: '3 GB' },
            value_string: '3 GB',
          },
        ],
        free: false,
        id: '15',
      },
      {
        cost: 50000,
        features: [
          { feature: 'users', value: 'users-generated-8' },
          { feature: 'search-retention', value: 'search-retention-generated-9' },
          { feature: 'storage-volume', value: 'storage-volume-generated-13' },
        ],
        label: 'milli',
        name: 'Milli',
        state: 'available',
        defaultCost: 50000,
        expanded_features: [
          {
            label: 'users',
            name: 'Users',
            type: 'string',
            values: [
              { label: 'users-generated-0', name: '1' },
              { label: 'users-generated-3', name: '5' },
              { label: 'users-generated-8', name: '10' },
              { label: 'users-generated-15', name: '25' },
            ],
            value: { label: 'users-generated-8', name: '10' },
            value_string: '10',
          },
          {
            label: 'search-retention',
            name: 'Search Retention',
            type: 'string',
            values: [
              { label: 'search-retention-generated-1', name: '0 Days' },
              { label: 'search-retention-generated-4', name: '7 Days' },
              { label: 'search-retention-generated-9', name: '14 Days' },
              { label: 'search-retention-generated-16', name: '30 Days' },
            ],
            value: { label: 'search-retention-generated-9', name: '14 Days' },
            value_string: '14 Days',
          },
          {
            label: 'storage-volume',
            name: 'Storage Volume Per Day',
            type: 'string',
            values: [
              { label: 'storage-volume-generated-2', name: '0 MB' },
              { label: 'storage-volume-generated-5', name: '90 MB' },
              { label: 'storage-volume-generated-6', name: '175 MB' },
              { label: 'storage-volume-generated-7', name: '350 MB' },
              { label: 'storage-volume-generated-10', name: '700 MB' },
              { label: 'storage-volume-generated-11', name: '1.5 GB' },
              { label: 'storage-volume-generated-12', name: '3 GB' },
              { label: 'storage-volume-generated-13', name: '5.5 GB' },
              { label: 'storage-volume-generated-14', name: '10 GB' },
              { label: 'storage-volume-generated-17', name: '20 GB' },
            ],
            value: { label: 'storage-volume-generated-13', name: '5.5 GB' },
            value_string: '5.5 GB',
          },
        ],
        free: false,
        id: '17',
      },
    ],
    provider: { id: '18', label: 'logdna', name: 'LogDNA' },
  },
  plan: {
    cost: 50000,
    features: [
      { feature: 'users', value: 'users-generated-8' },
      { feature: 'search-retention', value: 'search-retention-generated-9' },
      { feature: 'storage-volume', value: 'storage-volume-generated-13' },
    ],
    label: 'milli',
    name: 'Milli',
    state: 'available',
    defaultCost: 50000,
    expanded_features: [
      {
        label: 'users',
        name: 'Users',
        type: 'string',
        values: [
          { label: 'users-generated-0', name: '1' },
          { label: 'users-generated-3', name: '5' },
          { label: 'users-generated-8', name: '10' },
          { label: 'users-generated-15', name: '25' },
        ],
        value: { label: 'users-generated-8', name: '10' },
        value_string: '10',
      },
      {
        label: 'search-retention',
        name: 'Search Retention',
        type: 'string',
        values: [
          { label: 'search-retention-generated-1', name: '0 Days' },
          { label: 'search-retention-generated-4', name: '7 Days' },
          { label: 'search-retention-generated-9', name: '14 Days' },
          { label: 'search-retention-generated-16', name: '30 Days' },
        ],
        value: { label: 'search-retention-generated-9', name: '14 Days' },
        value_string: '14 Days',
      },
      {
        label: 'storage-volume',
        name: 'Storage Volume Per Day',
        type: 'string',
        values: [
          { label: 'storage-volume-generated-2', name: '0 MB' },
          { label: 'storage-volume-generated-5', name: '90 MB' },
          { label: 'storage-volume-generated-6', name: '175 MB' },
          { label: 'storage-volume-generated-7', name: '350 MB' },
          { label: 'storage-volume-generated-10', name: '700 MB' },
          { label: 'storage-volume-generated-11', name: '1.5 GB' },
          { label: 'storage-volume-generated-12', name: '3 GB' },
          { label: 'storage-volume-generated-13', name: '5.5 GB' },
          { label: 'storage-volume-generated-14', name: '10 GB' },
          { label: 'storage-volume-generated-17', name: '20 GB' },
        ],
        value: { label: 'storage-volume-generated-13', name: '5.5 GB' },
        value_string: '5.5 GB',
      },
    ],
    free: false,
    id: '17',
  },
  region: {
    id: '18',
    name: 'all',
  },
};

@Component({ tag: 'manifold-mock-resource' })
export class ManifoldMockResource {
  @Prop() mock: Gateway.Resource = ResourceMock;
  @Prop() gqlMock: Resource = GraphQLResource;
  @State() resource?: Gateway.Resource;
  @State() gqlResource?: Resource;
  @State() loading: boolean = true;

  @loadMark()
  componentWillLoad() {
    window.setTimeout(() => {
      this.loading = false;
      this.resource = this.mock;
      this.gqlResource = this.gqlMock;
    }, 300);
  }

  @logger()
  render() {
    return (
      <ResourceTunnel.Provider
        state={{ data: this.resource, gqlData: this.gqlResource, loading: this.loading }}
      >
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
