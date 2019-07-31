import { withAuth } from './auth';

describe('withAuth method', () => {
  it('passes objects through', () => {
    const myObj = { method: 'GET' };
    expect(withAuth(undefined, myObj)).toEqual(myObj);
  });

  it('reads manifold_api_token from the given token', () => {
    expect(withAuth('larry')).toEqual({ headers: { authorization: 'Bearer larry' } });
  });
});
