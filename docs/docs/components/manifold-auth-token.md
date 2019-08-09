---
title: Auth token provider
path: /component/auth-token
---

# Auth Token Provider

Data component that allows a developer to receive or provide the required bearer auth token for accessing data locked (🔒)
behind authentication. The component will render the [shadowcat](https://github.com/manifoldco/shadowcat) authentication
iframe and attempt to log the currently logged in user for your platform using oauth. See the shadowcat documentation for more information.

```html
<manifold-auth-token></manifold-auth-token>
```

The component can be placed anywhere in the DOM tree as long as it exists within a `<manifold-connection>` component.

## Receiving the token
The component makes no decision as to how you should save to token on your side. As such, when the token is received from the iframe,
and event is triggered that will give you the token. The token is automatically injected into the connection once received, 
but subsequent requests will need the token to prevent another oauth request.

```js
document.addEventListener('manifold-token-received', ({ detail: { token } }) => {
  // create a cookie or localstorage value with the token
});
```

## Setting the cached token

The component can receive a token previously saved from an oauth request to speed up all requests made by our components.
If this token is provided, the oauth request will still happen in order to refresh the token, but any fetch calls
happening in our web components will not wait for that oauth request to finish.

```html
<manifold-auth-token token="new-token"></manifold-auth-token>
```
