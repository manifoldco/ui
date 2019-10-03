import fetchAllPages from './utils/fetchAllPages';
import connection from './state/connection';
import { waitForAuthToken } from './utils/auth';

export async function getAuthToken() {
  if (connection.authToken) {
    return connection.authToken;
  }

  await waitForAuthToken(() => connection.authToken, connection.waitTime, Promise.resolve);

  return connection.authToken;
}

export * from './components';

export { fetchAllPages };
