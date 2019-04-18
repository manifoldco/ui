export function withAuth(options?: RequestInit): RequestInit | undefined {
  const token = localStorage.getItem('manifold_api_token');
  if (!token) return options;
  return {
    ...(options || {}),
    headers: {
      ...((options && options.headers) || {}),
      authorization: `Bearer ${token}`,
    },
  };
}
