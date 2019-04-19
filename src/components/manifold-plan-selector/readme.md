# Plan Selector

Display the plans for a product.

```html
<manifold-plan-selector product-label="jawsdb-mysql" />
```

## Product Label

You can find the `:product` label for each at `https://manifold.co/services/:product`.

## Detecting changes

Events are dispatched on the `manifold-planUpdated` custom event. To listen
for that, listen for the event on `document` like so:

```js
document.addEventListener('manifold-planUpdated', ({ detail }) => {
  console.log(detail);
});
// { id: "2357v8j36f5h866c32ddwwjxvfe8j", label: "nvidia-1080ti-100gb-ssd", product: "zerosix", features: { … } } }
```

## Navigation

The large CTA in the bottom-right
is configurable. By default, this component emits a
`manifold-planCTA-click` custom event whenever the main CTA is clicked.
Listen for it like so:

```js
document.addEventListener(
  'manifold-productCTA-click',
  ({ detail: { product, plan, features } }) => {
    alert(
      `You clicked the CTA for the ${plan} plan on ${product} with these features: ${JSON.stringify(
        features
      )}`
    );
  }
);
```

To turn the CTA into an `<a>` tag, specify a `link-format` attribute, using
`:product`, `:plan`, and `:features` as placeholders:

```html
<manifold-product
  product-label="aiven-redis"
  link-format="/create/:product/?plan=:plan&:features"
/>
<!-- <a href="/product/aiven-redis?plan=startup-4&cpus=1"> -->
```

### Hiding provision button

If you would like to hide the CTA altogether, specify `hide-cta`:

```html
<manifold-product product-label="till" hide-cta />
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                | Type                   | Default            |
| -------------- | --------------- | ------------------------------------------------------------------------------------------ | ---------------------- | ------------------ |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>`                                               | `Connection`           | `connections.prod` |
| `hideCta`      | `hide-cta`      | _(optional)_ Hide CTA?                                                                     | `boolean \| undefined` | `undefined`        |
| `linkFormat`   | `link-format`   | _(optional)_ Link format structure, with `:product`, `:plan`, and `:features` placeholders | `string \| undefined`  | `undefined`        |
| `productLabel` | `product-label` | URL-friendly slug (e.g. `"jawsdb-mysql"`)                                                  | `string`               | `undefined`        |
| `resourceId`   | `resource-id`   | _(optional)_ Is this modifying an existing resource?                                       | `string \| undefined`  | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
