---
title: '🔒 Resource Product'
path: '/components/manifold-resource-product'
example: |
  <manifold-mock-resource>
    <manifold-resource-product></manifold-resource-product>
  </manifold-mock-resource>
---

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>

# 🔒 Resource Product

View of a resource's product card. 🔒 Requires authentication and needs to be wrapped inside a `resource-container`.

```html
  <manifold-resource-container resource-label="my-resource">
    <manifold-resource-product></manifold-resource-product>
  </manifold-resource-container>
```
