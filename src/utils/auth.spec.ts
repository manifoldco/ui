import { withAuth, isExpired } from './auth';

describe('withAuth method', () => {
  it('passes objects through', () => {
    const myObj = { method: 'GET' };
    expect(withAuth(undefined, myObj)).toEqual(myObj);
  });

  it('reads manifold_api_token from the given token', () => {
    expect(withAuth('larry')).toEqual({ headers: { authorization: 'Bearer larry' } });
  });

  it('doesn’t submit auth token if null', () => {
    const token: any = null;
    expect(withAuth(token)).toBe(undefined);
  });

  it('doesn’t submit auth token if empty string', () => {
    expect(withAuth('')).toBe(undefined);
  });
});

describe('isExpired method', () => {
  // eslint-disable-next-line no-console
  console.log(`TZ: ${process.env.TZ}`);

  const oneDay = 60 * 60 * 24 * 1000;
  const tomorrow = (Date.now() + oneDay) / 1000;
  const yesterday = (Date.now() - oneDay) / 1000;

  it('not expired: false', () => {
    expect(isExpired(`token|${tomorrow}`)).toBe(false);
  });

  it('expired: true', () => {
    expect(isExpired(`token|${yesterday}`)).toBe(true);
  });

  it('invalid: true', () => {
    expect(isExpired(`token|Tue, 1 Jan 2030 00:00:00 GMT`)).toBe(true);
  });
});
