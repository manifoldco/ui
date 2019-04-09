# Product

Display the details for an individual product.

```html
<manifold-product product-label="jawsdbmysql"></manifold-product>
```

## Product Label

You can find the `:service` label for each at `https://manifold.co/services/:service`.

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

| Property       | Attribute       | Description | Type         | Default     |
| -------------- | --------------- | ----------- | ------------ | ----------- |
| `connection`   | --              |             | `Connection` | `undefined` |
| `productLabel` | `product-label` |             | `string`     | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
