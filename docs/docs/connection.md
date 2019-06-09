---
title: Connection
path: /connection
---

# Connection

The connection is necessary to wrap all child web components, and must live
at the top level. This sets the base URL (production or staging) for all
children’s API calls.

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

The `<manifold-connection>` component is only needed once, at the top level
(but can be re-used, if for some reason multiple envs are needed). Children
components can be nested far down into the tree and they’ll still work (even
surrounded by React components!).

If you omit the `env` property, `manifold-connection` will point to production by default.
