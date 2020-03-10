import {
  PlanState,
  ProductConnection,
  ProductCredentialsSupportType,
  ProductState,
  ProfileState,
  ProfileStateModifier,
  Resource,
  ResourceStatusLabel,
  ResourceWithOwnerQuery,
} from '../../../types/graphql';

const emptyProducts: ProductConnection = {
  edges: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

type ResourceWithOwner = Resource & { owner: any };

// https://graphqlbin.com/v2/6BMYsM
const resource: ResourceWithOwnerQuery['resource'] | ResourceWithOwner = {
  createdAt: '2019-08-23T14:22:50Z',
  credentials: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mdnq7avb2f0r6wc3ac5x3jt1jdtn24b12dxt68tbj48x7pzbx',
        node: {
          key: 'JWT_API_KEY',
          value:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfdXVpZCI6IjQyNTI4YTQ1LWZhZmMtNGEyNS05NjM0LTI0OWM3MjNiMmQ5OSIsImlkIjoxMjIxLCJ1cGRhdGVkX2F0IjoiMjAxOS0wOC0yMyAxNDoyMjo0OSBVVEMifQ.q28umlfSw1K5S3E5rkPZblxqoaRWT_jiaFPciV-0qeo',
        },
      },
    ],
  },
  id: '268ehtybtbaaz9gffw46d36bm0g1a',
  label: 'cms-stage',
  owner: {
    id: 'tea-bounq0r4tttipoufa4ug',
    platform: { id: '', domain: '' },
    state: ProfileState.Active,
    stateModifiedBy: ProfileStateModifier.Manifold,
    subject: '',
  },
  displayName: 'cms-stage',
  plan: {
    configurableFeatures: { pageInfo: { hasNextPage: false, hasPreviousPage: false }, edges: [] },
    cost: 0,
    displayName: 'FREE',
    fixedFeatures: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69pk4e9m64wkcrbqc9q66vkme4w7ewh25gh6ywk4cnt24ekvfnyg',
          node: {
            id: 'dngpwub6dxp68bb4cnv6av3fe1jq4',
            label: 'api-requests',
            displayName: 'API Requests',
            displayValue: '50000',
          },
        },
        {
          cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69vk6tv5cch2r8kfe9j6awh279xquz8',
          node: {
            id: 'dngpwub6dxp68bb4cnv6av3fe1jq4',
            label: 'apps',
            displayName: 'Apps',
            displayValue: '1',
          },
        },
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tnp2utm64u72e3mc9j6art25gh6ywk4cnt24ekvfnyg',
          node: {
            id: 'dngpwub6dxp68bb4cnv6av3fe1jq4',
            label: 'cms-items',
            displayName: 'CMS Items',
            displayValue: '1000',
          },
        },
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnkpgc31chukcybqdcrp6y3acwh2r8kfe9j6awh279xquz8',
          node: {
            id: 'dngpwub6dxp68bb4cnv6av3fe1jq4',
            label: 'gb-storage',
            displayName: 'GB Storage',
            displayValue: '10',
          },
        },
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnkpgc31d1u3cckpddnp6x3ae4u24b12dxt68tbj48x7pzbx',
          node: {
            id: 'dngpwub6dxp68bb4cnv6av3fe1jq4',
            label: 'gb-transfer',
            displayName: 'GB Transfer',
            displayValue: '25',
          },
        },
        {
          cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
          node: {
            id: 'dngpwub6dxp68bb4cnv6av3fe1jq4',
            label: 'users',
            displayName: 'Users',
            displayValue: '1',
          },
        },
      ],
    },
    free: true,
    id: '2351kz26adxddkbewu644wx4b186y',
    label: 'manifold-developer',
    meteredFeatures: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [],
    },
    product: {
      categories: [
        {
          displayName: 'CMS',
          label: 'cms',
          id: '00000000000000000000000000000',
          products: emptyProducts,
        },
      ],
      displayName: 'Elegant CMS',
      documentationUrl: 'https://apps.elegantcms.io/documentation',
      id: '234qqzb2wm6gavkvaqr9e6b54j9dg',
      images: [
        'https://cdn.manifold.co/providers/elegant-cms/screenshots/ss1.png',
        'https://cdn.manifold.co/providers/elegant-cms/screenshots/ss2.png',
        'https://cdn.manifold.co/providers/elegant-cms/screenshots/ss3.png',
        'https://cdn.manifold.co/providers/elegant-cms/screenshots/ss4.png',
        'https://cdn.manifold.co/providers/elegant-cms/screenshots/ss5.png',
      ],
      label: 'elegant-cms',
      listing: { beta: false, featured: false, new: false, comingSoon: false },
      logoUrl: 'https://cdn.manifold.co/providers/elegant-cms/logos/280x280.png',
      state: ProductState.Available,
      settings: {
        credentialsSupport: ProductCredentialsSupportType.Single,
        ssoSupported: true,
      },
      setupStepsHtml: '',
      supportEmail: 'support@elegantcms.io',
      tagline:
        'Headless CMS with JSON-API interface. The essential power features to manage all content within your application.',
      tags: ['cms'],
      termsUrl: 'https://www.elegantcms.io/terms-of-service',
      valueProps: [
        {
          body:
            'Make a CMS part of your application using our RESTFUL JSON - API, so business users can self - manage all content with the application and not need to turn to developers for updates.',
          header: 'Never get asked to update content again',
        },
        {
          body:
            'Eliminate the content management challenge, one of the greatest sources of end-user dissatisfaction. Focus development on building &amp; maintaining the valuable features of your applications.',
          header: 'Develop better applications without the distraction of coding a CMS',
        },
        {
          body:
            'Design your own content models with powerful GUI Content Manager &amp; content type relationships -- authors can work more quickly while maintaining content integrity through re-use.',
          header: 'Customizable content model',
        },
        {
          body:
            'Enable authors to self-manage content with an easy to use interface accessed from any device. Quickly build and publish content with the help of field constraints, contextual help and a scheduler.',
          header: 'Authors enjoy easy to use interface',
        },
        {
          body:
            'Provide role specific access control to authors, developers and admins to effectively and securely manage applications you own or built.',
          header: 'Total control over the user experience and application ',
        },
        {
          body:
            'Separate read/ write API ensures your users enjoy the type of performance expected.',
          header: 'Blazing fast performance',
        },
      ],
      valuePropsHtml:
        '<h3>Never get asked to update content again</h3><p>Make a CMS part of your application using our RESTFUL JSON - API, so business users can self - manage all content with the application and not need to turn to developers for updates.</p><h3>Develop better applications without the distraction of coding a CMS</h3><p>Eliminate the content management challenge, one of the greatest sources of end-user dissatisfaction. Focus development on building &amp;amp; maintaining the valuable features of your applications.</p><h3>Customizable content model</h3><p>Design your own content models with powerful GUI Content Manager &amp;amp; content type relationships -- authors can work more quickly while maintaining content integrity through re-use.</p><h3>Authors enjoy easy to use interface</h3><p>Enable authors to self-manage content with an easy to use interface accessed from any device. Quickly build and publish content with the help of field constraints, contextual help and a scheduler.</p><h3>Total control over the user experience and application </h3><p>Provide role specific access control to authors, developers and admins to effectively and securely manage applications you own or built.</p><h3>Blazing fast performance</h3><p>Separate read/ write API ensures your users enjoy the type of performance expected.</p>',
    },
    regions: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
          node: {
            id: '235n4f9pxf8eyraj3y159x89z6jer',
            platform: 'all',
            dataCenter: 'global',
            displayName: 'All Regions',
          },
        },
      ],
    },
    state: PlanState.Available,
  },
  region: {
    id: '235n4f9pxf8eyraj3y159x89z6jer',
    platform: 'all',
    dataCenter: 'global',
    displayName: 'All Regions',
  },
  ssoSupported: true,
  ssoUrl: '',
  status: {
    label: ResourceStatusLabel.Available,
    message: '',
    percentDone: 100,
  },
};

export default resource;
