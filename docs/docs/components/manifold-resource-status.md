---
title: '🔒 Resource Status'
path: '/components/resource-status'
example: '<manifold-mock-resource><manifold-resource-status></manifold-resource-status></manifold-mock-resource>'
---

# 🔒 Resource Status

Displays the current availability of the resource. 🔒 Requires authentication.

```html
  <manifold-resource-status state="available"></manifold-resource-product>
```

## Resource states

You can use one of the four available resource states to display various statuses.

```html
  <manifold-resource-status state="available"></manifold-resource-product>
  <manifold-resource-status state="provision"></manifold-resource-product>
  <manifold-resource-status state="degraded"></manifold-resource-product>
  <manifold-resource-status state="offline"></manifold-resource-product>
```

## Different sizes

The component is available in two diffrent sizes, `small` and `medium`. Use the `size` attribute to set the component size.

```html
  <manifold-resource-status size="small" state="available"></manifold-resource-product>
```

## Loading

The component can be set to a loading state.

```html
  <manifold-resource-status loading=""></manifold-resource-product>
```

