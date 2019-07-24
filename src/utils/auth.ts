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
  if (!token) {
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
  const [, expiry] = token.split('.');

  if (expiry) {
    const decodedExpiry = parseInt(Buffer.from(expiry, 'base64').toString(), 10);
    const d = new Date(decodedExpiry * 1000);
    const now = new Date();

    if (d > now) {
      return false;
    }
  }

  return true;
}
