---
title: '🔒 Resource Credentials'
path: '/components/credentials'
example: |
  <manifold-credentials resource-label="config"></manifold-credentials>
---

# 🔒 Credentials

Display credentials for a resource. 🔒 Requires [authentication][auth].

The resource label needs to be provided for the component to be able to fetch the resource's
credentials on demand.

```html
<manifold-credentials resource-label="my-resource"></manifold-credentials>
```

## Customizing the buttons

You can pass in your own button or link for the show and hide buttons of the component by passing in
any element with `slot="show-button"` and `slot="hide-button"` as an attribute respectively. [Read
more about slots][slot].

```jsx
<manifold-credentials resource-label="my-resource">
  <MyButton slot="show-button">Show credentials</MyButton>
  <MyButton slot="hide-button">Hide credentials</MyButton>
</manifold-credentials>
```

[auth]: /advanced/authentication
[slot]: https://stenciljs.com/docs/templating-jsx/
