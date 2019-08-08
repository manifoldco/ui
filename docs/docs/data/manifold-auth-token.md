---
title: Auth token provider
path: /data/auth-token
---

# Auth Token Provider

Data component that allows a developer to provide the required bearer auth token for accessing data locked (🔒)
behind authentication.

```html
<manifold-auth-token token="bearer-token"></manifold-auth-token>
```

The component can be placed anywhere in the DOM tree as long as it exists within a `<manifold-connection>` component.

## Updating or removing the token

The component subscribes to any change done on the token. Changing or removing the token from the connection is done
by either removing the attribute or modifying it.

```html
<manifold-auth-token token="new-token"></manifold-auth-token>
<!-- OR -->
<manifold-auth-token></manifold-auth-token>
```
