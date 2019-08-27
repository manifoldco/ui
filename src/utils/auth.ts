import { report } from './errorReport';

/**
 * This grabs the manifold_api_token from local storage, and sets the auth header in requests.
 * You may also pass through any other fetch options you’d like.
 */

export function withAuth(authToken: string, options?: RequestInit): RequestInit | undefined {
  /* FIXME: This is being used as a fallback for our demo apps during the transition to
   * oauth and GraphQL. The authToken being passed in will only be present if the app
   * that renders our web components uses oauth. But we have demo apps that are keeping
   * our old tokens in local storage in order for REST calls to work. This keeps them
   * working.
   */
  return {
    ...(options || {}),
    headers: {
      ...((options && options.headers) || {}),
      authorization: `Bearer ${authToken}`,
    },
  };
}

export function isExpired(token: string) {
  try {
    const [, expiry] = token.split('|');
    const numericExpiry = parseInt(expiry, 10);
    if (Number.isNaN(numericExpiry)) {
      // We have no expiry information, or it's badly formatted. Consider this expired.
      return true;
    }

    const tokenExpiration = new Date(numericExpiry * 1000);
    return tokenExpiration < new Date();
  } catch {
    // Not a valid unix timestamp. Consider this expired.
    return true;
  }
}

export function waitForAuthToken<T>(
  getAuthToken: () => string | undefined,
  wait: number,
  resume: () => Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const success = () => {
      document.removeEventListener('manifold-token-receive', success);
      resolve(resume());
    };

    document.addEventListener('manifold-token-receive', success);

    setTimeout(() => {
      document.removeEventListener('manifold-token-receive', success);

      if (!getAuthToken()) {
        const detail = { message: 'No auth token given' };
        report(detail);
        reject(new Error(detail.message));
      }
    }, wait);
  });
}
