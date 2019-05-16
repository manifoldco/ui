---
title: Product
path: /components/product
example: |
  <manifold-product product-label="jawsdb-mysql">
    <manifold-link-button>Get JawsDB MySQL</manifold-link-button>
  </manifold-product>
---

# Product

Display the details for an individual product.

```html
<manifold-product product-label="iron_mq" />
```

## Product Label

You can find the `:product` label for each at `https://manifold.co/services/:product`.

## CTA

You can pass in your own button or link in the bottom-right of the component
by passing in a [slot][slot] (child component):

```html
<manifold-plan-selector product-label="jawsdb-mysql">
  <a href="/services/jawsdb-mysql">Get JawsDB MySQL</a>
</manifold-plan-selector>
```

[slot]: https://stenciljs.com/docs/templating-jsx/
