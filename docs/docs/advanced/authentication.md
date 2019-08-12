---
title: Auth token provider
path: /advanced/authentication
---

# Authenticate users

To allow a user to access data locked (🔒) behind authentication, the `manifold-auth-token`
component can be used. The component will render the
[shadowcat](https://github.com/manifoldco/shadowcat) authentication iframe and attempt to log in the
currently logged in user for your platform using oauth. See the shadowcat documentation for more
information.

```html
<manifold-auth-token></manifold-auth-token>
```

The component can be placed anywhere in the DOM tree as long as it exists within a
`<manifold-connection>` component.

## Receiving the token

The component makes no decision as to how you should save the token on your side. As such, when the
token is received from the iframe, an event is triggered that will give you the token. The token is
automatically injected into the connection once received, but subsequent requests will need the
token to prevent another oauth request.

```js
document.addEventListener('manifold-token-receive', ({ detail: { token } }) => {
  // create a cookie or localstorage value with the token
});
```

## Setting the cached token

The component can receive a token previously saved from an oauth request to speed up all requests
made by our components. If this token is provided, the oauth request will still happen in order to
refresh the token, but any fetch calls happening in our web components will not wait for that oauth
request to finish.

```html
<manifold-auth-token token="new-token"></manifold-auth-token>
```

## Invalid token

If the token given to the component is invalid, endpoints will return a 401 error and the token will
be removed from the `manifold-connection`. Use the [error handling capabilities](/advanced/errors)
of our web components to detect and act on such errors.

## Authenticated requests tiemout

Any requests requiring authentication - which are sent by components locked (🔒) behind
authentication - will wait on a valid token for up to 15 seconds. If this component does not inject
a token into the connection after that time, an authentication error will be thrown.

This timeout duration can be customized on the `manifold-connection` component.

```html
<manifold-connection wait-time="time-in-ms">
  <!-- Application -->
</manifold-connection>
```

## Token expiration

The tokens expiration is encoded in the token string the `manifold-token-receive` gives you. If the
token is set as expired, it will automatically be refreshed with a new token using the shadowcat
oauth iframe.
