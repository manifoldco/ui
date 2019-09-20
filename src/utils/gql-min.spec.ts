import gqlMin, { gqlSearch } from './gql-min';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

describe('gqlMin function', () => {
  it('minifies queries', () => {
    expect(gqlMin(query)).toBe(minified);
  });
});

describe('gqlSearch function', () => {
  it('escapes full request', () => {
    const req: any = {
      query,
      variables: { first: 50, firstPlans: 20, after: '' },
      meta: true,
    };
    const res = { query: minified, variables: JSON.stringify(req.variables), meta: req.meta };
    expect(gqlSearch(req)).toBe(new URLSearchParams(res).toString());
  });
});
