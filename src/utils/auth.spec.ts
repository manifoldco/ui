import { withAuth } from './auth';

describe('withAuth method', () => {
  it('reads manifold_api_token from the given token', () => {
    expect(withAuth('larry')).toEqual({ headers: { authorization: 'Bearer larry' } });
  });
});
