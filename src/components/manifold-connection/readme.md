# manifold-connection

This component allows you to point to different environments.

Components that make network calls will point to the production environment by default. To point them to staging instead, wrap them in a `manifold-connection`:

```html
<manifold-connection env="stage">
  <manifold-marketplace></manifold-marketplace>
  <manifold-product product-label="ant-hill-stage"></manifold-product>
</manifold-connection>
```

If you omit the `env` property, `manifold-connection` will point to production by default.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                    | Default    |
| -------- | --------- | ----------- | ----------------------- | ---------- |
| `env`    | `env`     |             | `Env.Prod \| Env.Stage` | `Env.Prod` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
