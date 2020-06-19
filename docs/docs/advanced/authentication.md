---
title: Authentication
path: /advanced/authentication
---

# Authentication

As a cloud services marketplace, most of Manifold UI grants access to user-specific service
instances (what we call “resources”). Of course, sensitive data requires—you guessed
it—_authentication_!

## Public components

To start, it’s helpful to distinguish the components that _don’t_ need auth. Our product data (we
usually refer to as the ”catalog”) is freely available, so it’s great to use on both marketing pages
as well as internal dashboards (for the latter, we don’t submit user info in the request, so auth
isn’t required). Components which never need auth are:

- [Marketplace](/components/manifold-marketplace/)
- [Plan Selector](/components/plan-selector/)
- [Product Logo](/data/product-logo/)
- [Product Name](/data/product-name/)
- [Product](/components/product/)
- [Product Card](/components/manifold-product-card/)
- [Toast](/components/toast/)

Everything else, though, requires auth. This guide covers setting up authentication for your app.

## Setting up auth

<manifold-toast>
  <div>
    View the complete authentication guide at <a href="https://docs.manifold.co/enterprise/launch-a-marketplace/authentication">docs.manifold.co</a>
  </div>
</manifold-toast>

Everything not related to product data—resource provisioning, resource modifying and deletions,
account credentials—needs auth. The full auth docs can be found at
[docs.manifold.co][authentication], but here’s a general summary of how it works with UI, and what
to expect:

### Step 1: server-side auth

To make it easy, we provide a special component—`<manifold-auth-token>`—that handles the first step
of the OAuth dance necessary for platform users to authenticate with Manifold. Place it inside the
[Connection][connection] component. It may appear anywhere in your app (but the higher in the DOM
tree it appears, the better, so it can load sooner):

```html
<manifold-connection>
  <manifold-auth-token></manifold-auth-token>
  <!-- rest of your HTML -->
</manifold-connection>
```

In addition to loading `<manifold-auth-token>` as soon as possible, we also recommend **only loading
it once** to prevent unnecessary token requests (this is another reason for placing it near the root
of your HTML).

### Step 2: your app

In the background, the `<manifold-auth-token>` opens an `<iframe>` which securely requests a token
from Manifold’s end based on a user’s profile. That same `<iframe>` then redirects back to the URL
it was called from with the first part of the [OAuth2][oauth2] flow:

```
/login/oauth/authorize?access_type=online&client_id=[client_id]&redirect_uri=[redirect_uri]&response_type=code&state=[state]
```

This is the response you’ll **receive**:

| Param           | Description                                                     |
|-----------------|-----------------------------------------------------------------|
| `state`         | A temporary user token for this session                         |
| `client_id`     | A code identifying that the request comes from Manifold         |
| `redirect_uri`  | The redirect URL on Manifold’s side that receives your response |
| `response_type` | The response type; value is always `code`                       |
| `access_type`   | The access type; the value is always `online`                   |

This is what you should **send** back to the `redirect_uri`:

```
[redirect_uri]?code=[code]&state=[state]
```

| Param   | Description                                                                                                           |
|---------|-----------------------------------------------------------------------------------------------------------------------|
| `code`  | A temporary user session token on your end. Subsequent Manifold requests will send this `code` back to your endpoints |
| `state` | The same `state` sent to you in the previous step                                                                     |

Once Manifold receives this request,the token is sent back to `<manifold-auth-token>` for our own
endpoints to use. The `manifold-token-receive` event is also triggered, so that you can store the
token (covered under **Events**).

### Full guide

To see our complete guide on authenticating with Manifold, see [docs.manifold.co][authentication].

## Token caching for performance

Sometimes the OAuth dance takes a couple seconds to complete. In that light, we strongly recommend
caching the token so that a new token is requested only when necessary.

Tokens are sent using the `manifold-token-receive` event (in this example we’re using
`localStorage`, but you may place the token anywhere that persists):

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

Once a token is stored, it can be passed back to the `<manifold-auth-token>` component on page
reload:

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

Once you’ve set up caching through the `manifold-token-receive` event listener, the cache is
automatically updated when an expired token is renewed. See also **Token expiration**.

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
|--------------------------|------------------------------------------|----------------------------------------|
| `manifold-token-receive` | Emitted whenever a new token is received | `token`, `expiry`, `error`, `duration` |

## Troubleshooting

### Invalid token

If the token sent to a component is invalid, endpoints return a `401` error and the token is
refreshed automatically. Use the [error handling capabilities](/advanced/errors) of our Web
Components to detect and act on such errors.

### OAuth timeout

By default, any requests requiring authentication will wait for a valid token for up to 15 seconds.
If the `<manifold-auth-token>` component does not inject a token into the connection after that
time, an authentication error is thrown.

The timeout can be changed on the `manifold-connection` component:

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

If a token has expired, the `<manifold-auth-token>` component silently fails and then requests a new
token. The `manifold-token-receive` event is triggered, and, if you’ve implemented token caching,
your cache is updated. This flow updates anything listening, without any interruption on the user
side

The `manifold-token-receive` event allows you to customize the behavior when tokens expire. For
example, you may not want to pass an expired token to `<manifold-auth-token>` so you skip a request
that will `401` and instead immediately request a token refresh on load. Doing so would result in a
minor performance boost (“minor” because typically our services detect an invalid auth request
within milliseconds, which does take time but in many instances your users may not notice a
difference of milliseconds).

## Using our GraphQL API

If you are calling our GraphQL API directly from your client code, and the call that you're making
requires authentication, you can ask us for the auth token by calling the `ensureAuthToken`
function. Here's how you might use this with ApolloClient to add our token to your request headers:

```js
import { ensureAuthToken } from '@manifoldco/ui';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();
const link = new createHttpLink({
  uri: 'https://api.manifold.co/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await ensureAuthToken();

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      Connection: 'keep-alive',
    },
  };
});

const manifoldAuthenticatedClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
});

export default manifoldAuthenticatedClient;
```

This function will return the auth token as soon as authentication has completed. If the
authentication process does not occur, the function will eventually timeout and throw an exception.
The wait time defaults to 15 seconds, but is configurable through [the
manifold-connection][connection] component. You should only use this function if the call you're
making requires authentication, since public calls to our catalog don't require an auth token.

[authentication]: https://docs.manifold.co/enterprise/launch-a-marketplace/authentication
[connection]: /connection
[oauth2]: https://www.oauth.com/oauth2-servers/access-tokens/authorization-code-request
