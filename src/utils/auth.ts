/**
 * This grabs the manifold_api_token from local storage, and sets the auth header in requests.
 * You may also pass through any other fetch options you’d like.
 */

export function withAuth(authToken?: string, options?: RequestInit): RequestInit | undefined {
  /* FIXME: This is being used as a fallback for our demo apps during the transition to
   * oauth and GraphQL. The authToken being passed in will only be present if the app
   * that renders our web components uses oauth. But we have demo apps that are keeping
   * our old tokens in local storage in order for REST calls to work. This keeps them
   * working.
   */
  const token = authToken || localStorage.getItem('manifold_api_token');

  const isNotString = typeof token !== 'string';
  const isEmpty = token === '';
  const isUndefined = typeof token === 'string' && token.toLowerCase() === 'undefined';

  if (isNotString || isEmpty || isUndefined) {
    return options;
  }

  return {
    ...(options || {}),
    headers: {
      ...((options && options.headers) || {}),
      authorization: `Bearer ${token}`,
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

    const d = new Date(numericExpiry * 1000);
    return d < new Date();
  } catch {
    // Not a valid unix timestamp. Consider this expired.
    return true;
  }
}
