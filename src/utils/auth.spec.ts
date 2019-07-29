import { withAuth, isExpired } from './auth';

describe('withAuth method', () => {
  it('passes objects through', () => {
    const myObj = { method: 'GET' };
    expect(withAuth(undefined, myObj)).toEqual(myObj);
  });

  it('reads manifold_api_token from the given token', () => {
    expect(withAuth('larry')).toEqual({ headers: { authorization: 'Bearer larry' } });
  });
});

describe('isExpired', () => {
  it('returns TRUE when token is expired (2-part token).', () => {
    const now = new Date();
    const past = Math.floor(now.getTime() / 1000 - 1000); // 1000 seconds in the past
    expect(isExpired(`hello.${past}`)).toBe(true);
  });

  it('returns TRUE when token is expired (3-part token).', () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 1000);
    const past = Math.floor(now.getTime() / 1000 - 1000); // 1000 seconds in the past
    expect(isExpired(`hello.world.${past}`)).toBe(true);
  });

  it('returns FALSE when token is NOT expired (2-part token).', () => {
    const now = new Date();
    const future = Math.floor(now.getTime() / 1000 + 1000); // 1000 seconds in the future
    expect(isExpired(`hello.${future}`)).toBe(false);
  });

  it('returns FALSE when token is NOT expired (3-part token).', () => {
    const now = new Date();
    const future = Math.floor(now.getTime() / 1000 + 1000); // 1000 seconds in the future
    expect(isExpired(`hello.world.${future}`)).toBe(false);
  });

  it('returns TRUE when token is not formatted correctly.', () => {
    expect(isExpired('this.is-not_a+token')).toBe(true);
  });
});
