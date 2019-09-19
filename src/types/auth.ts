export interface AuthError {
  code: number;
  message: string;
}

export interface PumaAuthToken {
  access_token?: string;
  expiry?: number;
  error?: AuthError;
}
