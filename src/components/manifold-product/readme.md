# Product

Display the details for an individual product.

```html
<manifold-product product-label="iron_mq" />
```

## Product Label

You can find the `:product` label for each at `https://manifold.co/services/:product`.

## Navigation

Similar to `<manifold-marketplace>`, the large CTA button below the logo
is configurable. By default, this component emits a
`manifold-productCTA-click` custom event whenever the main CTA is clicked.
Listen for it like so:

```js
document.addEventListener('manifold-productCTA-click', ({ detail: { label } }) => {
  alert(`You clicked the CTA for ${label}`);
});
```

To turn the CTA into an `<a>` tag, specify a `link-format` attribute, using
`:product` as a placeholder:

```html
<manifold-product product-label="aiven-redis" link-format="/product/:product" />
<!-- <a href="/product/aiven-redis"> -->
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                     | Type                  | Default            |
| -------------- | --------------- | --------------------------------------------------------------- | --------------------- | ------------------ |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>`                    | `Connection`          | `connections.prod` |
| `linkFormat`   | `link-format`   | _(optional)_ Link format structure, with `:product` placeholder | `string \| undefined` | `undefined`        |
| `productLabel` | `product-label` | URL-friendly slug (e.g. `"jawsdb-mysql"`)                       | `string`              | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
