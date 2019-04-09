# manifold-plan-selector

Display the plans for a product.

```html
<manifold-plan-selector product-id="234w1jyaum5j0aqe3g3bmbqjgf20p"></manifold-plan-selector>
```

## Detecting changes

Events are dispatched on the `manifold-planUpdated` custom event. Within the
`manifold-planUpdated` event, the structure is as follows:

```json

```

To access that, listen for the event on `document` like so:

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
}
});
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type         | Default     |
| ------------ | ------------ | ----------- | ------------ | ----------- |
| `connection` | --           |             | `Connection` | `undefined` |
| `productId`  | `product-id` |             | `string`     | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
