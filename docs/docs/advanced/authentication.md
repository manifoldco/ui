---
title: Authentication
path: /advanced/authentication
---

# Authentication

As a cloud service marketplace, most of Manifold UI grants access to user-specific service
instances. Of course, sensitive data requires—you guessed it—_authentication_!

## Public components

To start, it’s helpful to distinguish the components that _don’t_ need auth. Our product data (we
usually refer to it as ”catalog”) is freely-available and great for use on both marketing pages as
well as internal Dashboards (for the latter, we don’t submit user info in the request). Examples of
components which never need auth are:

- [Marketplace](#)
- [Product](#)
- [Plan Selector](#)
- [Product Name](#)
- [Product Logo](#)

Everything else, though, will require auth. This guide will cover setting that up with your app.

## Setting up auth

<manifold-toast>
  <div>
    View the complete authentication guide at <a href="https://docs.manifold.co/docs/platforms-auth-AzsO1HvPT1Hnojsrsb10L">docs.manifold.co</a>
  </div>
</manifold-toast>

Everything else not related to product data—user provisions, user resources, account
credentials—need auth. The full auth docs can be found at [docs.manifold.co][authentication], but
here’s a general summary of how it works with UI, and what to expect:

### Step 1: `<manifold-auth-token>`

To make it easy, we provide a special component—`<manifold-auth-token>`—that handles the first part
of the OAuth dance. It should be placed inside the [Connection][connection] component. It may appear
anywhere in your app (but the higher it the DOM tree it appears, the better, so it can load sooner):

```html
<manifold-connection>
  <manifold-auth-token></manifold-auth-token>
  <!-- rest of your HTML -->
</manifold-connection>
```

In addition to loading this as soon as possible, we also recommend **only loading this once** to
prevent unnecessary token requests (another reason for only having this be near the root of your
HTML).

### Step 2: your app

The `<manifold-auth-token>` in the background will open an `<iframe>` which will redirect
internally, and request a token from Manifold’s end. That same `<iframe>` will then redirect back to
the URL it was called from with the first part of the [OAuth2][oauth2] flow:

```
/login/oauth/authorize?access_type=online&client_id=[client_id]&redirect_uri=[redirect_uri]&response_type=code&state=[state]
```

This is what you’ll **receive**:

| Param           | Description                                                         |
| :-------------- | :------------------------------------------------------------------ |
| `state`         | Temporary user token to be used for this session.                   |
| `client_id`     | This code identifies the request is coming from Manifold            |
| `redirect_uri`  | The redirect URL on Manifold’s side that will receive your response |
| `response_type` | This will be `code`                                                 |
| `access_type`   | This will be `online`                                               |

This is what you should **send** back to the `redirect_uri`:

```
[redirect_uri]?code=[code]&state=[state]
```

| Param   | Description                                                                                                          |
| :------ | :------------------------------------------------------------------------------------------------------------------- |
| `code`  | Temporary user session token on your end. Subsequent Manifold requests will send this `code` back to your endpoints. |
| `state` | The same `state` sent to you in the previous step                                                                    |

Once that’s been received, we’ll send the token back to `<manifold-auth-token>` for our own
endpoints to use. The `manifold-token-receive` event will also be triggered if you’d like to store
the token anywhere (covered under **Events**).

### Full guide

To see our complete guide on authenticating with Manifold, see [docs.manifold.co][authentication].

## Caching for performance

Sometimes the OAuth dance can take a couple seconds to complete. In that light, we strongly
recommend caching the token somewhere so that new tokens are only requested when necessary.

Tokens are set using the `manifold-token-receive` event (in this example we’re using `localStorage`,
but you may place this anywhere that persists)

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

## Troubleshooting

### Invalid token

If the token given to the component is invalid, endpoints will return a 401 error and the token will
be removed from the `manifold-connection`. Use the [error handling capabilities](/advanced/errors)
of our web components to detect and act on such errors.

### OAuth timeout

Any requests requiring authentication will wait on a valid token for up to 15 seconds. If this
component does not inject a token into the connection after that time, an authentication error will
be thrown.

This timeout duration can be changed on the `manifold-connection` component:

```html
<manifold-connection wait-time="10000">
  <!-- Application -->
</manifold-connection>
```

### Token expiration

For the `manifold-token-receive` event (**Events** section), the `expiry` is the Unix timestamp when
the token will expire. On our end, we’ll automatically refresh tokens with no action on your part,
and with no interruption to the user (other than a slightly-slowed-down request while the token
refreshes).

But for your needs, the `manifold-token-receive` event allows you to preemptively do anything you’d
like to (such as, say, not passing the token to `<manifold-auth-token>` which could result in a
minor performance boost for users by skipping what will be a `401` request before the token is
refreshed).

[authentication]: https://docs.manifold.co/docs/platforms-auth-AzsO1HvPT1Hnojsrsb10L
[connection]: /connection
[oauth2]: https://www.oauth.com/oauth2-servers/access-tokens/authorization-code-request
