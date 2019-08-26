import { hasExpired } from './expiry';

describe('The hasExpired function', () => {
  it('returns true if given a date later than the wait time', () => {
    const waitTime = 1000;
    const start = new Date(Date.now() - waitTime * 2);
    expect(hasExpired(start, waitTime)).toBe(true);
  });

  it('returns false if given a date earlier than the wait time', () => {
    const waitTime = 1000;
    const start = new Date(Date.now() - waitTime);
    expect(hasExpired(start, waitTime)).toBe(false);
  });
});
