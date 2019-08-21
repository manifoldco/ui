import { newSpecPage } from '@stencil/core/testing';
import { ManifoldAuthToken } from './manifold-auth-token';

async function setup(token?: string) {
  const page = await newSpecPage({
    components: [ManifoldAuthToken],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-auth-token');
  component.token = token;
  component.setAuthToken = jest.fn();

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-auth-token>', () => {
  describe('when the token is not expired', () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    const unixTime = Math.floor(expiry.getTime() / 1000);
    const expirySeconds = unixTime.toString();

    it('calls the set auth token on load', async () => {
      const token = `test|${expirySeconds}`;
      const { component } = await setup(token);

      expect(component.setAuthToken).toHaveBeenCalledWith(token);
    });

    it('calls the set auth token on change', async () => {
      const token = `test|${expirySeconds}`;
      const { component, page } = await setup(token);

      const newToken = `test-new|${expirySeconds}`;
      component.token = newToken;
      await page.waitForChanges();

      expect(component.setAuthToken).toHaveBeenCalledWith(newToken);
    });
  });

  describe('when the token is expired', () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() - 1);
    const unixTime = Math.floor(expiry.getTime() / 1000);
    const expirySeconds = unixTime.toString();

    it('does not call the set auth token on load', async () => {
      const token = `test|${expirySeconds}`;
      const { component } = await setup(token);

      expect(component.setAuthToken).not.toHaveBeenCalled();
    });

    it('does not call the set auth token on change', async () => {
      const token = `test|${expirySeconds}`;
      const { component, page } = await setup(token);

      const newToken = `test-new|${expirySeconds}`;
      component.token = newToken;
      await page.waitForChanges();

      expect(component.setAuthToken).not.toHaveBeenCalledWith();
    });
  });

  describe('events', () => {
    it('receive', async () => {
      const { component } = await setup();

      const shadowcat = component.querySelector('manifold-oauth');
      expect(shadowcat).toBeDefined();
      if (shadowcat) {
        /* This is what we expect our manifold-auth-token component to emit */
        const callback = jest.fn();
        component.addEventListener('manifold-token-receive', callback);

        /* This simulates the shadowcat event that our manifold-auth-token component
         * is listening for
         */
        const event = new CustomEvent('receiveManifoldToken', {
          detail: {
            token: '12345',
            expiry: new Date().getTime() / 1000,
            error: null,
          },
        });
        shadowcat.dispatchEvent(event);

        expect(callback).toHaveBeenCalled();
      }
    });
  });
});
