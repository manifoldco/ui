# Toast

Simple error display component.

```html
<manifold-toast>Basic info</manifold-toast>
<manifold-toast alert-type="error">Error</manifold-toast>
<manifold-toast alert-type="warning">Warning</manifold-toast>
<manifold-toast alert-type="success">Success</manifold-toast>
```

## Dismissable

Specify a dismissable toast with `dismissable`:

```html
<manifold-toast dismissable>This is dismissable. Bye bye!</manifold-toast>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                           | Type                                             | Default     |
| ------------- | ------------- | ------------------------------------- | ------------------------------------------------ | ----------- |
| `alertType`   | `alert-type`  | `success` \| `warning` \| `error`     | `"error" \| "success" \| "warning" \| undefined` | `undefined` |
| `dismissable` | `dismissable` | Is this dismissable?                  | `boolean \| undefined`                           | `false`     |
| `icon`        | `icon`        | Use custom icon path data (1024×1024) | `string \| undefined`                            | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
