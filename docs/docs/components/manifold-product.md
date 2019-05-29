---
title: Product
path: /components/product
example: |
  <manifold-product product-label="jawsdb-mysql">
    <manifold-button slot="cta">Get JawsDB MySQL</manifold-button>
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
by passing in any element with `slot="cta"` as an attribute. [Read more about
slots][slot].

```html
<manifold-plan-selector product-label="jawsdb-mysql">
  <a href="/services/jawsdb-mysql" slot="cta">Get JawsDB MySQL</a>
</manifold-plan-selector>
```

[slot]: https://stenciljs.com/docs/templating-jsx/
