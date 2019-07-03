/**
 * This grabs the manifold_api_token from local storage, and sets the auth header in requests.
 * You may also pass through any other fetch options you’d like.
 */

export function withAuth(authToken?: string, options?: RequestInit): RequestInit | undefined {
  if (!authToken) {
    return options;
  }
  return {
    ...(options || {}),
    headers: {
      ...((options && options.headers) || {}),
      authorization: `Bearer ${authToken}`,
    },
  };
}
