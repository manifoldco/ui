---
title: Product
path: /components/product
example: |
  <manifold-product product-label="jawsdb-mysql">
    <div slot="cta" style="display:flex;justify-content:center;width:100%;">
      <manifold-button color="orange">Get JawsDB MySQL</manifold-button>
    </div>
  </manifold-product>
---

# Product

Display the details for an individual product.

```html
<manifold-product product-label="iron_mq"></manifold-product>
```

## Product Label

You can find the `:product` label for each at `https://manifold.co/services/:product`.

## CTA

You can pass in your own button or link in left sidebar of the component by passing in any element
with `slot="cta"` as an attribute. [Read more about slots][slot].

```html
<manifold-product product-label="jawsdb-mysql">
  <a href="/services/jawsdb-mysql" slot="cta">Get JawsDB MySQL</a>
</manifold-product>
```

## Authentication

By default, `<manifold-product>` is a public component. However, when used in conjunction with
[Authentication][auth], you can request to authenticate with `with-auth`:

```html
<manifold-product with-auth></manifold-product>
```

[auth]: /advanced/authentication
[custom-events]: (https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
[slot]: https://stenciljs.com/docs/templating-jsx/
