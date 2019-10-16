import {
  PlanConnection,
  ProductConnection,
  ProductCredentialsSupportType,
  ProductEdge,
  ProductState,
} from '../../types/graphql';
import planFree from './prefab/plan-free';

const freePlans: PlanConnection = {
  edges: [{ cursor: '', node: planFree }],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

const paidPlans: PlanConnection = {
  edges: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

const emptyProducts: ProductConnection = {
  edges: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

const products: ProductEdge[] = [
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69up4w33dtrk4c37errpat3me0t7cutmcmwpett25gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
      ],
      displayName: 'Aiven Cassandra',
      documentationUrl: 'https://help.aiven.io/cassandra',
      id: '234qqazjcy9xm55tf0xner1nrb2tj',
      images: [],
      label: 'aiven-cassandra',
      logoUrl:
        'https://cdn.manifold.co/providers/aiven/logos/73be9a5e-dbd4-465e-a16c-4a24d0a86293.png',
      plans: paidPlans,
      provider: {
        id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
        displayName: 'Aiven',
        label: 'aiven',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
        supportEmail: 'support@aiven.io',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support-manifold@aiven.io',
      tagline: 'The most complete cloud Cassandra on the market',
      termsUrl: 'https://aiven.io/terms',
      valueProps: [
        {
          header: 'Bullet proof multi-node clusters',
          body:
            "If you have two nodes, you've got flexibility and some built-in resilience. What's better than two? Three...especially when they're spread across availability zones. Ours are and we think that's pretty bullet proof.",
        },
        {
          header: '365 backups per year',
          body:
            "Even with the best team and partner, databases are finicky. That is why you need to be able to recover your data, especially if you're running in production. You can do this with Aiven Cassandra, every day of every year.",
        },
        {
          header: 'Full-spectrum security',
          body:
            "If your data isn't secure, nothing else matters. All services run on dedicated VMs instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.",
        },
      ],
      valuePropsHtml:
        '<h3>Bullet proof multi-node clusters</h3><p>If you have two nodes, you&#39;ve got flexibility and some built-in resilience. What&#39;s better than two? Three...especially when they&#39;re spread across availability zones. Ours are and we think that&#39;s pretty bullet proof.</p><h3>365 backups per year</h3><p>Even with the best team and partner, databases are finicky. That is why you need to be able to recover your data, especially if you&#39;re running in production. You can do this with Aiven Cassandra, every day of every year.</p><h3>Full-spectrum security</h3><p>If your data isn&#39;t secure, nothing else matters. All services run on dedicated VMs instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69up4w33dtrk4c38c9hp6dbme4w7arhkcnj6mw1jexnk6t1g48p24vvjchjq48hufdyqu',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
        {
          label: 'search',
          products: emptyProducts,
        },
      ],
      displayName: 'Aiven Elasticsearch',
      documentationUrl: 'https://help.aiven.io/elasticsearch',
      id: '234j2mtuym05gh8far9000mjnt2yw',
      images: [],
      label: 'aiven-elasticsearch',
      logoUrl:
        'https://cdn.manifold.co/providers/aiven/logos/c1aaf5d6-63f6-47e4-a0f0-79b5e5d4388d.png',
      plans: paidPlans,
      provider: {
        id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
        displayName: 'Aiven',
        label: 'aiven',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
        supportEmail: 'support@aiven.io',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support-manifold@aiven.io',
      tagline: 'The most complete cloud Elasticsearch on the market',
      termsUrl: 'https://aiven.io/terms',
      valueProps: [
        {
          header: 'Use popular Elasticsearch plug-ins',
          body:
            "Aiven Elasticsearch allows you to use popular plugins like analysis-icu, analysis-phonetic, and kuromoji to enhance your service's language analysis capabilities, as well as ingest-geoip, ingest-user-agent, and mapper-size.",
        },
        {
          header: 'Enjoy end-to-end security',
          body:
            "A great data system is worthless if it isn't secure. All Aiven services run on dedicated VMs instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation handles all security updates.",
        },
        {
          header: 'Get more with Kibana',
          body:
            'Aiven Elasticsearch comes equipped with Kibana, making your searches easier and adding more to your data story with visualization with Kibana. Even better, Kibana also possesses advanced analytics capabilities—a  perfect match.',
        },
      ],
      valuePropsHtml:
        '<h3>Use popular Elasticsearch plug-ins</h3><p>Aiven Elasticsearch allows you to use popular plugins like analysis-icu, analysis-phonetic, and kuromoji to enhance your service&#39;s language analysis capabilities, as well as ingest-geoip, ingest-user-agent, and mapper-size.</p><h3>Enjoy end-to-end security</h3><p>A great data system is worthless if it isn&#39;t secure. All Aiven services run on dedicated VMs instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation handles all security updates.</p><h3>Get more with Kibana</h3><p>Aiven Elasticsearch comes equipped with Kibana, making your searches easier and adding more to your data story with visualization with Kibana. Even better, Kibana also possesses advanced analytics capabilities—a  perfect match.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69up4w33dtrk4c38etn66dbb6rt7cuth48p24vvjchjq48hufdyqu',
    node: {
      categories: [
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'Aiven Grafana',
      documentationUrl: 'https://help.aiven.io/grafana',
      id: '234vbqa39t933a05x3ce2ge2pe9nm',
      images: [],
      label: 'aiven-grafana',
      logoUrl:
        'https://cdn.manifold.co/providers/aiven/logos/b78667bf-1f5d-4729-b797-3c9bcf8bb94c.png',
      plans: paidPlans,
      provider: {
        id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
        displayName: 'Aiven',
        label: 'aiven',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
        supportEmail: 'support@aiven.io',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support-manifold@aiven.io',
      tagline: 'Your graphing and alerting needs in one platform',
      termsUrl: 'https://aiven.io/terms',
      valueProps: [
        {
          header: 'Enjoy end-to-end security',
          body:
            "It doesn't matter how fast, stable, and advanced a Kafka offering is if it isn't secure. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.",
        },
      ],
      valuePropsHtml:
        '<h3>Enjoy end-to-end security</h3><p>It doesn&#39;t matter how fast, stable, and advanced a Kafka offering is if it isn&#39;t secure. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69up4w33dtrk4c3aerrp6x3ee0t24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
        {
          label: 'messaging',
          products: emptyProducts,
        },
      ],
      displayName: 'Aiven Kafka',
      documentationUrl: 'https://help.aiven.io/kafka',
      id: '234j1veb58h231cf99mqjmambj37c',
      images: [],
      label: 'aiven-kafka',
      logoUrl:
        'https://cdn.manifold.co/providers/aiven/logos/6164a03f-545c-4e77-b467-174a8764ec4a.png',
      plans: paidPlans,
      provider: {
        id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
        displayName: 'Aiven',
        label: 'aiven',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
        supportEmail: 'support@aiven.io',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support-manifold@aiven.io',
      tagline: 'The benefits of Kafka without the headaches',
      termsUrl: 'https://aiven.io/terms',
      valueProps: [
        {
          header: 'Resilient multi-node clusters',
          body:
            'Running a single node Kafka cluster is a recipe for disaster, which is why all Aiven Kafka plans purchased through Manifold come with three-node clusters. So, when a node fails, the other two can take over uninterrupted while it gets rebuilt.',
        },
        {
          header: 'Smart availability zone placement',
          body:
            "BUT, even if your have a multi-node cluster, you're still playing with fire if it's not spread across availability zones. With Aiven Kafka, your cluster is split across zones so that if one drops offline, your cluster will remain operational.",
        },
        {
          header: 'Full-spectrum security',
          body:
            "If your data isn't secure, nothing else matters. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.",
        },
      ],
      valuePropsHtml:
        '<h3>Resilient multi-node clusters</h3><p>Running a single node Kafka cluster is a recipe for disaster, which is why all Aiven Kafka plans purchased through Manifold come with three-node clusters. So, when a node fails, the other two can take over uninterrupted while it gets rebuilt.</p><h3>Smart availability zone placement</h3><p>BUT, even if your have a multi-node cluster, you&#39;re still playing with fire if it&#39;s not spread across availability zones. With Aiven Kafka, your cluster is split across zones so that if one drops offline, your cluster will remain operational.</p><h3>Full-spectrum security</h3><p>If your data isn&#39;t secure, nothing else matters. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69up4w33dtrk4c3d6dk6at3n6tjqeutnc5j3gvbj48p24vvjchjq48hufdyqu',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
      ],
      displayName: 'Aiven PostgreSQL',
      documentationUrl: 'https://help.aiven.io/postgresql',
      id: '234tmxeupmrt5rx93qx70yar4de1m',
      images: [],
      label: 'aiven-pg',
      logoUrl:
        'https://cdn.manifold.co/providers/aiven/logos/a999d517-5fce-4d41-b77c-eaf80fe17680.png',
      plans: paidPlans,
      provider: {
        id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
        displayName: 'Aiven',
        label: 'aiven',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
        supportEmail: 'support@aiven.io',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support-manifold@aiven.io',
      tagline: 'The most complete cloud Postgres on the market',
      termsUrl: 'https://aiven.io/terms',
      valueProps: [
        {
          header: 'Choose from over 40 extensions',
          body:
            'Because of its maturity, Postgres is chock-full of extensions. Turn PostgreSQL into a time series database with the timescaledb extension or set it up to include spatial and geographic objects with postgis extension. With a growing list of over 40 popular extensions, you have a lot of options with Aiven.',
        },
        {
          header: 'Enjoy end-to-end security',
          body:
            "It doesn't matter how fast, stable, and advanced a PostgreSQL offering is if it isn't secure. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of  all security updates.",
        },
        {
          header: 'Know that you can recover your data',
          body:
            "It's simple, if you're running in production, your data needs to be backed up. Your data is essential and that's why Aiven PostgreSQL includes full daily back-ups and continuously recorded write-ahead logs (WAL). You can rest assured that if something happens to your service, we've got your back.",
        },
      ],
      valuePropsHtml:
        '<h3>Choose from over 40 extensions</h3><p>Because of its maturity, Postgres is chock-full of extensions. Turn PostgreSQL into a time series database with the timescaledb extension or set it up to include spatial and geographic objects with postgis extension. With a growing list of over 40 popular extensions, you have a lot of options with Aiven.</p><h3>Enjoy end-to-end security</h3><p>It doesn&#39;t matter how fast, stable, and advanced a PostgreSQL offering is if it isn&#39;t secure. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of  all security updates.</p><h3>Know that you can recover your data</h3><p>It&#39;s simple, if you&#39;re running in production, your data needs to be backed up. Your data is essential and that&#39;s why Aiven PostgreSQL includes full daily back-ups and continuously recorded write-ahead logs (WAL). You can rest assured that if something happens to your service, we&#39;ve got your back.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69up4w33dtrk4c3ddcup6u3de4v24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
        {
          label: 'memory-store',
          products: emptyProducts,
        },
      ],
      displayName: 'Aiven Redis',
      documentationUrl: 'https://help.aiven.io/redis',
      id: '234x63nf03qxfrvkexxfk79hrczmp',
      images: [],
      label: 'aiven-redis',
      logoUrl:
        'https://cdn.manifold.co/providers/aiven/logos/2d4f9f98-3520-4238-9320-bb4570adc2c0.png',
      plans: paidPlans,
      provider: {
        id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
        displayName: 'Aiven',
        label: 'aiven',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
        supportEmail: 'support@aiven.io',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support-manifold@aiven.io',
      tagline: 'The most complete cloud Redis on the market',
      termsUrl: 'https://aiven.io/terms',
      valueProps: [
        {
          header: 'Enjoy end-to-end security',
          body:
            "It doesn't matter how fast, stable, and advanced a Kafka offering is if it isn't secure. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.",
        },
      ],
      valuePropsHtml:
        '<h3>Enjoy end-to-end security</h3><p>It doesn&#39;t matter how fast, stable, and advanced a Kafka offering is if it isn&#39;t secure. All Aiven services are run on dedicated virtual machines instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6hv36eb5d1r3cukpdcuj4b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'Blitline',
      documentationUrl: 'http://helpdocs.blitline.com/',
      id: '234htwpkzvg1vuyez6uybfhv8rjb2',
      images: [
        'https://cdn.manifold.co/providers/blitline/screenshots/1.png',
        'https://cdn.manifold.co/providers/blitline/screenshots/2.png',
        'https://cdn.manifold.co/providers/blitline/screenshots/3.png',
        'https://cdn.manifold.co/providers/blitline/screenshots/4.png',
      ],
      label: 'blitline',
      logoUrl: 'https://cdn.manifold.co/providers/blitline/logos/blitline.png',
      plans: freePlans,
      provider: {
        id: '2343d7p36xwrydjy7120jxqxc7t22',
        displayName: 'Blitline',
        label: 'blitline',
        logoUrl: 'https://cdn.manifold.co/providers/blitline/logos/blitline.png',
        supportEmail: 'support@blitline.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@blitline.com',
      tagline: 'Premium image processing and rasterization API for enterprise systems',
      termsUrl: 'http://www.blitline.com/terms',
      valueProps: [
        {
          header: 'Reduce Your Costs',
          body:
            'Blitline drastically reduces the amount of work you need to develop an application\nthat does any image processing. Stop rebuilding the same image processing functionality,\nlet us do it for much less than it would cost you to make and support it.\nPay for only the image processing time that your jobs use!\n',
        },
        {
          header: 'Broad spectrum functionality',
          body:
            'Need to process PDFs? Need to take screenshots of your website? Need HTML\nfor SEO? Want to run your own ImageMagick or other image processing scripts on\nour cloud? We do that!\n',
        },
        {
          header: 'Massively Scalable',
          body:
            'Instantly support thousands of concurrent image requests. Stop worrying about\nif you image processing is going to scale, we handle that for you, and we are\ngood at it. Blitline scales to let you manipulate hundreds of thousands images\nper hour, and millions per day.\n',
        },
        {
          header: 'S3/Azure Integration',
          body:
            'We can push stuff into your S3 bucket for you. We can even read stuff out\nof your buckets so that you don’t have to make you images public.\n',
        },
        {
          header: 'Excellent Support',
          body: 'Our customer support is top notch. Talk to developers, not support agents.',
        },
        {
          header: 'Flexibility',
          body:
            'Since we offer a language agnostic simple JSON API, you can do whatever you\nwant with Blitline from any language. You can manage your images with any language\nfrom Ruby to javascript. With our open and extensible API, you control the process,\nyou control you images, and you control your distribution. Since we operate strictly\nvia JSON, you are never locked in to using Blitline.\n',
        },
      ],
      valuePropsHtml:
        '<h3>Reduce Your Costs</h3><p>Blitline drastically reduces the amount of work you need to develop an application\nthat does any image processing. Stop rebuilding the same image processing functionality,\nlet us do it for much less than it would cost you to make and support it.\nPay for only the image processing time that your jobs use!\n</p><h3>Broad spectrum functionality</h3><p>Need to process PDFs? Need to take screenshots of your website? Need HTML\nfor SEO? Want to run your own ImageMagick or other image processing scripts on\nour cloud? We do that!\n</p><h3>Massively Scalable</h3><p>Instantly support thousands of concurrent image requests. Stop worrying about\nif you image processing is going to scale, we handle that for you, and we are\ngood at it. Blitline scales to let you manipulate hundreds of thousands images\nper hour, and millions per day.\n</p><h3>S3/Azure Integration</h3><p>We can push stuff into your S3 bucket for you. We can even read stuff out\nof your buckets so that you don’t have to make you images public.\n</p><h3>Excellent Support</h3><p>Our customer support is top notch. Talk to developers, not support agents.</p><h3>Flexibility</h3><p>Since we offer a language agnostic simple JSON API, you can do whatever you\nwant with Blitline from any language. You can manage your images with any language\nfrom Ruby to javascript. With our open and extensible API, you control the process,\nyou control you images, and you control your distribution. Since we operate strictly\nvia JSON, you are never locked in to using Blitline.\n</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6hv7ctb5chkq0uhr68up8u37e4v7gcttcdj78w31e9h6mrv4dmr24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'search',
          products: emptyProducts,
        },
      ],
      displayName: 'Bonsai Elasticsearch',
      documentationUrl: 'https://docs.bonsai.io/',
      id: '234rrwjuvq3t66r1r0p797p9jvrn2',
      images: [
        'https://cdn.manifold.co/providers/onemorecloud/bonsai-elasticsearch/images/uwdfwkyuvmzp0kx26047tpu1kr.png',
        'https://cdn.manifold.co/providers/onemorecloud/bonsai-elasticsearch/images/65vpduq7zeuhgmbz2z2v4mbagm.png',
        'https://cdn.manifold.co/providers/onemorecloud/bonsai-elasticsearch/images/9ccatjykfvbwevwn3cgpc33khw.png',
      ],
      label: 'bonsai-elasticsearch',
      logoUrl:
        'https://cdn.manifold.co/providers/onemorecloud/logos/rt5nvd4yxuy0467bak0jqxz41m.png',
      plans: freePlans,
      provider: {
        id: '23411mqbvgx5eqzb1qfhqfvmn27b8',
        displayName: 'One More Cloud',
        label: 'onemorecloud',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://docs.bons.ai/guides/sdk-install-guide.html" rel="nofollow">Select an SDK from the Bonsai Elasticsearch documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p><a href="https://docs.bons.ai/examples.html" rel="nofollow">Explore working examples</a></p>\n</li><li><p>Configure the SDK with your credentials</p>\n</li><li><p>Begin your implementation</p>\n</li></ol>',
      state: ProductState.Available,
      supportEmail: 'support@onemorecloud.com',
      tagline: 'Elasticsearch, fully managed by the experts in hosted search.',
      termsUrl: 'https://onemorecloud.com/info/terms',
      valueProps: [
        {
          header: 'Build meaningful search experiences',
          body:
            'Leverage Lucene’s search features to create immediate value for your users instead of spinning your wheels keeping Elasticsearch up and optimized.',
        },
        {
          header: 'Get support from real people who know search',
          body:
            "Our support team members are engineers. We take pride in our quick, thorough, and knowledgeable responses. There’s no one in our field that does Elasticsearch support better, or who's been doing it longer.",
        },
        {
          header: 'Never worry about availability',
          body:
            'We’ve put in the years and solved the hard problems so you don’t have to. We’re on call 24/7, with hourly offsite backups and architected for 99.99% uptime.',
        },
        {
          header: 'Rest easy with battle-tested security',
          body:
            'With features like Secure TLS Encryption and Advanced API Credentials, never worry about keeping your data secure.',
        },
        {
          header: 'Scale with Ease',
          body:
            'Partition and replicate your data throughout our shared cluster with ElasticSearch shards and replicas.',
        },
        {
          header: 'The best value in hosted search',
          body: 'Our unique architecture gives you the best value for your resources.',
        },
      ],
      valuePropsHtml:
        '<h3>Build meaningful search experiences</h3><p>Leverage Lucene’s search features to create immediate value for your users instead of spinning your wheels keeping Elasticsearch up and optimized.</p><h3>Get support from real people who know search</h3><p>Our support team members are engineers. We take pride in our quick, thorough, and knowledgeable responses. There’s no one in our field that does Elasticsearch support better, or who&#39;s been doing it longer.</p><h3>Never worry about availability</h3><p>We’ve put in the years and solved the hard problems so you don’t have to. We’re on call 24/7, with hourly offsite backups and architected for 99.99% uptime.</p><h3>Rest easy with battle-tested security</h3><p>With features like Secure TLS Encryption and Advanced API Credentials, never worry about keeping your data secure.</p><h3>Scale with Ease</h3><p>Partition and replicate your data throughout our shared cluster with ElasticSearch shards and replicas.</p><h3>The best value in hosted search</h3><p>Our unique architecture gives you the best value for your resources.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv36tk5dtn38ckbc5m62c125gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'memory-store',
          products: emptyProducts,
        },
        {
          label: 'messaging',
          products: emptyProducts,
        },
      ],
      displayName: 'CloudAMQP',
      documentationUrl: 'https://www.cloudamqp.com/docs/',
      id: '234u3fyxq4pa2kzcu23w77cd9tq4g',
      images: [
        'https://cdn.manifold.co/providers/84codes/cloudamqp/images/zkj2ruj3wtbnbyjy6ynrhcc85r.jpg',
        'https://cdn.manifold.co/providers/84codes/cloudamqp/images/qdjte3ux3q4jvvx3a7ze6f078g.jpg',
        'https://cdn.manifold.co/providers/84codes/cloudamqp/images/5bf55h4dxkvqge5ujyj5mj9260.jpg',
        'https://cdn.manifold.co/providers/84codes/cloudamqp/images/qhn2j8mek2hn8ek88r92heyv64.jpg',
        'https://cdn.manifold.co/providers/84codes/cloudamqp/images/mdnkd18vk3hbwpf7ymt3uqq828.jpg',
      ],
      label: 'cloudamqp',
      logoUrl: 'https://cdn.manifold.co/providers/84codes/logos/ctg5nbw5zp51u5begurzxry2tm.png',
      plans: freePlans,
      provider: {
        id: '23495cy7q7kpcnbp4gkk8zaejtbvj',
        displayName: '84codes',
        label: '84codes',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://www.cloudamqp.com/docs" rel="nofollow">Select a client library from the CloudAMQP documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Configure the client with your credentials</p>\n</li><li><p>Connect to CloudAMQP</p>\n</li><li><p>Start publishing messages from your application</p>\n</li></ol>',
      state: ProductState.Available,
      supportEmail: 'support@cloudamqp.com',
      tagline: 'Perfectly configured and optimized RabbitMQ clusters ready in 2 minutes.',
      termsUrl: 'https://www.cloudamqp.com/terms_of_service.html',
      valueProps: [
        {
          header: 'Message queueing',
          body:
            'Queue job messages for your workers. CloudAMQP gives you in-order, no-duplicates guarantees and high availability as the messages can be replicated between multiple RabbitMQ nodes.',
        },
        {
          header: 'Application decoupling',
          body:
            'Instead of building a massive application many teams find it beneficial to decouple different concerns in your application and only communicate between them asynchronously with messages. That way different parts of your application can evolve independently, be written in different languages and/or maintained by complete separated teams.',
        },
        {
          header: 'Offload your data store',
          body:
            'Instead of polling your data store, publish a message when new data is inserted. Interested parties will be notified immediately and your data store will be ready to answer qualified queries instead.',
        },
        {
          header: 'Realtime applications',
          body:
            'CloudAMQP is an excellent backend for realtime applications. Notifications and message streaming is handled very effectively by RabbitMQ, you’ll be able to push thousands of messages per second.',
        },
        {
          header: 'High Availability',
          body:
            'All our servers are clustered and all queues are by default mirrored over all nodes. The load-balancer will automatically detect and temporarily remove unhealthy nodes. We provide RabbitMQ clusters you can rely on.',
        },
        {
          header: 'RabbitMQ is open source',
          body:
            'Unlike most other hosted message queue services you’re not risking vendor lock-in with CloudAMQP. Have RabbitMQ installed locally when you develop, for fast, free and offline available usage.',
        },
      ],
      valuePropsHtml:
        '<h3>Message queueing</h3><p>Queue job messages for your workers. CloudAMQP gives you in-order, no-duplicates guarantees and high availability as the messages can be replicated between multiple RabbitMQ nodes.</p><h3>Application decoupling</h3><p>Instead of building a massive application many teams find it beneficial to decouple different concerns in your application and only communicate between them asynchronously with messages. That way different parts of your application can evolve independently, be written in different languages and/or maintained by complete separated teams.</p><h3>Offload your data store</h3><p>Instead of polling your data store, publish a message when new data is inserted. Interested parties will be notified immediately and your data store will be ready to answer qualified queries instead.</p><h3>Realtime applications</h3><p>CloudAMQP is an excellent backend for realtime applications. Notifications and message streaming is handled very effectively by RabbitMQ, you’ll be able to push thousands of messages per second.</p><h3>High Availability</h3><p>All our servers are clustered and all queues are by default mirrored over all nodes. The load-balancer will automatically detect and temporarily remove unhealthy nodes. We provide RabbitMQ clusters you can rely on.</p><h3>RabbitMQ is open source</h3><p>Unlike most other hosted message queue services you’re not risking vendor lock-in with CloudAMQP. Have RabbitMQ installed locally when you develop, for fast, free and offline available usage.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv36tk5dtn3cdkrc8t66v925gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'utility',
          products: emptyProducts,
        },
      ],
      displayName: 'Cloudcube',
      documentationUrl: 'https://cloudcube.cloudforged.com/docs',
      id: '234vpcvg8k7dty17j7wmazfpdbrag',
      images: [
        'https://cdn.manifold.co/providers/cloudforged/screenshots/3648f0c2-77c4-47c9-9af7-9251babfb054.png',
        'https://cdn.manifold.co/providers/cloudforged/screenshots/bcd5ce08-6c5a-4f0a-ba9f-2bad268886ec.png',
      ],
      label: 'cloudcube',
      logoUrl:
        'https://cdn.manifold.co/providers/cloudforged/logos/b2d4d01c-dee4-4a87-95da-45f72fdc3202.png',
      plans: freePlans,
      provider: {
        id: '2348m4rz1wm33z9tcwb23jxfan62a',
        displayName: 'Cloudforged',
        label: 'cloudforged',
        logoUrl: 'https://cdn.manifold.co/providers/cloudforged/logo/cloudcube.png',
        supportEmail: 'support@cloudforged.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@cloudforged.com',
      tagline: 'Flexible AWS S3 file storage without the hassle.',
      termsUrl: 'https://cloudcube.cloudforged.com/terms',
      valueProps: [
        {
          header: 'Private and Public Storage',
          body:
            'Cubes can contain both private files and public files. Public files are given a URL which can be shared with others or used inside your application.',
        },
        {
          header: 'GUI Interface',
          body:
            'Upload, Rename, Move, and Delete your files from the Dashboard’s intuitive graphical interface.',
        },
        {
          header: 'AWS Credentials',
          body:
            'Your cube comes with a set of IAM credentials for manipulating your Cube files via Amazon’s REST API or one of its many free-to-user SDKs.',
        },
        {
          header: 'Always Available',
          body:
            'S3 storage offers 99.99% availability for object storage so you can rest easy knowing your files will be there when you need them.',
        },
        {
          header: 'Epic Durability',
          body:
            'In-house filesystems experience the inevitable degradation of hard-disks. Corrupt drives can result in loss of data that can be quite costly as well as annoying. With Cloudcube, your data will enjoy S3‘s 99.999999999% durability record. No more lost files, no more disk corruption.',
        },
      ],
      valuePropsHtml:
        '<h3>Private and Public Storage</h3><p>Cubes can contain both private files and public files. Public files are given a URL which can be shared with others or used inside your application.</p><h3>GUI Interface</h3><p>Upload, Rename, Move, and Delete your files from the Dashboard’s intuitive graphical interface.</p><h3>AWS Credentials</h3><p>Your cube comes with a set of IAM credentials for manipulating your Cube files via Amazon’s REST API or one of its many free-to-user SDKs.</p><h3>Always Available</h3><p>S3 storage offers 99.99% availability for object storage so you can rest easy knowing your files will be there when you need them.</p><h3>Epic Durability</h3><p>In-house filesystems experience the inevitable degradation of hard-disks. Corrupt drives can result in loss of data that can be quite costly as well as annoying. With Cloudcube, your data will enjoy S3‘s 99.999999999% durability record. No more lost files, no more disk corruption.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tw64uv5d1rq0x9r68wp8vk7e1jq8e9gc4wpmw1petv3et3mdnrkgxb2ctj748hc49qq4t35e8h3myvxfm',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'Custom Image Recognition',
      documentationUrl: 'https://www.ximilar.com/services/image-recognition/',
      id: '234q7ufpnwffnw63ktp1bzeqzxzdy',
      images: [
        'https://cdn.manifold.co/providers/ximilar/screenshots/30aa29b2-8a55-4277-b755-53fe375bbf51.png',
      ],
      label: 'custom-recognition',
      logoUrl:
        'https://cdn.manifold.co/providers/ximilar/logos/c469ba54-687c-4412-9672-75fdc91d35ab.png',
      plans: freePlans,
      provider: {
        id: '2342x6jwx1xrqcnfe6nn2n89c2fc8',
        displayName: 'Ximilar',
        label: 'ximilar',
        logoUrl: 'https://cdn.manifold.co/providers/vize/logos/280x280.png',
        supportEmail: 'help@ximilar.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'tech@ximilar.com',
      tagline:
        'Image classification & tagging by your labels. Powerful computer vision & machine learning with blazing speed.',
      termsUrl: 'https://www.ximilar.com/terms-of-use-privacy/',
      valueProps: [
        {
          header: 'High Accuracy',
          body: 'Use deep learning algorithms with the highest accuracy on the market.',
        },
        {
          header: 'Simple Setup & Use',
          body: 'Implement cutting-edge vision automation faster with no development costs.',
        },
        {
          header: 'Recognize Anything',
          body: 'Train custom neural network to recognize your specific images.',
        },
        {
          header: 'Training Interface',
          body: 'Create powerful and custom image recognizers in intuitive web interface.',
        },
        {
          header: 'Scalable',
          body: 'Scale up easily with no infrastructure costs.',
        },
        {
          header: 'Improving Constantly',
          body:
            'Ongoing improvements of the underlying machine learning algorithms. You are up-to-date',
        },
      ],
      valuePropsHtml:
        '<h3>High Accuracy</h3><p>Use deep learning algorithms with the highest accuracy on the market.</p><h3>Simple Setup &amp; Use</h3><p>Implement cutting-edge vision automation faster with no development costs.</p><h3>Recognize Anything</h3><p>Train custom neural network to recognize your specific images.</p><h3>Training Interface</h3><p>Create powerful and custom image recognizers in intuitive web interface.</p><h3>Scalable</h3><p>Scale up easily with no infrastructure costs.</p><h3>Improving Constantly</h3><p>Ongoing improvements of the underlying machine learning algorithms. You are up-to-date</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m71w64t3565n72d125gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
      ],
      displayName: 'Dumper',
      documentationUrl: 'https://dumper.io/help/how',
      id: '234gy5mug2rpqcfjq109z6dcqmrgc',
      images: [
        'https://cdn.manifold.co/providers/dumper/screenshots/7.png',
        'https://cdn.manifold.co/providers/dumper/screenshots/1.png',
        'https://cdn.manifold.co/providers/dumper/screenshots/2.png',
        'https://cdn.manifold.co/providers/dumper/screenshots/3.png',
        'https://cdn.manifold.co/providers/dumper/screenshots/4.png',
        'https://cdn.manifold.co/providers/dumper/screenshots/5.png',
        'https://cdn.manifold.co/providers/dumper/screenshots/6.png',
      ],
      label: 'dumper',
      logoUrl: 'https://cdn.manifold.co/providers/dumper/logos/512x512_2.png',
      plans: paidPlans,
      provider: {
        id: '2348fce0u9qahqwyn3a5edqkqz1wa',
        displayName: 'Dumper',
        label: 'dumper',
        logoUrl: 'https://cdn.manifold.co/providers/dumper/logos/512x512.png',
        supportEmail: 'support@dumper.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@dumper.io',
      tagline: 'Off-site backup-as-a-service for MySQL, PostgreSQL, MongoDB and Redis.',
      termsUrl: '<https://dumper.io/help/terms>',
      valueProps: [
        {
          header: 'Disaster recovery',
          body:
            'VM snapshots won’t save you when your data-center catches on fire. Dumper offers the off-site backup which is the only way to protect your data from disastrous events.',
        },
        {
          header: 'No more silent failures',
          body:
            'All too often, cron jobs start to fail silently and go unnoticed for months. Dumper reports errors immediately, as well as a status summary weekly or monthly.',
        },
        {
          header: 'Security and safety',
          body:
            'We store everything on Amazon S3. It’s a highly reliable storage with an astronomical 99.999999999% durability.',
        },
        {
          header: 'Insightful Dashboard',
          body:
            'Our dashboard gives you insights to understand how well backup jobs are running or how fast your datasets are growing.',
        },
        {
          header: 'Multiple databases',
          body:
            'In the age of polyglot persistence, Dumper offers a central location to manage all backups of all databases from all projects.',
        },
        {
          header: 'Proven and reliable',
          body:
            "We've been in production since 2012 and achieved 99.97% uptime per year. Our database expertise comes from scaling multiple projects with millions of users.",
        },
      ],
      valuePropsHtml:
        '<h3>Disaster recovery</h3><p>VM snapshots won’t save you when your data-center catches on fire. Dumper offers the off-site backup which is the only way to protect your data from disastrous events.</p><h3>No more silent failures</h3><p>All too often, cron jobs start to fail silently and go unnoticed for months. Dumper reports errors immediately, as well as a status summary weekly or monthly.</p><h3>Security and safety</h3><p>We store everything on Amazon S3. It’s a highly reliable storage with an astronomical 99.999999999% durability.</p><h3>Insightful Dashboard</h3><p>Our dashboard gives you insights to understand how well backup jobs are running or how fast your datasets are growing.</p><h3>Multiple databases</h3><p>In the age of polyglot persistence, Dumper offers a central location to manage all backups of all databases from all projects.</p><h3>Proven and reliable</h3><p>We&#39;ve been in production since 2012 and achieved 99.97% uptime per year. Our database expertise comes from scaling multiple projects with millions of users.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v36db3f1kq0xvr64r3gt1pdrv24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'cms',
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
      logoUrl: 'https://cdn.manifold.co/providers/elegant-cms/logos/280x280.png',
      plans: freePlans,
      provider: {
        id: '234bpdr48mzd8npnztefjevwmzmnu',
        displayName: 'Elegant CMS',
        label: 'elegant-cms',
        logoUrl: 'https://cdn.manifold.co/providers/elegant-cms/logos/280x280.png',
        supportEmail: 'support@elegantcms.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@elegantcms.io',
      tagline:
        'Headless CMS with JSON-API interface. The essential power features to manage all content within your application.',
      termsUrl: 'https://www.elegantcms.io/terms-of-service',
      valueProps: [
        {
          header: 'Never get asked to update content again',
          body:
            'Make a CMS part of your application using our RESTFUL JSON - API, so business users can self - manage all content with the application and not need to turn to developers for updates.',
        },
        {
          header: 'Develop better applications without the distraction of coding a CMS',
          body:
            'Eliminate the content management challenge, one of the greatest sources of end-user dissatisfaction. Focus development on building &amp; maintaining the valuable features of your applications.',
        },
        {
          header: 'Customizable content model',
          body:
            'Design your own content models with powerful GUI Content Manager &amp; content type relationships -- authors can work more quickly while maintaining content integrity through re-use.',
        },
        {
          header: 'Authors enjoy easy to use interface',
          body:
            'Enable authors to self-manage content with an easy to use interface accessed from any device. Quickly build and publish content with the help of field constraints, contextual help and a scheduler.',
        },
        {
          header: 'Total control over the user experience and application ',
          body:
            'Provide role specific access control to authors, developers and admins to effectively and securely manage applications you own or built.',
        },
        {
          header: 'Blazing fast performance',
          body:
            'Separate read/ write API ensures your users enjoy the type of performance expected.',
        },
      ],
      valuePropsHtml:
        '<h3>Never get asked to update content again</h3><p>Make a CMS part of your application using our RESTFUL JSON - API, so business users can self - manage all content with the application and not need to turn to developers for updates.</p><h3>Develop better applications without the distraction of coding a CMS</h3><p>Eliminate the content management challenge, one of the greatest sources of end-user dissatisfaction. Focus development on building &amp;amp; maintaining the valuable features of your applications.</p><h3>Customizable content model</h3><p>Design your own content models with powerful GUI Content Manager &amp;amp; content type relationships -- authors can work more quickly while maintaining content integrity through re-use.</p><h3>Authors enjoy easy to use interface</h3><p>Enable authors to self-manage content with an easy to use interface accessed from any device. Quickly build and publish content with the help of field constraints, contextual help and a scheduler.</p><h3>Total control over the user experience and application </h3><p>Provide role specific access control to authors, developers and admins to effectively and securely manage applications you own or built.</p><h3>Blazing fast performance</h3><p>Separate read/ write API ensures your users enjoy the type of performance expected.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnu64tb3dtu3cukjegr3jdbge0t78xhn6grp2dhjehv3et1ne4v6a8hc49qq4t35e8h3myvxfm',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'Generic Image Tagging',
      documentationUrl: 'https://www.ximilar.com/services/generic-tagging/',
      id: '234hyjj2qbkpyw4z0g0bwgjgtydnj',
      images: [
        'https://cdn.manifold.co/providers/ximilar/screenshots/39d5a682-8532-405d-952b-c9b58f787fa2.png',
      ],
      label: 'generic-tagging',
      logoUrl:
        'https://cdn.manifold.co/providers/ximilar/logos/9ef978f9-309e-4e0b-a9d8-ee99b78a4ac3.png',
      plans: freePlans,
      provider: {
        id: '2342x6jwx1xrqcnfe6nn2n89c2fc8',
        displayName: 'Ximilar',
        label: 'ximilar',
        logoUrl: 'https://cdn.manifold.co/providers/vize/logos/280x280.png',
        supportEmail: 'help@ximilar.com',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'tech@ximilar.com',
      tagline:
        'Automatic tagging of everyday photos. Powerful computer vision & machine learning with blazing speed.',
      termsUrl: 'https://www.ximilar.com/terms-of-use-privacy/',
      valueProps: [
        {
          header: 'We Spot Everything',
          body: 'The service can recognises 1,000 concepts in your everyday photos.',
        },
        {
          header: 'Ready To Use',
          body: 'You do not have to train anything, the service is ready for you.',
        },
        {
          header: 'Swift & Scalable',
          body: 'Performance is a key - image analysis is quick and can be processed in batches.',
        },
      ],
      valuePropsHtml:
        '<h3>We Spot Everything</h3><p>The service can recognises 1,000 concepts in your everyday photos.</p><h3>Ready To Use</h3><p>You do not have to train anything, the service is ready for you.</p><h3>Swift &amp; Scalable</h3><p>Performance is a key - image analysis is quick and can be processed in batches.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxwp2ttrd0tk08hc49qq4t35e8h3myvxfm',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'HyPDF',
      documentationUrl: 'https://www.hypdf.com/info/documentation',
      id: '234n81q2693cee1680fxjkcutw476',
      images: [
        'https://cdn.manifold.co/providers/hypdf/screenshots/ec7933fb-2236-420e-bf94-c2d0c98768a1.png',
        'https://cdn.manifold.co/providers/hypdf/screenshots/5dd3d577-2cce-4feb-9139-a6e8b0dd1f94.png',
        'https://cdn.manifold.co/providers/hypdf/screenshots/5bf869c4-d181-4350-9a1f-684180e0af3f.png',
      ],
      label: 'hypdf',
      logoUrl:
        'https://cdn.manifold.co/providers/hypdf/logos/15cbd713-15e1-41fc-9894-b73049dce40d.png',
      plans: freePlans,
      provider: {
        id: '234542w8d45emjcwgwj9zu2653baj',
        displayName: 'HyPDF',
        label: 'hypdf',
        logoUrl: 'https://cdn.manifold.co/providers/hypdf/590x590.png',
        supportEmail: 'support@hypdf.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support@hypdf.com',
      tagline: 'Your Swiss Army knife for working with PDF',
      termsUrl: 'https://www.hypdf.com/info/terms_of_service',
      valueProps: [
        {
          header: 'Create',
          body:
            'Create beautiful and complex PDF documents using familiar HTML, CSS and JavaScript.',
        },
        {
          header: 'Edit',
          body: 'Read and fill forms in your PDF files.',
        },
        {
          header: 'Extract',
          body: 'Extract certain pages from the whole PDF file.',
        },
        {
          header: 'Unite',
          body: 'Merge multiple PDF files into one.',
        },
        {
          header: 'Inspect',
          body: 'Read and edit meta-information for any PDF file, such as author, title and so on.',
        },
        {
          header: 'Transform',
          body: 'Convert PDF files to the plain text.',
        },
        {
          header: 'Integrate',
          body: 'HyPDF can upload created PDFs to your own AWS S3 bucket.',
        },
        {
          header: 'Save money',
          body:
            'You don’t need to pay for licenses and royalties, you only pay for the convenience.',
        },
      ],
      valuePropsHtml:
        '<h3>Create</h3><p>Create beautiful and complex PDF documents using familiar HTML, CSS and JavaScript.</p><h3>Edit</h3><p>Read and fill forms in your PDF files.</p><h3>Extract</h3><p>Extract certain pages from the whole PDF file.</p><h3>Unite</h3><p>Merge multiple PDF files into one.</p><h3>Inspect</h3><p>Read and edit meta-information for any PDF file, such as author, title and so on.</p><h3>Transform</h3><p>Convert PDF files to the plain text.</p><h3>Integrate</h3><p>HyPDF can upload created PDFs to your own AWS S3 bucket.</p><h3>Save money</h3><p>You don’t need to pay for licenses and royalties, you only pay for the convenience.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9v6pdk4d1uq2tv868t24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'InfluxDB',
      documentationUrl: 'https://hostedmetrics.com/documentation/',
      id: '234ku86rd8fmea5peabd7fgzxztxw',
      images: [
        'https://cdn.manifold.co/providers/hostedmetrics/screenshots/d946571b-2445-47d5-9c80-ae5aa064e2b0.png',
        'https://cdn.manifold.co/providers/hostedmetrics/screenshots/551144ef-0b38-4ca7-93c2-6b7774514fa1.png',
        'https://cdn.manifold.co/providers/hostedmetrics/screenshots/9c2f6103-a46f-4ea4-bef1-4c2f840e4314.png',
        'https://cdn.manifold.co/providers/hostedmetrics/screenshots/bea5bf15-3546-4d40-a900-217750bedd03.png',
      ],
      label: 'hostedmetrics-influxdb',
      logoUrl:
        'https://cdn.manifold.co/providers/hosted-metrics/logos/cf170c9c-6dc1-4fcf-9c91-9ab1b3515d71.png',
      plans: paidPlans,
      provider: {
        id: '234102an6n5u3dac04nkenx1mchj8',
        displayName: 'HostedMetrics',
        label: 'hostedmetrics',
        logoUrl: 'https://cdn.manifold.co/providers/hostedmetrics/logos/hosted_metrics_logo.png',
        supportEmail: 'support@hostedmetrics.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@hostedmetrics.com',
      tagline: 'Monitor your applications with InfluxDB, Grafana, and StatsD',
      termsUrl: 'https://hostedmetrics.com/terms-of-use/',
      valueProps: [
        {
          header: 'Instant Start',
          body:
            'Start recording and charting your first metrics within minutes. Get up and running as hassle-free as possible by using our hosted and fully managed InfluxDB and Grafana environment.',
        },
        {
          header: 'Complete Turnkey Toolset',
          body:
            "Skip the guesswork, configuration, and deployment with our complete and turnkey solution. Send your metrics with StatsD or InfluxDB's line protocol. Use Grafana for dashboards. Configure alerts to instantly be notified when problems arise.",
        },
        {
          header: 'Zero Maintenance',
          body:
            'Collect and make use of metrics without the hassle of running, scaling, and maintaining a metrics platform. Stop worrying about server specs, uptime, maintenance, and configuration. We take care of all the details so that you can get back to your product because you have better things to do than to babysit all the ancillary tools needed to run your business.',
        },
        {
          header: 'Drastically Lower Costs',
          body:
            "Drastically reduce your costs by using our hosted and managed tools to collect and visualize the metrics needed to understand your systems, processes, and code. We aid you in monitoring, error handling, and debugging. Also, with alerts, you'll know right away when your attention is needed.",
        },
        {
          header: 'Exceptional Support',
          body:
            "We take pride in treating you right. We address issues quickly and with care, so don't be surprised when you'll receive thoughtful messages instead of canned replies.",
        },
      ],
      valuePropsHtml:
        '<h3>Instant Start</h3><p>Start recording and charting your first metrics within minutes. Get up and running as hassle-free as possible by using our hosted and fully managed InfluxDB and Grafana environment.</p><h3>Complete Turnkey Toolset</h3><p>Skip the guesswork, configuration, and deployment with our complete and turnkey solution. Send your metrics with StatsD or InfluxDB&#39;s line protocol. Use Grafana for dashboards. Configure alerts to instantly be notified when problems arise.</p><h3>Zero Maintenance</h3><p>Collect and make use of metrics without the hassle of running, scaling, and maintaining a metrics platform. Stop worrying about server specs, uptime, maintenance, and configuration. We take care of all the details so that you can get back to your product because you have better things to do than to babysit all the ancillary tools needed to run your business.</p><h3>Drastically Lower Costs</h3><p>Drastically reduce your costs by using our hosted and managed tools to collect and visualize the metrics needed to understand your systems, processes, and code. We aid you in monitoring, error handling, and debugging. Also, with alerts, you&#39;ll know right away when your attention is needed.</p><h3>Exceptional Support</h3><p>We take pride in treating you right. We address issues quickly and with care, so don&#39;t be surprised when you&#39;ll receive thoughtful messages instead of canned replies.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9v6pdk4f1u3cxbjc9jpatt25gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'Informant',
      documentationUrl: 'https://gitlab.com/informantapp/informant-rails',
      id: '234jgrbpyg8ht242yu6tmq072w6tu',
      images: [
        'https://cdn.manifold.co/providers/informant/screenshots/29a4f1f9-0cb7-4570-a9c7-19739f95cfe3.png',
        'https://cdn.manifold.co/providers/informant/screenshots/80d1b6f7-0e22-4ba2-b982-d0e071754ac7.png',
        'https://cdn.manifold.co/providers/informant/screenshots/3fb94460-5e54-4105-8542-2de47a0d284f.png',
      ],
      label: 'informant',
      logoUrl:
        'https://cdn.manifold.co/providers/informant/logos/84ee44e2-fded-419e-85f4-dffdfafc8996.png',
      plans: freePlans,
      provider: {
        id: '23400t2qzjek86gq1ute8x2za76za',
        displayName: 'Informant',
        label: 'informant',
        logoUrl: '',
        supportEmail: 'info@informantapp.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@informantapp.com',
      tagline: 'Form Validation Analytics for Ruby on Rails Applications',
      termsUrl: 'https://www.informantapp.com/terms.html',
      valueProps: [
        {
          header: 'Monitor user errors in real time',
          body:
            'Informant provides real-time ActiveRecord validation monitoring, so you know when your users are making mistakes.',
        },
        {
          header: 'Keep an eye on your API',
          body:
            'Our validation monitoring extends to API calls, allowing you to monitor any validation issue, whether it’s caused by a user or an app.',
        },
        {
          header: 'Drill down to the issue',
          body:
            'Our handy visualizations and line-by-line tracking allow you to find the location & identity of any offending form submission.',
        },
        {
          header: 'Rest easy with security',
          body:
            'Informant respects Rails’ data security – we won’t store data from any sensitive fields, and if you need maximum security, you can configure Informant to only track errors without storing any field data at all.',
        },
        {
          header: 'Integrate in minutes',
          body:
            'Getting Informant running on a Rails installation is a breeze – just install the gem and you’re ready to go!',
        },
      ],
      valuePropsHtml:
        '<h3>Monitor user errors in real time</h3><p>Informant provides real-time ActiveRecord validation monitoring, so you know when your users are making mistakes.</p><h3>Keep an eye on your API</h3><p>Our validation monitoring extends to API calls, allowing you to monitor any validation issue, whether it’s caused by a user or an app.</p><h3>Drill down to the issue</h3><p>Our handy visualizations and line-by-line tracking allow you to find the location &amp; identity of any offending form submission.</p><h3>Rest easy with security</h3><p>Informant respects Rails’ data security – we won’t store data from any sensitive fields, and if you need maximum security, you can configure Informant to only track errors without storing any field data at all.</p><h3>Integrate in minutes</h3><p>Getting Informant running on a Rails installation is a breeze – just install the gem and you’re ready to go!</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9vpptk4egrq0ckjerw66v925gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'memory-store',
          products: emptyProducts,
        },
      ],
      displayName: 'IronCache',
      documentationUrl: 'http://dev.iron.io/',
      id: '234pder46cj32zuj6eh5uhyc8tjxe',
      images: ['https://cdn.manifold.co/providers/iron-io/screenshots/cache-lowres.png'],
      label: 'iron_cache',
      logoUrl: 'https://cdn.manifold.co/providers/iron-io/logos/cache-200x200.png',
      plans: paidPlans,
      provider: {
        id: '23423wffqvcmbdyyktzjy9wu6d120',
        displayName: 'Iron.io',
        label: 'iron',
        logoUrl: 'https://cdn.manifold.co/providers/iron-io/logos/company-300x300.png',
        supportEmail: 'support@iron.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@iron.io',
      tagline:
        'Elastic, scalable, highly available, secure cloud-based key/value store. Starting at $0/mo.',
      termsUrl: '<https://www.iron.io/terms>',
      valueProps: [
        {
          header: 'Built On Open Standards',
          body:
            'Built with open standards in mind, which means no lock-in and maximum flexibility. Change endpoints from a local cache and move to a cache in the cloud.',
        },
        {
          header: 'Speak Your Own Language',
          body:
            'Make use of a large set of IronCache language libraries including Ruby, PHP, Python, Go, and more. Or choose from a long list of memcached interfaces.',
        },
        {
          header: 'Data Storage At Scale',
          body:
            'Written with elasticity and scale at its core, IronCache is built using high-performance languages designed for concurrency.',
        },
        {
          header: '23/7 Chat Support',
          body:
            'The people building IronCache every day staff a public chat room, ready to answer questions and help you.',
        },
      ],
      valuePropsHtml:
        '<h3>Built On Open Standards</h3><p>Built with open standards in mind, which means no lock-in and maximum flexibility. Change endpoints from a local cache and move to a cache in the cloud.</p><h3>Speak Your Own Language</h3><p>Make use of a large set of IronCache language libraries including Ruby, PHP, Python, Go, and more. Or choose from a long list of memcached interfaces.</p><h3>Data Storage At Scale</h3><p>Written with elasticity and scale at its core, IronCache is built using high-performance languages designed for concurrency.</p><h3>23/7 Chat Support</h3><p>The people building IronCache every day staff a public chat room, ready to answer questions and help you.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9vpptk4egv6wch25gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'messaging',
          products: emptyProducts,
        },
        {
          label: 'memory-store',
          products: emptyProducts,
        },
      ],
      displayName: 'IronMQ',
      documentationUrl: 'http://dev.iron.io/',
      id: '234tv2aj7n5vf7zc7hbqzvxeft91e',
      images: ['https://cdn.manifold.co/providers/iron-io/screenshots/mq-lowres.png'],
      label: 'iron_mq',
      logoUrl: 'https://cdn.manifold.co/providers/iron-io/logos/mq-200x200.png',
      plans: paidPlans,
      provider: {
        id: '23423wffqvcmbdyyktzjy9wu6d120',
        displayName: 'Iron.io',
        label: 'iron',
        logoUrl: 'https://cdn.manifold.co/providers/iron-io/logos/company-300x300.png',
        supportEmail: 'support@iron.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@iron.io',
      tagline: 'Highly Available, Lightning Fast Message Queue Starting at $9.99/mo.',
      termsUrl: '<https://www.iron.io/terms>',
      valueProps: [
        {
          header: 'Instant and Elastic Message Queuing',
          body:
            'Just connect to IronMQ endpoints and you have instant access to unlimited message queueing.',
        },
        {
          header: 'Messaging at Scale',
          body:
            'Written with elasticity and scale at its core, IronMQ is built using Go, a high-performance language designed for concurrency.',
        },
        {
          header: 'Durable and Secure',
          body:
            'IronMQ offers message persistence and redundancy right from the start so your queues are durable and highly available.',
        },
        {
          header: 'Use Language of Your Choice',
          body:
            'Make use of a large set of IronMQ language libraries including Ruby, PHP, Python, Java, .NET, Go, and more.',
        },
      ],
      valuePropsHtml:
        '<h3>Instant and Elastic Message Queuing</h3><p>Just connect to IronMQ endpoints and you have instant access to unlimited message queueing.</p><h3>Messaging at Scale</h3><p>Written with elasticity and scale at its core, IronMQ is built using Go, a high-performance language designed for concurrency.</p><h3>Durable and Secure</h3><p>IronMQ offers message persistence and redundancy right from the start so your queues are durable and highly available.</p><h3>Use Language of Your Choice</h3><p>Make use of a large set of IronMQ language libraries including Ruby, PHP, Python, Java, .NET, Go, and more.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9vpptk4ehh70ybqddh66vkm60h2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'worker',
          products: emptyProducts,
        },
      ],
      displayName: 'IronWorker',
      documentationUrl: 'http://dev.iron.io/',
      id: '234we3e052j7aywctt4ut62yxkddj',
      images: ['https://cdn.manifold.co/providers/iron-io/screenshots/worker-lowres.png'],
      label: 'iron_worker',
      logoUrl: 'https://cdn.manifold.co/providers/iron-io/logos/worker-200x200.png',
      plans: paidPlans,
      provider: {
        id: '23423wffqvcmbdyyktzjy9wu6d120',
        displayName: 'Iron.io',
        label: 'iron',
        logoUrl: 'https://cdn.manifold.co/providers/iron-io/logos/company-300x300.png',
        supportEmail: 'support@iron.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@iron.io',
      tagline: 'Highly available and scalable task queue / worker service. Starting at $26/mo.',
      termsUrl: '<https://www.iron.io/terms>',
      valueProps: [
        {
          header: 'Workers at Scale',
          body:
            'Run tens, hundreds, or thousands of tasks – chunks of functionality in your application – at once. No need to stand up servers or manage queues.',
        },
        {
          header: 'Painless Setup',
          body:
            "Workers are not platform-specific. Write code like you would for your own machine. There's no lock-in, nothing to change in your code.",
        },
        {
          header: 'Distributed, Asynchronous Processing',
          body:
            'Tasks queues provide a simple solution to distribute workloads across a system, processing them asynchronously. This allows your application to elastically scale and provides strong reliability.',
        },
        {
          header: 'Highly Concurrent Processing',
          body:
            'Distribute your work horizontally across thousands of cores. Workers run across our entire cloud, making it possible to reduce jobs that took ten hours to jobs that take ten minutes.',
        },
        {
          header: 'Hosted Environment',
          body:
            'Stop worrying about servers and maintenance. Our elastic infrastructure is a secure, managed environment that scales with your application. Focus on your code, not your servers.',
        },
      ],
      valuePropsHtml:
        '<h3>Workers at Scale</h3><p>Run tens, hundreds, or thousands of tasks – chunks of functionality in your application – at once. No need to stand up servers or manage queues.</p><h3>Painless Setup</h3><p>Workers are not platform-specific. Write code like you would for your own machine. There&#39;s no lock-in, nothing to change in your code.</p><h3>Distributed, Asynchronous Processing</h3><p>Tasks queues provide a simple solution to distribute workloads across a system, processing them asynchronously. This allows your application to elastically scale and provides strong reliability.</p><h3>Highly Concurrent Processing</h3><p>Distribute your work horizontally across thousands of cores. Workers run across our entire cloud, making it possible to reduce jobs that took ten hours to jobs that take ten minutes.</p><h3>Hosted Environment</h3><p>Stop worrying about servers and maintenance. Our elastic infrastructure is a secure, managed environment that scales with your application. Focus on your code, not your servers.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mdnt64wb5cgt38d1r69j66dbm6tn74e125gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
      ],
      displayName: 'JawsDB Maria',
      documentationUrl: 'https://jawsdb.com/docs',
      id: '234wx0gvvxnqxyukyn6r7xgy9qm6u',
      images: [
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
      ],
      label: 'jawsdb-maria',
      logoUrl: 'https://cdn.manifold.co/providers/jawsdb/logos/vd83rdtn50m0zb0yk9qzdqgz7m.png',
      plans: paidPlans,
      provider: {
        id: '2346mdxcuca9ez2n93f72nb2fpjgu',
        displayName: 'JawsDB',
        label: 'jawsdb',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: 'support@jawsdb.com',
      tagline: 'Fast, reliable, no-bullshark MariaDB as a Service',
      termsUrl: '',
      valueProps: [
        {
          header: 'Improving on the Best',
          body:
            'MariaDB is a completely open source drop-in replacement for MySQL from one of the original developers of MySQL. Not only does MySQL code run ‘swimmingly’ on MariaDB, but Maria also adds several enhancements and features to the database you already know and love.',
        },
        {
          header: 'Backups',
          body:
            'In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.',
        },
        {
          header: 'Databites',
          body:
            'Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!',
        },
        {
          header: 'Scale',
          body:
            "Regardless of how big of a wave you're riding, JawsDB makes it easy to scale your database performance.",
        },
        {
          header: 'Stay in Control',
          body:
            'For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.',
        },
        {
          header: 'Data Replication',
          body:
            "The world doesn't need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.",
        },
      ],
      valuePropsHtml:
        '<h3>Improving on the Best</h3><p>MariaDB is a completely open source drop-in replacement for MySQL from one of the original developers of MySQL. Not only does MySQL code run ‘swimmingly’ on MariaDB, but Maria also adds several enhancements and features to the database you already know and love.</p><h3>Backups</h3><p>In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.</p><h3>Databites</h3><p>Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!</p><h3>Scale</h3><p>Regardless of how big of a wave you&#39;re riding, JawsDB makes it easy to scale your database performance.</p><h3>Stay in Control</h3><p>For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.</p><h3>Data Replication</h3><p>The world doesn&#39;t need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mdnt64wb5cgt38d1r69j6cd9tdrt6pc125gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
      ],
      displayName: 'JawsDB MySQL',
      documentationUrl: 'https://jawsdb.com/docs',
      id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
      images: [
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
      ],
      label: 'jawsdb-mysql',
      logoUrl: 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png',
      plans: paidPlans,
      provider: {
        id: '2346mdxcuca9ez2n93f72nb2fpjgu',
        displayName: 'JawsDB',
        label: 'jawsdb',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: 'support@jawsdb.com',
      tagline: 'Fast, reliable, no-bullshark MySQL as a Service',
      termsUrl: '',
      valueProps: [
        {
          header: 'Trust in Jaws',
          body:
            'Get access to the same database trusted by sites such as Google, Facebook, Twitter, Youtube, and more.',
        },
        {
          header: 'Backups',
          body:
            'In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.',
        },
        {
          header: 'Databites',
          body:
            'Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!',
        },
        {
          header: 'Scale',
          body:
            "Regardless of how big of a wave you're riding, JawsDB makes it easy to scale your database performance.",
        },
        {
          header: 'Stay in Control',
          body:
            'For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.',
        },
        {
          header: 'Data Replication',
          body:
            "The world doesn't need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.",
        },
      ],
      valuePropsHtml:
        '<h3>Trust in Jaws</h3><p>Get access to the same database trusted by sites such as Google, Facebook, Twitter, Youtube, and more.</p><h3>Backups</h3><p>In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.</p><h3>Databites</h3><p>Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!</p><h3>Scale</h3><p>Regardless of how big of a wave you&#39;re riding, JawsDB makes it easy to scale your database performance.</p><h3>Stay in Control</h3><p>For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.</p><h3>Data Replication</h3><p>The world doesn&#39;t need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mdnt64wb5cgt38d1r69kp8y3me4w78xkacdq3jvhjdcr24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'database',
          products: emptyProducts,
        },
      ],
      displayName: 'JawsDB PostgreSQL',
      documentationUrl: 'https://jawsdb.com/docs',
      id: '234udujapvu1yg2fq019qt02ynf1m',
      images: [
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
      ],
      label: 'jawsdb-postgres',
      logoUrl: 'https://cdn.manifold.co/providers/jawsdb/logos/rm2ru508t4b2wtzy33y21xm870.png',
      plans: paidPlans,
      provider: {
        id: '2346mdxcuca9ez2n93f72nb2fpjgu',
        displayName: 'JawsDB',
        label: 'jawsdb',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: 'support@jawsdb.com',
      tagline: 'Fast, reliable, no-bullshark Postgres as a Service',
      termsUrl: '',
      valueProps: [
        {
          header: 'A Perfect Match for the Web',
          body:
            'Postgres is a highly advanced open source database that boasts a robust set of extensions allowing it to map geographic data (PostGIS), query remote tables as if they were local (postgres_fdw), closely monitor execution statistics (pg_stat_statements), and many more.',
        },
        {
          header: 'Backups',
          body:
            'In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.',
        },
        {
          header: 'Databites',
          body:
            'Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!',
        },
        {
          header: 'Scale',
          body:
            "Regardless of how big of a wave you're riding, JawsDB makes it easy to scale your database performance.",
        },
        {
          header: 'Stay in Control',
          body:
            'For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.',
        },
        {
          header: 'Data Replication',
          body:
            "The world doesn't need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.",
        },
      ],
      valuePropsHtml:
        '<h3>A Perfect Match for the Web</h3><p>Postgres is a highly advanced open source database that boasts a robust set of extensions allowing it to map geographic data (PostGIS), query remote tables as if they were local (postgres_fdw), closely monitor execution statistics (pg_stat_statements), and many more.</p><h3>Backups</h3><p>In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.</p><h3>Databites</h3><p>Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!</p><h3>Scale</h3><p>Regardless of how big of a wave you&#39;re riding, JawsDB makes it easy to scale your database performance.</p><h3>Stay in Control</h3><p>For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.</p><h3>Data Replication</h3><p>The world doesn&#39;t need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1me9v7cdtrd0vk8ch25gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'logging',
          products: emptyProducts,
        },
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'LogDNA',
      documentationUrl: 'https://docs.logdna.com/docs/',
      id: '234qkjvrptpy3thna4qttwt7m2nf6',
      images: [
        'https://cdn.manifold.co/providers/logdna/logdna/images/1ew2g2d9bahjjdvrcyd7k71nwr.png',
        'https://cdn.manifold.co/providers/logdna/logdna/images/4uy1kt8we9nzbnehyzev94117m.png',
        'https://cdn.manifold.co/providers/logdna/logdna/images/nawd3ffc9nwpkw6347b8y8whgw.png',
      ],
      label: 'logdna',
      logoUrl: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
      plans: freePlans,
      provider: {
        id: '23409yv8yfy06gt8553wzz5x8k164',
        displayName: 'LogDNA',
        label: 'logdna',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://docs.logdna.com" rel="nofollow">Select a code library from the LogDNA documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Configure the logger with your API key</p>\n</li><li><p>Start your application</p>\n</li><li><p>Monitor your logs from the LogDNA dashboard</p>\n</li></ol>',
      state: ProductState.Available,
      supportEmail: 'support@logdna.com',
      tagline:
        'Real-time log aggregation, monitoring, and analysis from any platform, at any volume',
      termsUrl: 'https://logdna.com/terms.html',
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
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ment64eb4d1nq2rbpcwh2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'messaging',
          products: emptyProducts,
        },
      ],
      displayName: 'Mailgun',
      documentationUrl: 'https://documentation.mailgun.com/',
      id: '234mauvfd213a0a87q42eb0mmq5ye',
      images: [
        'https://cdn.manifold.co/providers/mailgun/mailgun/images/zkj2ruj3wtbnbyjy6ynrhcc85r.png',
        'https://cdn.manifold.co/providers/mailgun/mailgun/images/qdjte3ux3q4jvvx3a7ze6f078g.png',
        'https://cdn.manifold.co/providers/mailgun/mailgun/images/5bf55h4dxkvqge5ujyj5mj9260.png',
      ],
      label: 'mailgun',
      logoUrl: 'https://cdn.manifold.co/providers/mailgun/logos/q922nwncyuw263chbg86e0rw1m.png',
      plans: freePlans,
      provider: {
        id: '234ae8fx4ud4wqj7q0vy7vhjxvjb6',
        displayName: 'Mailgun',
        label: 'mailgun',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: 'help@mailgun.com',
      tagline: 'The Email Service For Developers',
      termsUrl: 'https://www.mailgun.com/terms',
      valueProps: [
        {
          header: 'Engineered for developers for reliability',
          body:
            "Everything is built API first with a focus on simplicity and compliance to standards. We're serious about uptime and we have the track record to prove it.",
        },
        {
          header: 'Help when you need it',
          body: 'Have a question? Our support team is available 24/7/365.',
        },
        {
          header: 'Powerful sending infrastructure',
          body:
            'Easy SMTP integration and a simple, RESTful API abstracts away the messy details of sending transactional or bulk email. Scale quickly, whether you need to send 10 or 10 million emails.',
        },
        {
          header: 'Intelligent inbound routing & storage',
          body:
            'Route and forward email directly into your app or inbox. Email parsing turns your emails into easy-to-digest structured data and spam filtering keeps out unwanted emails.',
        },
        {
          header: 'Tracking and analytics',
          body:
            'Searchable logs mean you always know what is happening to your email while tags make it easy to A/B test and report on your data, and all via our webhooks.',
        },
        {
          header: 'Email validation',
          body:
            'Advanced email validation increases your conversions. Our jQuery plugin enables you to integrate it into your web forms fast.',
        },
      ],
      valuePropsHtml:
        '<h3>Engineered for developers for reliability</h3><p>Everything is built API first with a focus on simplicity and compliance to standards. We&#39;re serious about uptime and we have the track record to prove it.</p><h3>Help when you need it</h3><p>Have a question? Our support team is available 24/7/365.</p><h3>Powerful sending infrastructure</h3><p>Easy SMTP integration and a simple, RESTful API abstracts away the messy details of sending transactional or bulk email. Scale quickly, whether you need to send 10 or 10 million emails.</p><h3>Intelligent inbound routing &amp; storage</h3><p>Route and forward email directly into your app or inbox. Email parsing turns your emails into easy-to-digest structured data and spam filtering keeps out unwanted emails.</p><h3>Tracking and analytics</h3><p>Searchable logs mean you always know what is happening to your email while tags make it easy to A/B test and report on your data, and all via our webhooks.</p><h3>Email validation</h3><p>Advanced email validation increases your conversions. Our jQuery plugin enables you to integrate it into your web forms fast.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1menu64t1rchkq0dkn6cwp6vkm60h2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'memory-store',
          products: emptyProducts,
        },
      ],
      displayName: 'MemCachier',
      documentationUrl: 'https://www.memcachier.com/documentation',
      id: '234yu3bya4z0t6zwrpvgbfbxrwabp',
      images: [
        'https://cdn.manifold.co/providers/memcachier/cache/images/2bwrkmxyp0tg60pbnmctfcnqmw.png',
        'https://cdn.manifold.co/providers/memcachier/cache/images/8q3dkv453pv2qgmfa5c3x259rg.png',
        'https://cdn.manifold.co/providers/memcachier/cache/images/aw8dngvbj1dteaurt9en0ccrj8.png',
      ],
      label: 'memcachier-cache',
      logoUrl: 'https://cdn.manifold.co/providers/memcachier/logos/8gugjy54514r5hev172up4ecug.png',
      plans: freePlans,
      provider: {
        id: '2344d2uxdefmte1j7vpthnu7qr0er',
        displayName: 'Memcachier',
        label: 'memcachier',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://www.memcachier.com/documentation/client-library-support" rel="nofollow">Select a client library from the Memcachier documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Configure the client with your credentials</p>\n</li><li><p>Start setting and getting values from your application</p>\n</li></ol>',
      state: ProductState.Available,
      supportEmail: 'support@memcachier.com',
      tagline: 'Reliable and powerful memcache-as-a-service.',
      termsUrl: 'https://www.memcachier.com/legal/tos',
      valueProps: [
        {
          header: 'Reliably High-Performance',
          body:
            'MemCachier is a completely new memcache implementation built from the ground up to perform well in the cloud.',
        },
        {
          header: 'Scale With Ease',
          body:
            'Our production plans can be scaled instantly with a single command from you. No loss of data, just scale up or down as your application needs change.',
        },
        {
          header: 'High Availability',
          body:
            'All production cache’s are replicated and spread over many servers. If a node fails, you’re instantly switched to a new server for uninterrupted service.',
        },
        {
          header: 'Analytics Dashboard',
          body:
            'Our analytics dashboard gives you usage insights to help you get more out of your cache. We also support integration with New Relic.',
        },
        {
          header: 'Expert Support',
          body:
            'All plans come with support from memcache experts. You’ll speak directly with engineers who’ve built the service. Contact us via email, gchat, irc or phone!',
        },
        {
          header: 'Proven Team & Technology',
          body: "We've been in production since 2012 and support over 30,000 customers",
        },
      ],
      valuePropsHtml:
        '<h3>Reliably High-Performance</h3><p>MemCachier is a completely new memcache implementation built from the ground up to perform well in the cloud.</p><h3>Scale With Ease</h3><p>Our production plans can be scaled instantly with a single command from you. No loss of data, just scale up or down as your application needs change.</p><h3>High Availability</h3><p>All production cache’s are replicated and spread over many servers. If a node fails, you’re instantly switched to a new server for uninterrupted service.</p><h3>Analytics Dashboard</h3><p>Our analytics dashboard gives you usage insights to help you get more out of your cache. We also support integration with New Relic.</p><h3>Expert Support</h3><p>All plans come with support from memcache experts. You’ll speak directly with engineers who’ve built the service. Contact us via email, gchat, irc or phone!</p><h3>Proven Team &amp; Technology</h3><p>We&#39;ve been in production since 2012 and support over 30,000 customers</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mf5kp4vk5d1pk4xvnc9k24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'authentication',
          products: emptyProducts,
        },
      ],
      displayName: 'OAuth.io',
      documentationUrl: 'https://docs.oauth.io/',
      id: '234mbngepc31ebkb0dp7j12b7ukjy',
      images: [
        'https://cdn.manifold.co/providers/oauth-io/screenshots/1-homepage.png',
        'https://cdn.manifold.co/providers/oauth-io/screenshots/2-providers.png',
        'https://cdn.manifold.co/providers/oauth-io/screenshots/3-100providers.png',
        'https://cdn.manifold.co/providers/oauth-io/screenshots/4-analytics.png',
        'https://cdn.manifold.co/providers/oauth-io/screenshots/5-user-management.png',
        'https://cdn.manifold.co/providers/oauth-io/screenshots/7-oauth-server.png',
      ],
      label: 'oauth-io',
      logoUrl: 'https://cdn.manifold.co/providers/oauth-io/60x60.png',
      plans: paidPlans,
      provider: {
        id: '23466043urzgmmhkarudemqv28t8g',
        displayName: 'OAuth.io',
        label: 'oauth-io',
        logoUrl: 'https://cdn.manifold.co/providers/oauth-io/60x60.png',
        supportEmail: 'support@oauth.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: 'support@oauth.io',
      tagline:
        'OAuth that just works. Choose from 100+ OAuth providers and integrate with them in minutes',
      termsUrl: 'https://oauth.io/terms',
      valueProps: [],
      valuePropsHtml: '',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61m34dk1chpkcukmddpj4b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'worker',
          products: emptyProducts,
        },
      ],
      displayName: 'PDFShift',
      documentationUrl: 'https://pdfshift.io/documentation',
      id: '234k06n0t66x48t5x1gbb0z3v3d4c',
      images: [
        'https://cdn.manifold.co/providers/pdfshift/screenshots/d98ba380-7927-411e-a255-40a7ffa7bf33.png',
        'https://cdn.manifold.co/providers/pdfshift/screenshots/ef2badc1-5167-467d-b679-fbe9011edaae.png',
        'https://cdn.manifold.co/providers/pdfshift/screenshots/b99effba-284d-4928-b9b9-2953b27e7bf5.png',
      ],
      label: 'pdfshift',
      logoUrl:
        'https://cdn.manifold.co/providers/pdfshift/logos/2cfcefe3-ba37-4530-881a-0e1257a3c91f.png',
      plans: freePlans,
      provider: {
        id: '2349hyewy8azqf8e1m1e7728m2v12',
        displayName: 'PDFShift',
        label: 'pdfshift',
        logoUrl: 'https://cdn.manifold.co/providers/pdfshift/logos/pdfshift_logo.png',
        supportEmail: 'support@pdfshift.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://docs.pdfshift.io" rel="nofollow">Review the PDFShift request parameters</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Generate your first PDF over HTTP using the convert endpoint</p>\n</li></ol>',
      state: ProductState.New,
      supportEmail: 'support@pdfshift.io',
      tagline: 'Convert HTML documents to PDF in one simple POST request!',
      termsUrl: 'https://pdfshift.io/terms',
      valueProps: [
        {
          header: 'High-Quality PDF',
          body: 'Generate a fully structured, high-quality PDF document, in a few seconds only.',
        },
        {
          header: 'Free to start',
          body: 'Convert up to 250 documents per month for free. Start to pay after.',
        },
        {
          header: 'Reliable',
          body:
            'Our cluster of servers can handle many simultaneous requests, and with large files.',
        },
        {
          header: 'Easy to implement',
          body:
            'Our API has been built for developer specifically, resulting in a quick learning curve. Simple, complete, elegant.',
        },
        {
          header: 'Secure',
          body: 'Requests are made over SSL and the documents generated are never stored.',
        },
      ],
      valuePropsHtml:
        '<h3>High-Quality PDF</h3><p>Generate a fully structured, high-quality PDF document, in a few seconds only.</p><h3>Free to start</h3><p>Convert up to 250 documents per month for free. Start to pay after.</p><h3>Reliable</h3><p>Our cluster of servers can handle many simultaneous requests, and with large files.</p><h3>Easy to implement</h3><p>Our API has been built for developer specifically, resulting in a quick learning curve. Simple, complete, elegant.</p><h3>Secure</h3><p>Requests are made over SSL and the documents generated are never stored.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61up4eb4ewh2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'Piio',
      documentationUrl: 'https://piio.co/docs',
      id: '234vvhkmmpg2mtvr7vqpf1b439y9y',
      images: [
        'https://cdn.manifold.co/providers/piio/screenshots/1.png',
        'https://cdn.manifold.co/providers/piio/screenshots/2.png',
        'https://cdn.manifold.co/providers/piio/screenshots/3.png',
      ],
      label: 'piio',
      logoUrl: 'https://cdn.manifold.co/providers/piio/logos/512x512.png',
      plans: freePlans,
      provider: {
        id: '23411q5cm1tycd507awqnqzdeenvc',
        displayName: 'Piio',
        label: 'piio',
        logoUrl: 'https://cdn.manifold.co/providers/piio/logos/512x512.png',
        supportEmail: 'support@piio.co',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@piio.co',
      tagline: 'Never optimize an image again, automatic image optimization for your website.',
      termsUrl: '<https://app.piio.co/terms>',
      valueProps: [
        {
          header: 'Cross device experience',
          body:
            'Don’t worry about multiple resolutions or mobile devices, Piio automatically loads the best image for each device. Including Hi-DPR (Retina) support and Super Fast Device Detection.',
        },
        {
          header: 'Automatic Responsive Images',
          body:
            "We learn from your html and deliver pixel perfect images, they don't only load faster but they'll look better.",
        },
        {
          header: 'CDN Delivered',
          body:
            'With worldwide reach, our CDN provides low latency and faster download times. We also provide 160 edges and regional caches worldwide.',
        },
        {
          header: 'Super easy to integrate!',
          body:
            "Copy and paste one code in the html and you're done! You don't need to change anything on your backend or how you store your images.",
        },
        {
          header: 'Scales to your needs',
          body: 'Piio is cloud based and scales with your needs.',
        },
        {
          header: 'Real-time Image Optimization',
          body:
            'We help your website load faster by optimizing your images in real time and deliver them to your visitors at maximum speed. Expect better image quality, faster load times and more conversions.',
        },
        {
          header: 'WebP support, MozJPEG support',
          body: 'Piio can deliver images in WebP or MozJPEG format every time browser supports it.',
        },
        {
          header: 'Advanced configuration',
          body:
            'For those with more needs, Piio provides custom advanced parameters like: Piio mode (to choose how to use Piio), Lazy loading (to improve the site load and user experience), Dev mode (it’s a great feature if in your development environment you need to serve your images from your machine), Disable Webp (for those that do not need WebP format at all), Crop (in case you also need to crop an image).',
        },
      ],
      valuePropsHtml:
        '<h3>Cross device experience</h3><p>Don’t worry about multiple resolutions or mobile devices, Piio automatically loads the best image for each device. Including Hi-DPR (Retina) support and Super Fast Device Detection.</p><h3>Automatic Responsive Images</h3><p>We learn from your html and deliver pixel perfect images, they don&#39;t only load faster but they&#39;ll look better.</p><h3>CDN Delivered</h3><p>With worldwide reach, our CDN provides low latency and faster download times. We also provide 160 edges and regional caches worldwide.</p><h3>Super easy to integrate!</h3><p>Copy and paste one code in the html and you&#39;re done! You don&#39;t need to change anything on your backend or how you store your images.</p><h3>Scales to your needs</h3><p>Piio is cloud based and scales with your needs.</p><h3>Real-time Image Optimization</h3><p>We help your website load faster by optimizing your images in real time and deliver them to your visitors at maximum speed. Expect better image quality, faster load times and more conversions.</p><h3>WebP support, MozJPEG support</h3><p>Piio can deliver images in WebP or MozJPEG format every time browser supports it.</p><h3>Advanced configuration</h3><p>For those with more needs, Piio provides custom advanced parameters like: Piio mode (to choose how to use Piio), Lazy loading (to improve the site load and user experience), Dev mode (it’s a great feature if in your development environment you need to serve your images from your machine), Disable Webp (for those that do not need WebP format at all), Crop (in case you also need to crop an image).</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61v7cuv5d1pkcybpeth24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'worker',
          products: emptyProducts,
        },
        {
          label: 'messaging',
          products: emptyProducts,
        },
      ],
      displayName: 'Posthook',
      documentationUrl: 'https://docs.posthook.io/',
      id: '234unyrqtdvmyk71qf3cgapdrn9wj',
      images: [
        'https://cdn.manifold.co/providers/posthook/screenshots/32bb056e-9c74-4229-b393-99597fcd9833.png',
        'https://cdn.manifold.co/providers/posthook/screenshots/f3210722-60eb-4320-8228-3283323d3e5d.png',
        'https://cdn.manifold.co/providers/posthook/screenshots/0b743185-49e7-4d6a-bca1-3eaee7aa67a5.png',
        'https://cdn.manifold.co/providers/posthook/screenshots/1b7ed459-4e9d-4994-9c40-598b6664bdd0.png',
        'https://cdn.manifold.co/providers/posthook/screenshots/e94f9e64-c4d8-4104-81f1-a60847f47881.png',
      ],
      label: 'posthook',
      logoUrl:
        'https://cdn.manifold.co/providers/posthook/logos/0479c2e7-5bae-42b3-b8ca-5f2b2640386e.png',
      plans: freePlans,
      provider: {
        id: '23480zdan3x3ydz25dy1mr8pug50p',
        displayName: 'Posthook',
        label: 'posthook',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@posthook.io',
      tagline: 'Simple, Robust Job Scheduling For Your Application',
      termsUrl: 'https://posthook.io/terms',
      valueProps: [
        {
          header: 'Use your Existing Infrastructure',
          body:
            'No need to set up and manage additional infrastructure. Works with any HTTP-based backends, including serverless ones.',
        },
        {
          header: 'Architected for Reliability',
          body:
            'Posthook is hosted on multiple Google Cloud Platform availability zones and leverages highly available systems.',
        },
        {
          header: 'Secure',
          body:
            'Requests to your servers are made over HTTPS and cryptographically signed so they can be verified to be legitimate.',
        },
        {
          header: 'Rich Dashboard',
          body: 'Manage your projects and see the status of your scheduled requests at a glance.',
        },
        {
          header: 'Failure Notifications',
          body:
            'Get instantly notified when we are not able to complete a scheduled request to your application.',
        },
        {
          header: 'Custom Retries',
          body:
            'Configure the number of times Posthook retries scheduled requests and the delay between each retry.',
        },
      ],
      valuePropsHtml:
        '<h3>Use your Existing Infrastructure</h3><p>No need to set up and manage additional infrastructure. Works with any HTTP-based backends, including serverless ones.</p><h3>Architected for Reliability</h3><p>Posthook is hosted on multiple Google Cloud Platform availability zones and leverages highly available systems.</p><h3>Secure</h3><p>Requests to your servers are made over HTTPS and cryptographically signed so they can be verified to be legitimate.</p><h3>Rich Dashboard</h3><p>Manage your projects and see the status of your scheduled requests at a glance.</p><h3>Failure Notifications</h3><p>Get instantly notified when we are not able to complete a scheduled request to your application.</p><h3>Custom Retries</h3><p>Configure the number of times Posthook retries scheduled requests and the delay between each retry.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61vppdb3ehkq0d32dctp8u3he5gq8c125gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'utility',
          products: emptyProducts,
        },
      ],
      displayName: 'Prefab.cloud',
      documentationUrl: 'https://www.prefab.cloud/documentation/getting_started',
      id: '234j199gnaggg2qj6fvey2m3gw1nc',
      images: [
        'https://cdn.manifold.co/providers/prefab/screenshots/f7c125bc-6049-4b76-8f50-db594797f4fb.png',
        'https://cdn.manifold.co/providers/prefab/screenshots/36fde154-2e26-4447-9f08-72eae58d4f2b.png',
        'https://cdn.manifold.co/providers/prefab/screenshots/f31a0889-e1dc-4eca-a1a5-08e23abc2d86.png',
      ],
      label: 'prefab',
      logoUrl:
        'https://cdn.manifold.co/providers/prefab/logos/b0f0b014-4063-4588-bc65-1da31f3fc187.png',
      plans: freePlans,
      provider: {
        id: '2340cfzebyhmuhemk5qubj0w3zvz4',
        displayName: 'Prefab',
        label: 'prefab',
        logoUrl: 'https://cdn.manifold.co/providers/prefab/logos/126x126.png',
        supportEmail: 'hello@prefab.cloud',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'hello@prefab.cloud',
      tagline: 'Feature Flags, RateLimits & RemoteConfig. Microservices as a Service.',
      termsUrl: 'https://www.prefab.cloud/terms_of_service',
      valueProps: [
        {
          header: 'Rate Limits',
          body:
            "Fast, efficient, bombproof and cost-effective rate limiting libraries that don't require any Redis/Memcached on your end.",
        },
        {
          header: 'Feature Flags',
          body:
            "Don't leave home without them. Feature flags enable Moving Fast and Breaking Less. Our flags can be: on, off, on for a percentage of your traffic and on for specific users or users that match specific criteria.",
        },
        {
          header: 'Distributed/Remote Config',
          body:
            'Want a reliable distributed config like Consul / Zookeeper that works out of the box and is cost-effective?',
        },
        {
          header: 'Deduplication',
          body:
            "Only want to send the 'Welcome Email' once per person, but have some nasty race conditions that could lead to doing it twice? Put an eternal semaphore for 'welcome-email:bob@example.com' and let us store that forever. Easy idempotency as a service.",
        },
        {
          header: 'Scales to millions of individual limits',
          body:
            "Paying your usage tracking service by the event? Do you really need to send an event for Bob _every_ time he clicks? How about only sending bob's unique events every 5 minutes? Let's decimate that bill.",
        },
        {
          header: 'Batteries Included',
          body:
            'Open source libraries included for Node, Ruby, Java & C#. gRPC provides robust extensible support for other languages.',
        },
      ],
      valuePropsHtml:
        '<h3>Rate Limits</h3><p>Fast, efficient, bombproof and cost-effective rate limiting libraries that don&#39;t require any Redis/Memcached on your end.</p><h3>Feature Flags</h3><p>Don&#39;t leave home without them. Feature flags enable Moving Fast and Breaking Less. Our flags can be: on, off, on for a percentage of your traffic and on for specific users or users that match specific criteria.</p><h3>Distributed/Remote Config</h3><p>Want a reliable distributed config like Consul / Zookeeper that works out of the box and is cost-effective?</p><h3>Deduplication</h3><p>Only want to send the &#39;Welcome Email&#39; once per person, but have some nasty race conditions that could lead to doing it twice? Put an eternal semaphore for &#39;welcome-email:bob@example.com&#39; and let us store that forever. Easy idempotency as a service.</p><h3>Scales to millions of individual limits</h3><p>Paying your usage tracking service by the event? Do you really need to send an event for Bob _every_ time he clicks? How about only sending bob&#39;s unique events every 5 minutes? Let&#39;s decimate that bill.</p><h3>Batteries Included</h3><p>Open source libraries included for Node, Ruby, Java &amp; C#. gRPC provides robust extensible support for other languages.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61vpptk4dtn72e3n6cupavkmcwh2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'Prometheus',
      documentationUrl: 'https://hostedmetrics.com/documentation/',
      id: '234pbjjvexny04ft9fn78hf2r9pnj',
      images: [],
      label: 'hostedmetrics-prometheus',
      logoUrl:
        'https://cdn.manifold.co/providers/hostedmetrics/logos/f64dc325-e826-4b06-ba0f-6e1c4550a8d8.png',
      plans: paidPlans,
      provider: {
        id: '234102an6n5u3dac04nkenx1mchj8',
        displayName: 'HostedMetrics',
        label: 'hostedmetrics',
        logoUrl: 'https://cdn.manifold.co/providers/hostedmetrics/logos/hosted_metrics_logo.png',
        supportEmail: 'support@hostedmetrics.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support@hostedmetrics.com',
      tagline: 'Monitor your applications and infrastructure with Prometheus, Grafana, and StatsD',
      termsUrl: 'https://hostedmetrics.com/terms-of-use/',
      valueProps: [
        {
          header: 'Instant Start',
          body:
            'Start recording and charting your first metrics within minutes. Get up and running as hassle-free as possible by using our hosted and fully managed Prometheus and Grafana environment.',
        },
        {
          header: 'Complete Turnkey Toolset',
          body:
            "Skip the guesswork, configuration, and deployment with our complete and turnkey solution. Scrape your metrics with Prometheus' pull mechanism, remote write, or PushGateway, or simply use StatsD. Use Grafana for dashboards. Configure alerts to instantly be notified when problems arise.",
        },
        {
          header: 'Zero Maintenance',
          body:
            'Collect and make use of metrics without the hassle of running, scaling, and maintaining a metrics platform. Stop worrying about server specs, uptime, maintenance, and configuration. We take care of all the details so that you can get back to your product because you have better things to do than to babysit all the ancillary tools needed to run your business.',
        },
        {
          header: 'Drastically Lower Costs',
          body:
            "Drastically reduce your costs by using our hosted and managed tools to collect and visualize the metrics needed to understand your systems, processes, and code. We aid you in monitoring, error handling, and debugging. Also, with alerts, you'll know right away when your attention is needed.",
        },
        {
          header: 'Exceptional Support',
          body:
            "We take pride in treating you right. We address issues quickly and with care, so don't be surprised when you'll receive thoughtful messages instead of canned replies.",
        },
      ],
      valuePropsHtml:
        '<h3>Instant Start</h3><p>Start recording and charting your first metrics within minutes. Get up and running as hassle-free as possible by using our hosted and fully managed Prometheus and Grafana environment.</p><h3>Complete Turnkey Toolset</h3><p>Skip the guesswork, configuration, and deployment with our complete and turnkey solution. Scrape your metrics with Prometheus&#39; pull mechanism, remote write, or PushGateway, or simply use StatsD. Use Grafana for dashboards. Configure alerts to instantly be notified when problems arise.</p><h3>Zero Maintenance</h3><p>Collect and make use of metrics without the hassle of running, scaling, and maintaining a metrics platform. Stop worrying about server specs, uptime, maintenance, and configuration. We take care of all the details so that you can get back to your product because you have better things to do than to babysit all the ancillary tools needed to run your business.</p><h3>Drastically Lower Costs</h3><p>Drastically reduce your costs by using our hosted and managed tools to collect and visualize the metrics needed to understand your systems, processes, and code. We aid you in monitoring, error handling, and debugging. Also, with alerts, you&#39;ll know right away when your attention is needed.</p><h3>Exceptional Support</h3><p>We take pride in treating you right. We address issues quickly and with care, so don&#39;t be surprised when you&#39;ll receive thoughtful messages instead of canned replies.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tt7ccb4d1n70e3qddk68x3acwh2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'messaging',
          products: emptyProducts,
        },
      ],
      displayName: 'Scaledrone',
      documentationUrl: 'https://www.scaledrone.com/docs',
      id: '234my0gk2vuh2jhtynk2ekpzpvtfm',
      images: [
        'https://cdn.manifold.co/providers/23498wxg3tc421xbepp34xyfg555y/screenshots/5f63274a-d546-4270-bacd-cd03c6d5d78f.png',
        'https://cdn.manifold.co/providers/23498wxg3tc421xbepp34xyfg555y/screenshots/89d637fb-94d6-48ab-aab8-919b30f9b3dc.png',
      ],
      label: 'scaledrone',
      logoUrl:
        'https://cdn.manifold.co/providers/23498wxg3tc421xbepp34xyfg555y/logos/2c36aa72-a7a6-4bdc-9581-5b68a9b1981d.png',
      plans: freePlans,
      provider: {
        id: '23498wxg3tc421xbepp34xyfg555y',
        displayName: 'scaledrone',
        label: 'scaledrone',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'info@scaledrone.com',
      tagline: 'Send realtime data to your users',
      termsUrl: 'https://www.scaledrone.com/terms',
      valueProps: [
        {
          header: 'Build apps, not infrastructure',
          body:
            'Scaledrone provides features like realtime messaging, message history and user presence so you can focus on the business logic.',
        },
        {
          header: 'Scaling realtime infrastructure is complex',
          body:
            'Scaledrone makes sure you never have to feel pain when growing, whether you have a hundred or a million users.',
        },
        {
          header: 'Save time and money',
          body:
            'Let us take care of your realtime data, so you don’t have to waste endless developer hours managing infrastructure — so your developers can stay focused on building great apps.',
        },
      ],
      valuePropsHtml:
        '<h3>Build apps, not infrastructure</h3><p>Scaledrone provides features like realtime messaging, message history and user presence so you can focus on the business logic.</p><h3>Scaling realtime infrastructure is complex</h3><p>Scaledrone makes sure you never have to feel pain when growing, whether you have a hundred or a million users.</p><h3>Save time and money</h3><p>Let us take care of your realtime data, so you don’t have to waste endless developer hours managing infrastructure — so your developers can stay focused on building great apps.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tt7ctk5dtuk08hc49qq4t35e8h3myvxfm',
    node: {
      categories: [
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'Scout',
      documentationUrl: 'https://docs.scoutapm.com/',
      id: '234mh3t2j3gk00veubpxbxmzkzgtp',
      images: [
        'https://cdn.manifold.co/providers/scout/scout/images/c8v703rfqvzdabqen9cyze43h0.png',
        'https://cdn.manifold.co/providers/scout/scout/images/phd8dbw48eme2dxnvj0hynxhm4.png',
        'https://cdn.manifold.co/providers/scout/scout/images/phdafv8qgybpyewqtmckar310c.png',
      ],
      label: 'scoutapp',
      logoUrl: 'https://cdn.manifold.co/providers/scout/logos/h3z4mxt33k3ufm7rzmth0xa4r8.png',
      plans: freePlans,
      provider: {
        id: '2347kwfkggmrhazkweut9vrugc0dp',
        displayName: 'Scout',
        label: 'scout',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://docs.scoutapm.com" rel="nofollow">Select a language agent from the Scout documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Configure the agent to instrument your application</p>\n</li><li><p>Start your application</p>\n</li><li><p>Monitor your application from the Scout dashboard</p>\n</li></ol>',
      state: ProductState.Available,
      supportEmail: 'support@scoutapm.com',
      tagline:
        'Track down memory leaks, N+1s, slow code and more. For Ruby, Python, PHP, and Elixir apps',
      termsUrl: 'https://scoutapm.com/terms',
      valueProps: [
        {
          header: 'Monitor App Health',
          body:
            'Track response times by tier (ActiveRecord, Redis, MongoDB, etc), throughput, queue time, error rates, and more with zero configuration.',
        },
        {
          header: 'Database Query Analysis',
          body:
            'Scout hunts down expensive N+1 queries, tracks the number of ActiveRecord rows returned, and compares slow queries against their performance in faster requests.',
        },
        {
          header: 'Memory Leak Detection',
          body:
            'Scout continually monitors your app for requests that trigger large memory increases and pinpoints memory hotspots in your code.',
        },
        {
          header: 'GitHub CodeView',
          body:
            'Go beyond backtraces - with Scout’s GitHub integration, view relevant slow lines of code, authors, and commit dates inline with your slow transaction traces.',
        },
        {
          header: 'Weekly Performance Digest',
          body:
            'Scout analyzes your app for performance trends and outliers and emails you a summary every week.',
        },
      ],
      valuePropsHtml:
        '<h3>Monitor App Health</h3><p>Track response times by tier (ActiveRecord, Redis, MongoDB, etc), throughput, queue time, error rates, and more with zero configuration.</p><h3>Database Query Analysis</h3><p>Scout hunts down expensive N&#43;1 queries, tracks the number of ActiveRecord rows returned, and compares slow queries against their performance in faster requests.</p><h3>Memory Leak Detection</h3><p>Scout continually monitors your app for requests that trigger large memory increases and pinpoints memory hotspots in your code.</p><h3>GitHub CodeView</h3><p>Go beyond backtraces - with Scout’s GitHub integration, view relevant slow lines of code, authors, and commit dates inline with your slow transaction traces.</p><h3>Weekly Performance Digest</h3><p>Scout analyzes your app for performance trends and outliers and emails you a summary every week.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36cb5d1uq2dka6dq66e125gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'monitoring',
          products: emptyProducts,
        },
      ],
      displayName: 'StatusHub',
      documentationUrl: 'https://support.statushub.com/hc/en-us',
      id: '234yzpzhu2x4wfc2w8y6x6zv55mam',
      images: [
        'https://cdn.manifold.co/providers/statushub/screenshots/0ffa356d-e3e1-4bf7-9fc9-cb70472cf0dc.png',
        'https://cdn.manifold.co/providers/statushub/screenshots/b8c2ef8e-6764-4923-be83-ea64dc3ee049.png',
        'https://cdn.manifold.co/providers/statushub/screenshots/7c16dac4-941e-4b18-bfc2-4bb02e373120.png',
      ],
      label: 'statushub',
      logoUrl:
        'https://cdn.manifold.co/providers/statushub/logos/6bf2cdc1-dab2-44f2-84ec-0ae577e15484.png',
      plans: paidPlans,
      provider: {
        id: '2348t89cxxnwf8fjpqh5xa5ntn7kc',
        displayName: 'StatusHub',
        label: 'statushub',
        logoUrl: 'https://cdn.manifold.co/providers/statushub/logos/96x96.png',
        supportEmail: 'support@statushub.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Hidden,
      supportEmail: 'support@statushub.com',
      tagline: 'Downtime? Communicate with customers and maintain trust.',
      termsUrl: 'https://statushub.com/terms/',
      valueProps: [
        {
          header: 'Proactively connect with customers.',
          body:
            'Let customers know about planned or unplanned downtime before they find out on their own.',
        },
        {
          header: 'Build company reputation and trust.',
          body:
            'Improve customer relationships with transparent incident management processes, and demonstrate reliability and availability to potential customers.',
        },
        {
          header: 'Reduce customer service workload.',
          body:
            'Ease strain on your support team from emails, calls, and social media backlash during unannounced service outages.',
        },
        {
          header: 'Real-time incident communication.',
          body:
            'Shorten downtime with automated communication, and get systems back online with less stress.',
        },
      ],
      valuePropsHtml:
        '<h3>Proactively connect with customers.</h3><p>Let customers know about planned or unplanned downtime before they find out on their own.</p><h3>Build company reputation and trust.</h3><p>Improve customer relationships with transparent incident management processes, and demonstrate reliability and availability to potential customers.</p><h3>Reduce customer service workload.</h3><p>Ease strain on your support team from emails, calls, and social media backlash during unannounced service outages.</p><h3>Real-time incident communication.</h3><p>Shorten downtime with automated communication, and get systems back online with less stress.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n71up4rv4cwh2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'messaging',
          products: emptyProducts,
        },
      ],
      displayName: 'Till',
      documentationUrl: 'https://till.readme.io/docs',
      id: '234jqxdqzjmcr5vu8uhc8dacx3xww',
      images: [
        'https://cdn.manifold.co/providers/till/screenshots/image3.png',
        'https://cdn.manifold.co/providers/till/screenshots/image2.png',
        'https://cdn.manifold.co/providers/till/screenshots/image1.png',
      ],
      label: 'till',
      logoUrl:
        'https://cdn.manifold.co/providers/till-mobile/logos/5854b4df-8e3d-42ad-bbc7-1b2f89877ce5.png',
      plans: freePlans,
      provider: {
        id: '234fvnnbq48pxabznkaxk2upyef2y',
        displayName: 'Till Mobile',
        label: 'till-mobile',
        logoUrl: 'https://cdn.manifold.co/providers/till/logos/70x70.png',
        supportEmail: 'support@tillmobile.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Available,
      supportEmail: 'support@tillmobile.com',
      tagline: 'Your two-way SMS & Voice Microservice',
      termsUrl: 'https://tillmobile.com/terms-of-service/',
      valueProps: [
        {
          header: 'SMS & Voice Communication',
          body:
            'SMS is the leading asynchronous communication medium. Available on 4.5B phones worldwide, SMS messages generate a 45% response rate and a ~98% open rate compared to 6% and 20% for email.',
        },
        {
          header: 'Reduced Development Effort',
          body:
            'You get to focus on building out the core competencies and features of your app and let Till manage the complexity of stateful SMS conversations between your application and your users.',
        },
        {
          header: 'Scalable Infrastucture',
          body: 'Be ready when your app takes off.',
        },
        {
          header: 'Two-Way Communication',
          body: 'Not just alerts. Enable interactive SMS & Voice in your app.',
        },
        {
          header: 'Easily Send and Receive SMS Messages & Voice Calls',
          body:
            'Use our HTTP API to ask create interactions via SMS & Voice, collect real-time responses via webhook.',
        },
      ],
      valuePropsHtml:
        '<h3>SMS &amp; Voice Communication</h3><p>SMS is the leading asynchronous communication medium. Available on 4.5B phones worldwide, SMS messages generate a 45% response rate and a ~98% open rate compared to 6% and 20% for email.</p><h3>Reduced Development Effort</h3><p>You get to focus on building out the core competencies and features of your app and let Till manage the complexity of stateful SMS conversations between your application and your users.</p><h3>Scalable Infrastucture</h3><p>Be ready when your app takes off.</p><h3>Two-Way Communication</h3><p>Not just alerts. Enable interactive SMS &amp; Voice in your app.</p><h3>Easily Send and Receive SMS Messages &amp; Voice Calls</h3><p>Use our HTTP API to ask create interactions via SMS &amp; Voice, collect real-time responses via webhook.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n71up4t3375n72d32dcwp8xv76ht7cxhqcdw6uw3qeht24b12dxt68tbj48x7pzbx',
    node: {
      categories: [
        {
          label: 'logging',
          products: emptyProducts,
        },
      ],
      displayName: 'Timber.io Logging',
      documentationUrl: 'https://timber.io/docs/',
      id: '234yxhkjk8y0c3zjhcxg8brykrnuu',
      images: [
        'https://cdn.manifold.co/providers/timber/screenshots/1.png',
        'https://cdn.manifold.co/providers/timber/screenshots/2.png',
        'https://cdn.manifold.co/providers/timber/screenshots/3.png',
        'https://cdn.manifold.co/providers/timber/screenshots/4.png',
      ],
      label: 'timber-logging',
      logoUrl: 'https://cdn.manifold.co/providers/timber/logos/timber.png',
      plans: freePlans,
      provider: {
        id: '2349ev2ypwh8tecjdf21m8ky7yfhy',
        displayName: 'Timber.io',
        label: 'timber-io',
        logoUrl: 'cdn.manifold.co/providers/timber/logos/timber.png',
        supportEmail: 'support@timber.io',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@timber.io',
      tagline: 'Log better. Solve problems faster.',
      termsUrl: '&lt;https://timber.io/terms&gt;',
      valueProps: [
        {
          header: 'Modern Interface',
          body:
            'Simple, fast, low memory footprint, easy to use. The best logging interface in the industry.',
        },
        {
          header: 'Unlimited Users',
          body: 'Invite your whole team. Unrestricted access to your data.',
        },
        {
          header: 'Simple setup',
          body: 'Get up and running in minutes. Simple, copy-and-paste setup instructions.',
        },
        {
          header: '🔥 Blazing 🔥 fast search',
          body: 'From 1gb to 1tb, blazing fast regardless of the amount of data.',
        },
        {
          header: 'Multi-app support',
          body:
            'Conveniently switch between apps directly within Timber, search across all of them with ease.',
        },
        {
          header: 'Fully-featured free plans',
          body:
            'No games, fully-featured free plans, retention and all, making it perfect for your staging and development apps.',
        },
      ],
      valuePropsHtml:
        '<h3>Modern Interface</h3><p>Simple, fast, low memory footprint, easy to use. The best logging interface in the industry.</p><h3>Unlimited Users</h3><p>Invite your whole team. Unrestricted access to your data.</p><h3>Simple setup</h3><p>Get up and running in minutes. Simple, copy-and-paste setup instructions.</p><h3>🔥 Blazing 🔥 fast search</h3><p>From 1gb to 1tb, blazing fast regardless of the amount of data.</p><h3>Multi-app support</h3><p>Conveniently switch between apps directly within Timber, search across all of them with ease.</p><h3>Fully-featured free plans</h3><p>No games, fully-featured free plans, retention and all, making it perfect for your staging and development apps.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncdt64rv3dtrkcdkm70h2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'Valence',
      documentationUrl: 'https://github.com/valencenet/valence-manifests',
      id: '234kcr16xcekdjjvk0mun98rypeg0',
      images: [
        'https://cdn.manifold.co/providers/23411qpzbkv6ajn17860rvzpzcmr4/screenshots/2ac4cf0b-27d2-4de4-8578-575d4e5fa50d.png',
      ],
      label: 'valence',
      logoUrl:
        'https://cdn.manifold.co/providers/23411qpzbkv6ajn17860rvzpzcmr4/logos/a0442c01-e629-4693-9197-fcf9aa3b29f3.png',
      plans: freePlans,
      provider: {
        id: '23411qpzbkv6ajn17860rvzpzcmr4',
        displayName: 'valence',
        label: 'valence',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.Grandfathered,
      supportEmail: 'dom@valence.net',
      tagline: 'Deployment Scaling, Performance Compliance, and Cost Optimization for Kubernetes',
      termsUrl: 'https://github.com/valencenet/valence-manifests',
      valueProps: [
        {
          header: 'Easy Scaling Applications and Resource Management on Kubernetes',
          body:
            'Scaling applications on Kubernetes is hard. What should my limits and requests be? What should my replicas be? Valence determines your limits, requests, and replicas based on your applications total behaviour in response to its workload. Valence can be used as a right-sizer, an autoscaler, or a resourcing recommender. So you can set your resources correctly from the beginning.',
        },
        {
          header: 'SLA Performance Compliance for Applications',
          body:
            'Valence is built around the concept of declarative performance. Gaurentee performance compliance for your applications by declaring Service Level Objectives and have Valence resource and scale your applications to meet those.',
        },
        {
          header: 'Kubernetes Cost Optimization and Improved Resource Utility',
          body:
            'Valence learns to operate your application in the most cost effective way. By maximizing utilization, cluster density, and node usage such that performance is never degraded.',
        },
      ],
      valuePropsHtml:
        '<h3>Easy Scaling Applications and Resource Management on Kubernetes</h3><p>Scaling applications on Kubernetes is hard. What should my limits and requests be? What should my replicas be? Valence determines your limits, requests, and replicas based on your applications total behaviour in response to its workload. Valence can be used as a right-sizer, an autoscaler, or a resourcing recommender. So you can set your resources correctly from the beginning.</p><h3>SLA Performance Compliance for Applications</h3><p>Valence is built around the concept of declarative performance. Gaurentee performance compliance for your applications by declaring Service Level Objectives and have Valence resource and scale your applications to meet those.</p><h3>Kubernetes Cost Optimization and Improved Resource Utility</h3><p>Valence learns to operate your application in the most cost effective way. By maximizing utilization, cluster density, and node usage such that performance is never degraded.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncnu64ck5chrq0wkqcwh2r8kfe9j6awh279xquz8',
    node: {
      categories: [
        {
          label: 'search',
          products: emptyProducts,
        },
      ],
      displayName: 'Websolr',
      documentationUrl: 'https://docs.websolr.com',
      id: '234kw73u6y3vdgdpxqhxbr39vxdmj',
      images: [
        'https://cdn.manifold.co/providers/onemorecloud/websolr/images/77ceu24yz3ea9wu4hyvgwjjxg8.png',
        'https://cdn.manifold.co/providers/onemorecloud/websolr/images/cc7phdry12h58p54v452q2w1h4.png',
        'https://cdn.manifold.co/providers/onemorecloud/websolr/images/zz7qugpmm4jcea4em0vjpe8kwr.png',
      ],
      label: 'websolr',
      logoUrl:
        'https://cdn.manifold.co/providers/onemorecloud/logos/3mep371t3tgax3e8x5h5112wv4.png',
      plans: freePlans,
      provider: {
        id: '23411mqbvgx5eqzb1qfhqfvmn27b8',
        displayName: 'One More Cloud',
        label: 'onemorecloud',
        logoUrl: '',
        supportEmail: '',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml:
        '<ol><li><p><a href="https://docs.websolr.com/collection/24-quickstart-guides" rel="nofollow">Select a Solr client or plugin for your application</a></p>\n</li><li><p>Copy your credentials from our dashboard</p>\n</li><li><p>Configure the client or plugin with your Solr index URL</p>\n</li><li><p>Begin indexing from your application</p>\n</li></ol>',
      state: ProductState.Available,
      supportEmail: 'support@websolr.com',
      tagline: 'Solr, fully managed by the experts in hosted search at One More Cloud.',
      termsUrl: 'https://onemorecloud.com/info/terms',
      valueProps: [
        {
          header: 'Build meaningful search experiences',
          body:
            'Leverage Lucene’s search features to create immediate value for your users instead of spinning your wheels keeping Solr up and optimized.',
        },
        {
          header: 'Get support from real people who know search',
          body:
            'Our support team members are engineers. We take pride in our quick, thorough, and knowledgeable responses. There’s no one in our field that does Solr support better, or who have been doing it longer.',
        },
        {
          header: 'Never worry about availability',
          body:
            'We’ve put in the years and solved the hard problems so you don’t have to. We’re on call 24/7, with hourly offsite backups and architected for 99.99% uptime.',
        },
        {
          header: 'Rest easy with battle-tested security',
          body:
            'With features like Secure TLS Encryption and Advanced API Credentials, never worry about keeping your data secure.',
        },
        {
          header: 'Scale with Ease',
          body:
            'When it’s time to add or remove resources, easily scale your index with no downtime.',
        },
        {
          header: 'The gold standard in hosted search',
          body:
            'We don’t compromise on quality or resiliency at any level. Our unique architecture gives you the best value for your resources, without skimping on operational best practices.',
        },
      ],
      valuePropsHtml:
        '<h3>Build meaningful search experiences</h3><p>Leverage Lucene’s search features to create immediate value for your users instead of spinning your wheels keeping Solr up and optimized.</p><h3>Get support from real people who know search</h3><p>Our support team members are engineers. We take pride in our quick, thorough, and knowledgeable responses. There’s no one in our field that does Solr support better, or who have been doing it longer.</p><h3>Never worry about availability</h3><p>We’ve put in the years and solved the hard problems so you don’t have to. We’re on call 24/7, with hourly offsite backups and architected for 99.99% uptime.</p><h3>Rest easy with battle-tested security</h3><p>With features like Secure TLS Encryption and Advanced API Credentials, never worry about keeping your data secure.</p><h3>Scale with Ease</h3><p>When it’s time to add or remove resources, easily scale your index with no downtime.</p><h3>The gold standard in hosted search</h3><p>We don’t compromise on quality or resiliency at any level. Our unique architecture gives you the best value for your resources, without skimping on operational best practices.</p>',
    },
  },
  {
    cursor:
      'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ndnu64uk4f0wq0ukt64r3gt3g6twqgrhm6grk2w3teth6etbeemv62e1jcxj6gtvh71u6ptk575r6e8hc49qq4t35e8h3myvxfm',
    node: {
      categories: [
        {
          label: 'worker',
          products: emptyProducts,
        },
        {
          label: 'ai-ml',
          products: emptyProducts,
        },
      ],
      displayName: 'ZeroSix Cloud Compute Platform',
      documentationUrl: 'https://zerosix.ai/frequently-asked-questions/',
      id: '234nbp17j5zrvb2ym49647kgtyv2a',
      images: [],
      label: 'zerosix',
      logoUrl:
        'https://cdn.manifold.co/providers/zerosix/logos/4b9a4431-7ced-497d-b575-7ea741113bf3.png',
      plans: paidPlans,
      provider: {
        id: '234a6uzew2vfe1j69ntn67bf24ac0',
        displayName: 'ZeroSix',
        label: 'zerosix',
        logoUrl:
          'https://cdn.manifold.co.s3.amazonaws.com/providers/zerosix/logo/cropped-zerosix_wolf.png',
        supportEmail: 'ron@zerosix.ai',
        url: '',
      },
      settings: {
        ssoSupported: false,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@zerosix.ai',
      tagline:
        'ZeroSix Marketplace provides access to compute power specifically for Machine Learning and Artificial Intelligence.',
      termsUrl: 'https://zerosix.ai/privacy-policy/',
      valueProps: [
        {
          header: 'Powerful GPUs for up to 1/5th the price of the other cloud platforms',
          body:
            'Spend less time worrying about how much funding you need to train your models and more time working on your projects. Fully setup instances are available by the hour and come pre-installed with Docker, Keras, Scikit , NumPy, TensorFlow, Pytorch and more.',
        },
        {
          header: 'Docker Support',
          body:
            'We support a number of the most popular frameworks out of the box (and if you need something specific we can pre-configure it for you). Sometimes you might want to leverage some containers to fully unlock your agile operation. We fully support docker and nvidia-docker to ensure there are no roadblocks.',
        },
        {
          header: 'Real Support',
          body:
            'Our support team is ready to help you every step of the way. You can reach us through direct email, chat on our website or even a phone call with a real person.',
        },
        {
          header: 'Security',
          body:
            'Made with security in mind, your data and models are available to only you. Connect via SSH with identity files.',
        },
        {
          header: 'Speed',
          body:
            'All of our instances GPU enabled. This means your models get trained faster and we provide better processing power per dollar than traditional cloud vendors.',
        },
      ],
      valuePropsHtml:
        '<h3>Powerful GPUs for up to 1/5th the price of the other cloud platforms</h3><p>Spend less time worrying about how much funding you need to train your models and more time working on your projects. Fully setup instances are available by the hour and come pre-installed with Docker, Keras, Scikit , NumPy, TensorFlow, Pytorch and more.</p><h3>Docker Support</h3><p>We support a number of the most popular frameworks out of the box (and if you need something specific we can pre-configure it for you). Sometimes you might want to leverage some containers to fully unlock your agile operation. We fully support docker and nvidia-docker to ensure there are no roadblocks.</p><h3>Real Support</h3><p>Our support team is ready to help you every step of the way. You can reach us through direct email, chat on our website or even a phone call with a real person.</p><h3>Security</h3><p>Made with security in mind, your data and models are available to only you. Connect via SSH with identity files.</p><h3>Speed</h3><p>All of our instances GPU enabled. This means your models get trained faster and we provide better processing power per dollar than traditional cloud vendors.</p>',
    },
  },
  {
    cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ndnup4dv3f1n70y925gh6ywk4cnt24ekvfnyg',
    node: {
      categories: [
        {
          label: 'optimization',
          products: emptyProducts,
        },
      ],
      displayName: 'Ziggeo',
      documentationUrl: 'https://ziggeo.com/docs',
      id: '234yycr3mf5f2hrw045vuxeatnd50',
      images: [
        'https://cdn.manifold.co/providers/ziggeo/screenshots/1-instagram-like-effects.png',
        'https://cdn.manifold.co/providers/ziggeo/screenshots/3-video-analysis.jpg',
        'https://cdn.manifold.co/providers/ziggeo/screenshots/4-video-player-themes.png',
        'https://cdn.manifold.co/providers/ziggeo/screenshots/5-video-profiles.png',
        'https://cdn.manifold.co/providers/ziggeo/screenshots/6-video-recorder-themes.png',
      ],
      label: 'ziggeo',
      logoUrl: 'https://cdn.manifold.co/providers/ziggeo/logos/ziggeo.png',
      plans: paidPlans,
      provider: {
        id: '234a33rd2pxfzq9qfk0v5qdrykhcp',
        displayName: 'Ziggeo',
        label: 'ziggeo',
        logoUrl: 'https://cdn.manifold.co/providers/ziggeo/logos/ziggeo.png',
        supportEmail: 'support@ziggeo.com',
        url: '',
      },
      settings: {
        ssoSupported: true,
        credentialsSupport: ProductCredentialsSupportType.Single,
      },
      setupStepsHtml: '',
      state: ProductState.New,
      supportEmail: 'support@ziggeo.com',
      tagline:
        'Ziggeo is an award-winning cloud-based service for in-browser/in-app video recording, playback, transcoding, storage & video management.',
      termsUrl: 'https://ziggeo.com/terms',
      valueProps: [
        {
          header: 'Video Recorder',
          body:
            'Records + uploads videos from any device/browser. Supports HTML-5 / WebRTC. Mobile-friendly, responsive, and fully customizable.',
        },
        {
          header: 'Video Transcoder',
          body:
            'Automatically transcodes to all desired resolutions. No complicated settings. Highly customizable. Includes video uploader.',
        },
        {
          header: 'Video Player',
          body:
            'Plays videos across all devices/browsers. Is responsive, embeddable, and fully customizable. Comes with several predefined themes.',
        },
        {
          header: 'Video SDKs',
          body:
            'Native mobile SDKs for iOS and Android. Supports seamless video recording and video playback across all apps, browsers and devices.',
        },
        {
          header: 'Screen Recorder',
          body:
            'Ziggeo has launched the ability to record computer desktop screens right from the browser.',
        },
        {
          header: 'Video Hosting',
          body:
            'All your video hosting needs, including content delivery. Permanent or temporary hosting with moderation and workflows.',
        },
        {
          header: 'Integrations & Automated Services',
          body:
            'Plethora of different integrations to tie into your workflow and with our automated services they easily get auto pushed to any integration you need..',
        },
        {
          header: 'Video APIs',
          body:
            'All of our SDKs utilize our API and next to our server side SDKs and mobile SDKs you can easily and quickly make your own steps by utilizing our APIs directly.',
        },
      ],
      valuePropsHtml:
        '<h3>Video Recorder</h3><p>Records &#43; uploads videos from any device/browser. Supports HTML-5 / WebRTC. Mobile-friendly, responsive, and fully customizable.</p><h3>Video Transcoder</h3><p>Automatically transcodes to all desired resolutions. No complicated settings. Highly customizable. Includes video uploader.</p><h3>Video Player</h3><p>Plays videos across all devices/browsers. Is responsive, embeddable, and fully customizable. Comes with several predefined themes.</p><h3>Video SDKs</h3><p>Native mobile SDKs for iOS and Android. Supports seamless video recording and video playback across all apps, browsers and devices.</p><h3>Screen Recorder</h3><p>Ziggeo has launched the ability to record computer desktop screens right from the browser.</p><h3>Video Hosting</h3><p>All your video hosting needs, including content delivery. Permanent or temporary hosting with moderation and workflows.</p><h3>Integrations &amp; Automated Services</h3><p>Plethora of different integrations to tie into your workflow and with our automated services they easily get auto pushed to any integration you need..</p><h3>Video APIs</h3><p>All of our SDKs utilize our API and next to our server side SDKs and mobile SDKs you can easily and quickly make your own steps by utilizing our APIs directly.</p>',
    },
  },
];

export default products;
