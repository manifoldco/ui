---
title: Connection
path: /connection
---

# Connection

The connection is necessary for API calls to be issues by our Web Components. It can also be used to
set the base URL (production or staging) for all API calls.

## Usage

```html
<!-- Production -->
<manifold-connection>
  <manifold-marketplace></manifold-marketplace>
</manifold-connection>

<!-- Staging -->
<manifold-connection env="stage">
  <manifold-product product-label="ant-hill-stage"></manifold-product>
</manifold-connection>

<!-- Local (if you have marketplace running locally) -->
<manifold-connection env="local">
  <manifold-product product-label="my-local-product"></manifold-product>
</manifold-connection>
```

The `<manifold-connection>` component is only needed once, and can be placed anywhere in the DOM.
API calls will not be made if this component is not present somewhere in the DOM.

If you omit the `env` property, `manifold-connection` will point to production by default.

## Authentication timeout

Many API calls will require authentication. If no auth token is present, we will wait for the auth
token to be received and then try the call again. This process will eventually timeout and throw an
exception. The default wait time is 15 seconds, but this is can be configured by setting the
`wait-time` attribute on this component.

```html
<manifold-connection wait-time="20">
  <manifold-product product-label="ant-hill-stage"></manifold-product>
</manifold-connection>
```
