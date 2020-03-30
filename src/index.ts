import { connection } from './global/app';
import { waitForAuthToken } from './utils/auth';

export * from './components';

export async function ensureAuthToken() {
  if (connection.authToken) {
    return connection.authToken;
  }

  await waitForAuthToken(
    () => connection.authToken,
    connection.waitTime,
    () => Promise.resolve()
  );

  return connection.authToken;
}
