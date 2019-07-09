---
title: '🔒 Resource Product'
path: '/components/manifold-resource-product'
example: |
  <manifold-mock-resource>
    <manifold-resource-product></manifold-resource-product>
  </manifold-mock-resource>
---

# 🔒 Resource Product

View of a resource's product card. 🔒 Requires authentication and needs to be wrapped inside a `resource-container`.

```html
  <manifold-resource-container resource-name="my-resource">
    <manifold-resource-product></manifold-resource-product>
  </manifold-resource-container>
```

## Render as a card

The product view is rendered as a wrapper by default. Using the `as-card` attribute, the product can be displayed
as a card, similar to how it is displayed on the marketplace.

```html
  <manifold-resource-container resource-name="my-resource">
    <manifold-resource-product as-card=""></manifold-resource-product>
  </manifold-resource-container>
```
