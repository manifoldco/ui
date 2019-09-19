import { newSpecPage } from '@stencil/core/testing';
import { ManifoldAuthToken } from './manifold-auth-token';
import { ConnectionState, Subscriber } from '../../state/connection';

interface Props {
  token?: string;
  authType?: 'oauth' | 'manual';
  setAuthToken?: (s: string) => void;
  subscribe?: (s: Subscriber) => () => void;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldAuthToken],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-auth-token');
  component.token = props.token;
  component.authType = props.authType;
  component.setAuthToken = props.setAuthToken;
  component.subscribe = props.subscribe;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-auth-token>', () => {
  describe('when the token is received', () => {
    it('emits an event', async () => {
      const { component, page } = await setup({});

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
    const { component } = await setup({ token, setAuthToken: jest.fn() });

    expect(component.setAuthToken).toHaveBeenCalledWith(token);
  });

  it('calls the set auth token on change', async () => {
    const token = `test`;
    const { component, page } = await setup({ token, setAuthToken: jest.fn() });

    const newToken = `test-new`;
    component.token = newToken;
    await page.waitForChanges();

    expect(component.setAuthToken).toHaveBeenCalledWith(newToken);
  });

  describe('When using manual auth', () => {
    it('does not render an iframe', async () => {
      const connection = new ConnectionState();
      connection.authToken = 'foo';
      const props: Props = {
        token: connection.authToken,
        authType: 'manual',
        setAuthToken: connection.setAuthToken,
        subscribe: connection.subscribe,
      };
      const { page } = await setup(props);

      const iframe = page.doc.querySelector('iframe');
      expect(iframe).toBeNull();
    });

    describe('when the token is cleared', () => {
      it('allows the consumer to reset the token', async () => {
        const connection = new ConnectionState();
        connection.authToken = 'foo';
        const props: Props = {
          token: connection.authToken,
          authType: 'manual',
          setAuthToken: connection.setAuthToken,
          subscribe: connection.subscribe,
        };
        const { component, page } = await setup(props);

        const received = jest.fn();
        component.addEventListener('manifold-token-receive', received);

        const listen = new Promise(resolve => {
          component.addEventListener('manifold-token-clear', async () => {
            component.token = 'bar';
            await page.waitForChanges();
            resolve();
          });
        });

        connection.setAuthToken('');

        await listen;
        expect(received).toHaveBeenCalledWith(
          expect.objectContaining({ detail: { token: 'bar' } })
        );
      });
    });
  });
});
