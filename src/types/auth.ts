// Expose library interfaces via npm
// -> https://github.com/ionic-team/ionic/blob/master/core/src/interface.d.ts#L3
export * from '../components'; // eslint-disable-line import/no-cycle

export interface AuthError {
  code: number;
  message: string;
}

export interface AuthToken {
  token?: string;
  expiry?: number;
  error?: AuthError;
  duration?: number;
}

export interface PumaAuthToken {
  access_token?: string;
  expiry?: number;
  error?: AuthError;
}
