import gqlMin from './gql-min';

describe('gqlMin function', () => {
  // this is a bit snapshot-y, but it’ll do for now
  it('minifies queries', () => {
    const query = `
      query PRODUCTS {
        products(first: $first, after: $after) {
          label
          displayName
          logo
          plans(first: $firstPlans) {
            free
          }
        }
      }
    `;
    const minified = `query PRODUCTS{products(first:$first,after:$after){label displayName logo plans(first:$firstPlans){free}}}`;
    expect(gqlMin(query)).toBe(minified);
  });
});
