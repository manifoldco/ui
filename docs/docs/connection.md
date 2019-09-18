---
title: Connection
path: /connection
---

# Connection

The connection is necessary for API calls to be issues by our web components. It can also be used to
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
