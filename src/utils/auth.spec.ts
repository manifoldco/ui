import { withAuth } from './auth';

describe('withAuth method', () => {
  it('passes objects through', () => {
    const myObj = { method: 'GET' };
    expect(withAuth(myObj)).toEqual(myObj);
  });

  it('reads manifold_api_token', () => {
    const store: { [key: string]: string } = { manifold_api_token: 'larry' };
    const localStorageMock = {
      getItem(key: string): string | null {
        return store[key] || null;
      },
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

    expect(withAuth()).toEqual({ headers: { authorization: 'Bearer larry' } });
  });

  it('ignores when manifold_api_token isn’t a string', () => {
    const myObj = { method: 'POST' };
    const store: { [key: string]: undefined } = { manifold_api_token: undefined };
    const localStorageMock = {
      getItem(key: string): string | null {
        return store[key] || null;
      },
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

    expect(withAuth(myObj)).toEqual(myObj);
  });
});
