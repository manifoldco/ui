import fetchMock from 'fetch-mock';

let realFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
if (typeof window !== 'undefined') {
  // @ts-ignore
  realFetch = fetch;
}

const waitForDuration = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const credentialResourceMock = {
  data: {
    resource: {
      credentials: {
        edges: [{ node: { key: 'API_KEY', value: 'xxxxxxxxxxxxxxxxxxxxxxxxx' } }],
      },
    },
  },
};

// TODO: Modify the gatsby plugin so we can fetch this data at build time
export const mockGraphQl = () => {
  fetchMock.mock('express:/graphql', async (url, opts) => {
    await waitForDuration(300);

    // Mocks manifold-credentials component.
    if (opts && opts.body && String(opts.body).includes('query RESOURCE_CREDENTIALS')) {
      return JSON.stringify(credentialResourceMock);
    }

    const { headers } = opts;
    // @ts-ignore
    delete headers.authorization;
    const result = await realFetch(url, {
      ...opts,
      headers,
    });
    return result.json();
  });
};
