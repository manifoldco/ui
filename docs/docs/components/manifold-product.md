---
title: Product
path: /components/product
example: |
  <manifold-product product-label="jawsdb-mysql">
  </manifold-product>
---

# Product

Display the details for an individual product.

```html
<manifold-product product-label="iron_mq" />
```

## Product Label

You can find the `:product` label for each at `https://manifold.co/services/:product`.

## Navigation

Similar to the [marketplace](#manifold-marketplace) component, the large CTA
button below the logo is configurable. By default, this component emits a
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

## Hide CTA

You can alternately hide the CTA on the left altogether with `hide-cta`:

```html
<manifold-product product-label="aiven-cassandra" hide-cta />
```
