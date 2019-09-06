import { gql } from '@manifoldco/gql-zero';
import fetchMock from 'fetch-mock';
import { Query, CategoryEdge } from '../types/graphql';
import fetchAllPages, { createAggregator as agg } from './fetchAllPages';

const query = gql`
  query CATEGORIES($first: Int!, $after: String!) {
    categories(first: $first, after: $after) {
      edges {
        node {
          label
          products(first: 10) {
            edges {
              node {
                label
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const firstPage = {
  categories: {
    edges: [
      {
        node: {
          label: 'ai-ml',
          products: {
            edges: [
              {
                node: {
                  label: 'zerosix',
                },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor:
                'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vb4ehm3ec3375rp8e3ne5pqeuvgccw78dvaerwpudtmertkgt3pc9hqgx9qd9w6guk36gh2r8kfe9j6awh279xquz8',
            },
          },
        },
      },
      {
        node: {
          label: 'authentication',
          products: {
            edges: [
              {
                node: {
                  label: 'oauth-io',
                },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor:
                'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vb4dtm3cxvmerupacb8dcv66rhnccwpww1mcctk8t9getr6urttd9hkgxkhc5uqcrb66gh2r8kfe9j6awh279xquz8',
            },
          },
        },
      },
      {
        node: {
          label: 'cms',
          products: {
            edges: [
              {
                node: {
                  label: 'elegant-cms',
                },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor:
                'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vb56nt72vbjd1n6ay3gddhq8xhhcnu6wwb3e9h6gt9rexr62t3b68v6ux9pdnjp4d33ewh2r8kfe9j6awh279xquz8',
            },
          },
        },
      },
    ],
    pageInfo: {
      hasNextPage: true,
      endCursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1p6tv64ut25gh6ywk4cnt24ekvfnyg',
    },
  },
};

const secondPage = {
  categories: {
    edges: [
      {
        node: {
          label: 'database',
          products: {
            edges: [
              {
                node: {
                  label: 'dumper',
                },
              },
              {
                node: {
                  label: 'aiven-kafka',
                },
              },
              {
                node: {
                  label: 'aiven-elasticsearch',
                },
              },
              {
                node: {
                  label: 'aiven-cassandra',
                },
              },
              {
                node: {
                  label: 'aiven-pg',
                },
              },
              {
                node: {
                  label: 'jawsdb-postgres',
                },
              },
              {
                node: {
                  label: 'jawsdb-mysql',
                },
              },
              {
                node: {
                  label: 'jawsdb-maria',
                },
              },
              {
                node: {
                  label: 'aiven-redis',
                },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor:
                'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vb661v36dkpdcv3cc3me4t7jctpcmwqcdkgehh74thhdcv70t3mehj32x1p6twppt3560h2r8kfe9j6awh279xquz8',
            },
          },
        },
      },
      {
        node: {
          label: 'logging',
          products: {
            edges: [
              {
                node: {
                  label: 'logdna',
                },
              },
              {
                node: {
                  label: 'timber-logging',
                },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor:
                'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vb66nvkctvnetgp8rvq6xn66ctk6tj7gdkdemtk6thhddnpewkbd9k3avkh6hv6pvk5dmh2r8kfe9j6awh279xquz8',
            },
          },
        },
      },
      {
        node: {
          label: 'memory-store',
          products: {
            edges: [
              {
                node: {
                  label: 'iron_cache',
                },
              },
              {
                node: {
                  label: 'iron_mq',
                },
              },
              {
                node: {
                  label: 'cloudamqp',
                },
              },
              {
                node: {
                  label: 'aiven-redis',
                },
              },
              {
                node: {
                  label: 'memcachier-cache',
                },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor:
                'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vb66nuppdkjddu66d3n6xpp6cvd6tu7gdv5exnpetbmddr38x3b69k32x1qcnt64ck560h2r8kfe9j6awh279xquz8',
            },
          },
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor:
        'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1penu64t34f1u3euk2c9npau3he4u78e125gh6ywk4cnt24ekvfnyg',
    },
  },
};

describe('Fetching all pages of a GraphQL connection', () => {
  it('fetches all the pages', async () => {
    fetchMock
      .once('https://api.manifold.co/graphql', {
        status: 200,
        body: { data: firstPage },
      })
      .once(
        'https://api.manifold.co/graphql',
        {
          status: 200,
          body: { data: secondPage },
        },
        { overwriteRoutes: false }
      );

    const aggregator = agg<CategoryEdge>();
    const aggSpy = jest.spyOn(aggregator, 'write');

    await fetchAllPages(query, { first: 3, after: '' }, aggregator, (q: Query) => q.categories);
    expect(fetchMock.calls).toHaveLength(aggSpy.mock.calls.length);
    expect(aggregator.entries()).toEqual(
      firstPage.categories.edges.concat(secondPage.categories.edges)
    );
  });
});
