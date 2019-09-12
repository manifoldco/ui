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
