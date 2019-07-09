import { h, Component, State, Prop } from '@stencil/core';
import { Gateway } from '../../types/gateway';
import ResourceTunnel from '../../data/resource';

const ResourceMock: Gateway.Resource = {
  id: '1',
  annotations: { 'manifold.co/projects': ['test-project'] },
  created_at: '2019-04-25T22:11:06.691Z',
  label: 'logdna',
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
  @State() resource?: Gateway.Resource;
  @State() loading: boolean = true;

  componentWillLoad() {
    window.setTimeout(() => {
      this.loading = false;
      this.resource = this.mock;
    }, 2000);
  }

  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.resource, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
