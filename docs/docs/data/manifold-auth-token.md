---
title: Auth Token
path: /data/auth-token
---

# Auth Token

This component handles [auth][auth] for our components. This is merely a list of options and events;
to see the full picture please refer to the [guide][auth] on the subject.

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

## Caching for performance

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

| Event Name               | Description                              | Data                                   |
| :----------------------- | :--------------------------------------- | :------------------------------------- |
| `manifold-token-receive` | Emitted whenever a new token is received | `token`, `expiry`, `error`, `duration` |

[connection]: /connection
[auth]: /advanced/authentication
