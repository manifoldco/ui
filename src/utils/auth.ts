/**
 * This grabs the manifold_api_token from local storage, and sets the auth header in requests.
 * You may also pass through any other fetch options you’d like.
 */

export function withAuth(options?: RequestInit): RequestInit | undefined {
  const token = localStorage.getItem('manifold_api_token');
  if (typeof token !== 'string') return options;
  return {
    ...(options || {}),
    headers: {
      ...((options && options.headers) || {}),
      authorization: `Bearer ${token}`,
    },
  };
}
