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
  describe('when the token is received', () => {
    it('emits an event', async () => {
      const { component, page } = await setup();

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

        await page.waitForChanges();

        expect(callback).toHaveBeenCalled();
      }
    });
  });

  it('calls the set auth token on load', async () => {
    const token = `test`;
    const { component } = await setup(token);

    expect(component.setAuthToken).toHaveBeenCalledWith(token);
  });

  it('calls the set auth token on change', async () => {
    const token = `test`;
    const { component, page } = await setup(token);

    const newToken = `test-new`;
    component.token = newToken;
    await page.waitForChanges();

    expect(component.setAuthToken).toHaveBeenCalledWith(newToken);
  });
});
