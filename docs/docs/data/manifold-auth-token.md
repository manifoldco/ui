---
title: Auth Token
path: /data/auth-token
---

# Auth Token

For all resource-specific operations (creating resources, viewing resources, etc.) the Web
Components will need user-level authentication. This component supports two methods of
authentication: **OAuth** (default) and **manual**.

## Authenticating with OAuth (default)

OAuth is the default method of authentication handled by this component. This is merely a list of
options and events; to see the full picture please refer to the [guide][auth] on the subject.

This component must be always be used inside [Connection][connection] like so:

```html
<manifold-connection>
  <manifold-auth-token></manifold-auth-token>
</manifold-connection>
```

We recommend **loading this as high up your DOM tree as possible** so it loads sooner (sometimes the
OAuth dance can take a couple seconds, so the sooner this can start the faster it will be for
users). We also recommend **only placing it on the page once** to avoid multiple token requests
per-page.

### Caching for performance

Sometimes the OAuth dance can take a couple seconds to complete. In that light, we strongly
recommend caching the token somewhere so that new tokens are only requested when necessary.

Tokens are set using the `manifold-token-receive` event (in this example we’re using `localStorage`,
but you may place this anywhere that persists):

```js
document.addEventListener('manifold-token-receive', ({ detail }) => {
  if (detail.token) {
    // set new token if received
    localStorage.setItem('my-token', detail.token);
  } else {
    // if there was an error, clear saved token
    localStorage.removeItem('my-token');
  }
});
```

Once we have a token stored somewhere, we can pass it back to the `<manifold-auth-token>` component
on page reload:

```jsx
<!-- Server-side -->
<manifold-auth-token token="<?= $token ?>"></manifold-auth-token>
<!-- JSX -->
<manifold-auth-token token={localStorage.getItem('my-token')} />
```

In the case of an expired token, the component will try, silently fail, request a new one, and
trigger the `manifold-token-receive` event which should update anything listening without any
interruption on the user side. Nothing is required on your part for an expired token; if you have
caching set up via the `manifold-token-receive` event listener, your cache will be updated whenever
new tokens are received.

## Authenticating Manually

Alternately, if you’d like to skip the OAuth process in favor for your own, you may do so like this:

```html
<manifold-connoction>
  <manifold-auth-token auth-type="manual" token="my-token"></manifold-auth-token>
</manifold-connection>
```

You’ll also need to specify a mechanism for retrieving a new token. It will fire a method you
specify every time an authorization request fails. You’ll need to attach this method on the
component itself like so:

```js
const component = document.querySelector('manifold-auth-token');

component.addEventListener('manifold-token-clear', async () => {
  const token = await myGetTokenFunction(); // replace this with your token retrieval call
  component.token = token;
});
```

## Events

The following custom events are emitted to `document`. You can listen for events like so:

```js
document.addEventListener('manifold-token-receive', ({ detail }) => {
  console.log(detail);
  // {
  //   duration: 1450,
  //   error: null,
  //   expiry: 86400000,
  //   token: "eyJhbGciOiJFUzI1NiI…"
  // }
});
```

| Event Name               | Description                                                                  | Data                                   |
| :----------------------- | :--------------------------------------------------------------------------- | :------------------------------------- |
| `manifold-token-clear`   | Emitted whenever a token fails an auth request. Use this to set a new token. | `token`, `expiry`, `error`, `duration` |
| `manifold-token-receive` | Emitted whenever a new token is received                                     | `token`, `expiry`, `error`, `duration` |

[connection]: /connection
[auth]: /advanced/authentication
