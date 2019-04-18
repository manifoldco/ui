# Plan Selector

Display the plans for a product.

```html
<manifold-plan-selector product-label="jawsdb-mysql"></manifold-plan-selector>
```

## Product Label

You can find the `:service` label for each at `https://manifold.co/services/:service`.

## Detecting changes

Events are dispatched on the `manifold-planUpdated` custom event. To listen
for that, listen for the event on `document` like so:

```js
document.addEventListener('manifold-planUpdated', ({ detail }) => {
  console.log(detail);
  /*
    {
      "id": "2357v8j36f5h866c32ddwwjxvfe8j",
      "label": "nvidia-1080ti-100gb-ssd",
      "product": "zerosix",
      "features": {
        // user-defined features for this plan.
      }
    }
   */
});
```

### Hiding provision button

If you would like to hide the button that provisions a selected service, add the `hide-provision-button` attribute.

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                          | Type                   | Default                 |
| --------------------- | ----------------------- | ---------------------------------------------------- | ---------------------- | ----------------------- |
| `connection`          | --                      | _(hidden)_ Passed by `<manifold-connection>`         | `Connection`           | `connections[Env.Prod]` |
| `hideProvisionButton` | `hide-provision-button` | _(optional)_ Hide bottom-right button?               | `boolean \| undefined` | `undefined`             |
| `productLabel`        | `product-label`         | URL-friendly slug (e.g. `"jawsdb-mysql"`)            | `string`               | `undefined`             |
| `resourceId`          | `resource-id`           | _(optional)_ Is this modifying an existing resource? | `string \| undefined`  | `undefined`             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
