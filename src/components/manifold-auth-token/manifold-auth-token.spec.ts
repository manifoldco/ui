import { ManifoldAuthToken } from './manifold-auth-token';

describe('<manifold-auth-token>', () => {
  describe('when the token is not expired', () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    const encodedExpiry = Buffer.from(expiry.toUTCString()).toString('base64');

    it('calls the set auth token on load', () => {
      const token = `test.${encodedExpiry}`;

      const provisionButton = new ManifoldAuthToken();
      provisionButton.setAuthToken = jest.fn();

      provisionButton.token = token;
      provisionButton.componentWillLoad();

      expect(provisionButton.setAuthToken).toHaveBeenCalledWith(token);
    });
  });

  describe('when the token is expired', () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() - 1);
    const encodedExpiry = Buffer.from(expiry.toUTCString()).toString('base64');

    it('calls the set auth token on load', () => {
      const token = `test.${encodedExpiry}`;

      const provisionButton = new ManifoldAuthToken();
      provisionButton.setAuthToken = jest.fn();

      provisionButton.token = token;
      provisionButton.componentWillLoad();

      expect(provisionButton.setAuthToken).not.toHaveBeenCalled();
    });
  });

  it('calls the set auth token on change', () => {
    const token = 'test';
    const newToken = 'test-new';

    const provisionButton = new ManifoldAuthToken();
    provisionButton.setAuthToken = jest.fn();

    provisionButton.token = token;
    provisionButton.tokenChange(newToken);

    expect(provisionButton.setAuthToken).toHaveBeenCalledWith(newToken);
  });
});
