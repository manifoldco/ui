import React from 'react';
import { ThemeProvider } from 'styled-components';
import { graphql } from 'gatsby';
import { defineCustomElements } from '@manifoldco/ui/dist/loader';
import fetchMock from 'fetch-mock';

import Page from '../components/Page';
import theme from '../lib/theme';
import { mockPlans, mockProducts, mockProviders, mockRegions } from '../utils/mockCatalog';

fetchMock.config.fallbackToNetwork = true;
fetchMock.config.overwriteRoutes = true;

if (typeof window !== 'undefined') {
  defineCustomElements(window);
}

interface HomePageProps {
  data?: {
    home: MarkdownRemark.Data;
    page: MarkdownRemark.Data;
    toc: { edges: { node: MarkdownRemark.Data }[] };
    providers: { edges: { node: { data: Manifold.ManifoldNode } }[] };
    products: { edges: { node: { data: Manifold.ManifoldNode } }[] };
    plans: { edges: { node: { data: Manifold.ManifoldNode } }[] };
    regions: { edges: { node: { data: Manifold.ManifoldNode } }[] };
  };
}

function HomePage({ data }: HomePageProps) {
  if (!data) {
    return null;
  }
  const {
    home,
    page,
    toc: { edges },
    providers,
    products,
    plans,
    regions,
  } = data;
  const currentPage = page || home;
  const links = edges.map(({ node: { frontmatter: { title, path } } }) => {
    const link: [string, string] = [path, title];
    return link;
  });

  const catalogProviders = providers.edges.map(prod => prod.node.data);
  const catalogProducts = products.edges.map(prod => prod.node.data);
  const catalogPlans = plans.edges.map(prod => prod.node.data);
  const catalogRegions = regions.edges.map(prod => prod.node.data);
  // Mock catalog calls to always return the latest catalog data
  mockProviders(catalogProviders);
  mockProducts(catalogProducts);
  mockPlans(catalogPlans);
  mockRegions(catalogRegions);

  return (
    <ThemeProvider theme={theme}>
      <Page links={links} currentPage={currentPage} />
    </ThemeProvider>
  );
}

export const query = graphql`
  query($path: String! = "/getting-started") {
    home: markdownRemark(frontmatter: { path: { eq: "/getting-started" } }) {
      html
      frontmatter {
        example
        title
      }
    }
    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        example
        title
      }
    }
    toc: allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }, limit: 1000) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
    providers: allGetCatalogProviders {
      edges {
        node {
          data {
            id
            type
            version
            body {
              documentation_url
              label
              logo_url
              name
              owner_id
              support_email
              team_id
            }
          }
        }
      }
    }
    products: allGetCatalogProducts {
      edges {
        node {
          data {
            id
            body {
              billing {
                currency
                type
              }
              documentation_url
              feature_types {
                customizable
                downgradable
                label
                measurable
                name
                type
                upgradable
                values {
                  cost
                  label
                  name
                  numeric_details {
                    increment
                    max
                    min
                    suffix
                    cost_ranges {
                      cost_multiple
                      limit
                    }
                  }
                  price {
                    cost
                    description
                    formula
                    multiply_factor
                  }
                }
              }
              images
              integration {
                base_url
                features {
                  access_code
                  credential
                  region
                  plan_change
                  sso
                }
                provisioning
                sso_url
                version
              }
              label
              listing {
                listed
                marketing {
                  beta
                  featured
                  new
                }
                public
              }
              logo_url
              name
              provider_id
              state
              support_email
              tagline
              tags
              terms {
                provided
                url
              }
              value_props {
                body
                header
              }
            }
            type
            version
          }
        }
      }
    }
    plans: allGetCatalogPlans {
      edges {
        node {
          data {
            id
            type
            version
            body {
              cost
              customizable
              defaultCost
              free
              label
              name
              product_id
              provider_id
              regions
              resizable_to
              state
              trial_days
              expanded_features {
                customizable
                downgradable
                label
                measurable
                name
                type
                upgradable
                value {
                  label
                  name
                  price {
                    description
                    formula
                  }
                  numeric_details {
                    cost_ranges {
                      cost_multiple
                      limit
                    }
                    increment
                    max
                    min
                    suffix
                  }
                }
                value_string
                values {
                  cost
                  label
                  name
                  numeric_details {
                    cost_ranges {
                      limit
                      cost_multiple
                    }
                    increment
                    max
                    min
                    suffix
                  }
                  price {
                    cost
                    description
                    formula
                    multiply_factor
                  }
                }
              }
              features {
                feature
                value
              }
            }
          }
        }
      }
    }
    regions: allGetCatalogRegions {
      edges {
        node {
          data {
            id
            version
            type
            body {
              location
              name
              platform
              priority
            }
          }
        }
      }
    }
  }
`;

export default HomePage;
