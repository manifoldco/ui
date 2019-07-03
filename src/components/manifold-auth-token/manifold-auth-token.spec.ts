import { ManifoldAuthToken } from './manifold-auth-token';

describe('<manifold-auth-token>', () => {
  it('calls the set auth token on load', () => {
    const token = 'test';

    const provisionButton = new ManifoldAuthToken();
    provisionButton.setAuthToken = jest.fn();

    provisionButton.token = token;
    provisionButton.componentWillLoad();

    expect(provisionButton.setAuthToken).toHaveBeenCalledWith(token);
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
