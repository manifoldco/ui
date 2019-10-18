import fetchMock from 'fetch-mock';
import resource from '../../../src/spec/mock/elegant-cms/resource';

const resourcesMock = {
  data: {
    resources: {
      pageInfo: {
        hasNextPage: false,
        endCursor: 'spookyboo',
      },
      edges: [{ node: resource }, { node: resource }, { node: resource }, { node: resource }],
    },
  },
};

const credentialResourceMock = {
  data: {
    resource: {
      credentials: {
        edges: [
          { node: { key: 'API_KEY', value: 'xxxxxxxxxxxxxxxxxxxxxxxxx' } },
          { node: { key: 'BEST_FRUIT', value: 'Kiwi' } },
          { node: { key: 'BEST_VEGTABLE', value: 'Cabbage' } },
        ],
      },
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
    // TODO(dom): This ok right now but as we scale out our queries and such we should
    // use a proper gql mocking tool that supports better field mocking ect.
    if (bodyString.includes('query RESOURCES')) {
      return resourcesMock;
    }
    if (bodyString.includes('query ResourceCredentials')) {
      return JSON.stringify(credentialResourceMock);
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
