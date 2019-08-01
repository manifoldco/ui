# Gatsby-Source-Mayflower

This is a plugin to connect gatsby to the public endpoints of our marketplace REST API and build static websites with that data!

## How to use

In your `gatsby-config.js` file, configure this plugin.

```javascript
module.exports = {
  plugins: [
    ...{
      resolve: 'gatsby-source-mayflower',
      options: {
        sources: [
          {
            source: `${process.env.CATALOG_URL}`,
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
          {
            source: `${process.env.GATEWAY_URL}`,
            name: 'gateway',
            endpoints: ['products'],
          },
        ],
      },
    },
  ],
};
```

The plugin can have multiple source, each source being one of our microservices.

Each source needs a name to be identified in gatsby and a source, the URL path defined in the env variables.

For each source, you can define endpoints, there endpoints can be a single string, which will fetch without any options, or an object with the following properties.

- _endpoint_ is the actual endpoint to call, for example, in `http://api.arigato.tools/v1/products`, `products` is the endpoint.
- _method_ is the fetch method for REST.
- _params_ is a set of params added to the query string.
- _headers_ is the headers to pass to each request.
- _body_ is the body to pass to each request.
- _requires_ is an object that defines previous endpoints that need to be fetched for this one to be fetched. It's a map of the endpoint's name and an object with the field on the required objects and the associated query param. In the above example, the plans are only fetched after the products and the query to fetch all the plans will includes all the fetched products' IDs in the query search parameters.
- _relationships_ is a map that defines all relationships to create in graphQL, allowing us to fetch related objects from other endpoints. The keys is the endpoint from which the related data was fetched and the value is the field on the current value that links to this object. Relationships are also automatically reversed, meaning that creating a products relationship on a plan will add all plans to the product automatically.

## Obtain data

The endpoint are named using a very basic format, you can fetch the data like this:

```graphql
query {
  allGetCatalogProducts {
    edges {
      node {
        id
        internal {
          type
          content
        }
        plans {
          id
        }
      }
    }
  }
}
```

Check the graphql docs in graphiql for all the details.

Note that content is a string, a transformation plugin can be used to transform it back to an object.
