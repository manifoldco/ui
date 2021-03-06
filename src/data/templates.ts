const templates: ServiceTemplate[] = [
  {
    id: 'template-1',
    category: 'utility',
    name: 'GitHub',
    description: 'GitHub is a development platform inspired by the way you work.',
    url: 'https://github.com',
    config: ['ACCESS_TOKEN', 'CLIENT_ID', 'CLIENT_SECRET'],
    label: 'github',
    image: 'https://cdn.manifold.co/assets/service_templates/github.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-2',
    category: 'messaging',
    name: 'SendGrid',
    description: 'Email Delivery. Simplified.',
    url: 'https://sendgrid.com',
    config: ['SENDGRID_API_KEY', 'SENDGRID_USERNAME', 'SENDGRID_PASSWORD'],
    label: 'sendgrid',
    image: 'https://cdn.manifold.co/assets/service_templates/sendgrid.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-3',
    category: 'database',
    name: 'mLab',
    description:
      'mLab is the largest cloud MongoDB service in the world, hosting over a half million deployments on AWS, Azure, and Google.',
    url: 'https://mlab.com',
    config: ['MONGODB_URI'],
    label: 'mlab',
    image: 'https://cdn.manifold.co/assets/service_templates/mlab.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-4',
    category: 'monitoring',
    name: 'Papertrail',
    description: 'Frustration-free log management. Get started in seconds.',
    url: 'https://papertrail.com',
    config: ['PAPERTRAIL_API_TOKEN'],
    label: 'papertrail',
    image: 'https://cdn.manifold.co/assets/service_templates/papertrail.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-5',
    category: 'monitoring',
    name: 'New Relic APM',
    description: 'Monitor, troubleshoot, and tune production web applications',
    url: 'https://newrelic.com',
    config: ['NEW_RELIC_LOG', 'NEW_RELIC_LICENSE_KEY'],
    label: 'new_relic_apm',
    image: 'https://cdn.manifold.co/assets/service_templates/new_relic_apm.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-6',
    category: 'database',
    name: 'Compose MongoDB',
    description:
      'Deploy MongoDB on AWS, GCP, or IBM Cloud in minutes. Fully managed, highly-available, & production ready',
    url: 'https://www.compose.com/databases/mongodb',
    config: ['MONGODB_URL'],
    label: 'compose_mongodb',
    image: 'https://cdn.manifold.co/assets/service_templates/compose_mongodb.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-7',
    category: 'monitoring',
    name: 'Librato',
    description: 'Real-Time Cloud Monitoring',
    url: 'https://www.librato.com',
    config: ['LIBRATO_USER', 'LIBRATO_PASSWORD', 'LIBRATO_TOKEN'],
    label: 'librato',
    image: 'https://cdn.manifold.co/assets/service_templates/librato.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-8',
    category: 'messaging',
    name: 'Twilio',
    description: 'Build apps that communicate',
    url: 'https://twilio.com',
    config: ['ACCOUNT_SID', 'AUTH_TOKEN', 'APP_SID'],
    label: 'twilio',
    image: 'https://cdn.manifold.co/assets/service_templates/twilio.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-9',
    category: 'monitoring',
    name: 'Sentry',
    description: 'Users and logs provide clues, Sentry provides answers',
    url: 'https://sentry.io',
    config: ['SENTRY_DSN'],
    label: 'sentry',
    image: 'https://cdn.manifold.co/assets/service_templates/sentry.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-10',
    category: 'monitoring',
    name: 'Rollbar',
    description: 'Catch errors before your users do',
    url: 'https://rollbar.com',
    config: ['ROLLBAR_ACCESS_TOKEN', 'ROLLBAR_ENDPOINT'],
    label: 'rollbar',
    image: 'https://cdn.manifold.co/assets/service_templates/rollbar.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-11',
    category: 'messaging',
    name: 'PubNub',
    description: 'Launch fast with our realtime APIs and global messaging infrastructure',
    url: 'https://pubnub.com',
    config: ['PUBNUB_SUBSCRIBE_KEY', 'PUBNUB_PUBLISH_KEY'],
    label: 'pubnub',
    image: 'https://cdn.manifold.co/assets/service_templates/pubnub.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-12',
    category: 'messaging',
    name: 'Pusher',
    description:
      'We spend our time maintaining realtime infrastructure so you can spend yours building awesome realtime features.',
    url: 'https://pusher.com',
    config: ['PUSHER_SOCKET_URL', 'PUSHER_URL'],
    label: 'pusher',
    image: 'https://cdn.manifold.co/assets/service_templates/pusher.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-13',
    category: 'utility',
    name: 'Codeship',
    description: 'Codeship is a Continuous Integration platform in the cloud.',
    url: 'https://codeshare.io',
    config: ['CODESHIP_ID'],
    label: 'codeship',
    image: 'https://cdn.manifold.co/assets/service_templates/codeship.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-14',
    category: 'authentication',
    name: 'Auth0',
    description:
      'We solve the most complex identity use cases with an extensible and easy to integrate platform that secures billions of logins every month.',
    url: 'https://auth0.com',
    config: ['AUTH0_CLIENT_SECRET', 'AUTH0_CLIENT_ID', 'AUTH0_CALLBACK_URL', 'AUTH0_DOMAIN'],
    label: 'auth0',
    image: 'https://cdn.manifold.co/assets/service_templates/auth0.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-15',
    category: 'messaging',
    name: 'Slack',
    description:
      'Customize functionality for your own workspace or build a beautiful bot to share with the world. Provide your ingenious integrations with a suitably configurable container. Build a Slack app.',
    url: 'https://api.slack.com',
    config: ['SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET'],
    label: 'slack',
    image: 'https://cdn.manifold.co/assets/service_templates/slack.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-16',
    category: 'optimization',
    name: 'Segment',
    description: 'Track your data once, send it to any tool your team wants to use.',
    url: 'https://segment.com',
    config: [],
    label: 'segment',
    image: 'https://cdn.manifold.co/assets/service_templates/segment.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-17',
    category: 'payment',
    name: 'Stripe',
    description: 'The new standard in online payments',
    url: 'https://stripe.com',
    config: ['PUBLISHABLE_KEY', 'PRIVATE_KEY'],
    label: 'stripe',
    image: 'https://cdn.manifold.co/assets/service_templates/stripe.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-18',
    category: 'messaging',
    name: 'Twitter',
    description: 'Display Twitter content on the web and in your app',
    url: 'https://twitter.com',
    config: ['CLIENT_ID', 'CLIENT_SECRET'],
    label: 'twitter',
    image: 'https://cdn.manifold.co/assets/service_templates/twitter.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-19',
    category: 'database',
    name: 'Graphcool',
    description:
      'Open-source framework to develop and deploy production-ready serverless GraphQL backends. Including GraphQL database mapping, real-time subscriptions & flexible permission system.',
    url: 'https://graph.cool',
    config: [],
    label: 'graphcool',
    image: 'https://cdn.manifold.co/assets/service_templates/graphcool.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-20',
    category: 'search',
    name: 'Algolia',
    description: 'The most reliable platform for building search into your business.',
    url: 'https://algolia.com',
    config: ['APPLICATION_ID', 'API_KEY', 'INDEX'],
    label: 'algolia',
    image: 'https://cdn.manifold.co/assets/service_templates/algolia.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-21',
    category: 'optimization',
    name: 'Clearbit',
    description:
      'Enrich sign-ups, identify prospects and gain customer insights — all with data from Clearbit.',
    url: 'https://clearbit.com',
    config: ['API_KEY'],
    label: 'clearbit',
    image: 'https://cdn.manifold.co/assets/service_templates/clearbit.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-22',
    category: 'optimization',
    name: 'Uploadcare',
    description: 'File uploads, processing, storage, and delivery for web and mobile apps.',
    url: 'https://uploadcare.com',
    config: ['PUBLIC_KEY'],
    label: 'uploadcare',
    image: 'https://cdn.manifold.co/assets/service_templates/uploadcare.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-23',
    category: 'utility',
    name: 'LaunchDarkly',
    description: 'Full lifecycle feature management',
    url: 'https://launchdarkly.com',
    config: ['SDK_KEY'],
    label: 'launchdarkly',
    image: 'https://cdn.manifold.co/assets/service_templates/launchdarkly.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-24',
    category: 'cms',
    name: 'Contentful',
    description:
      'Contentful provides a content infrastructure that enables teams to power content in any digital product. ',
    url: 'https://contentful.com',
    config: ['API_KEY'],
    label: 'contentful',
    image: 'https://cdn.manifold.co/assets/service_templates/contentful.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-25',
    category: 'runtime',
    name: 'AWS',
    description:
      'Amazon Web Services (AWS) is a comprehensive, evolving cloud computing platform provided by Amazon.',
    url: 'https://aws.amazon.com/',
    config: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_SESSION_TOKEN'],
    label: 'aws',
    image: 'https://cdn.manifold.co/assets/service_templates/aws.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-26',
    category: 'runtime',
    name: 'GCP',
    description:
      'Google Cloud Platform, offered by Google, is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products.',
    url: 'https://cloud.google.com/',
    config: ['GOOGLE_APPLICATION_CREDENTIALS'],
    label: 'gcp',
    image: 'https://cdn.manifold.co/assets/service_templates/gcp.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-27',
    category: 'runtime',
    name: 'DigitalOcean',
    description:
      'DigitalOcean is a cloud computing vendor that offers an Infrastructure as a Service (IaaS) platform for software developers.',
    url: 'https://www.digitalocean.com/',
    config: ['DIGITALOCEAN_ACCESS_TOKEN'],
    label: 'digital-ocean',
    image: 'https://cdn.manifold.co/assets/service_templates/digitalocean.svg',
    listing_labels: ['template'],
  },
  {
    id: 'template-28',
    category: 'runtime',
    name: 'Linode',
    description:
      'Linode is focused on providing good quality hosting to web developers, app developers and other tech professionals in this industry.',
    url: 'https://www.linode.com/',
    config: ['LINODE_API_KEY'],
    label: 'linode',
    image: 'https://cdn.manifold.co/assets/service_templates/linode.svg',
    listing_labels: ['template'],
  },
];

export default templates;
