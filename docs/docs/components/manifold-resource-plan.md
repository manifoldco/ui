---
title: '🔒 Resource Plan'
path: '/components/manifold-resource-plan'
example: |
  <manifold-mock-resource>
    <manifold-resource-plan></manifold-resource-plan>
  </manifold-mock-resource>
---

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>

# 🔒 Resource Plan

View of a resource's plan overview. 🔒 Requires authentication and needs to be wrapped inside a
`resource-container`.

```html
<manifold-resource-container resource-label="my-resource">
  <manifold-resource-plan></manifold-resource-plan>
</manifold-resource-container>
```
