import fetchMock from 'fetch-mock';
import { resource } from '../../../src/spec/mock/graphql';

const resourcesMock = {
  data: {
    resources: {
      edges: [{ node: resource }, { node: resource }],
    },
  },
};

let realFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
if (typeof window !== 'undefined') {
  // @ts-ignore
  realFetch = fetch;
}

const waitForDuration = (time: number) => new Promise(resolve => setTimeout(resolve, time));

// TODO: Modify the gatsby plugin so we can fetch this data at build time
export const mockGraphQl = () => {
  fetchMock.mock('express:/graphql', async (url, opts) => {
    await waitForDuration(300);

    const { headers, body } = opts;

    const bodyString = body as string;
    if (bodyString.includes('query RESOURCES')) {
      return resourcesMock;
    }
    // @ts-ignore
    delete headers.authorization;
    const result = await realFetch(url, {
      ...opts,
      headers,
    });
    return result.json();
  });
};
