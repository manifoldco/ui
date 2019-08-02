module.exports = {
  siteMetadata: {
    title: `Manifold UI`,
    description: 'The power and excitement of Manifold, all in the power of your hand!',
    author: `@manifoldco`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `static/manifold.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-typescript-checker`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/docs`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          maxDepth: 3,
        },
      },
    },
    {
      resolve: 'gatsby-source-mayflower',
      options: {
        sources: [
          {
            source: 'https://api.catalog.manifold.co/v1',
            name: 'catalog',
            endpoints: [
              'regions',
              {
                endpoint: 'providers',
              },
              {
                endpoint: 'products',
                relationships: {
                  providers: 'provider_id',
                },
              },
              {
                endpoint: 'plans',
                relationships: {
                  products: 'product_id',
                  providers: 'provider_id',
                },
                requires: {
                  products: {
                    param: 'product_id',
                    field: 'id',
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
