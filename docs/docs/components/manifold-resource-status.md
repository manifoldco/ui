---
title: 'Resource Status'
path: '/components/resource-status'
example: '<manifold-mock-resource><manifold-resource-status></manifold-resource-status></manifold-mock-resource>'
---

# Resource Status

Displays an availability tag for a resource. Can be used standalone without any data fetching.

```html
  <manifold-resource-status-view state="available"></manifold-resource-product>
```

## Resource states

You can use one of the four available resource states to display various statuses.

```html
  <manifold-resource-status-view state="available"></manifold-resource-product>
  <manifold-resource-status-view state="provision"></manifold-resource-product>
  <manifold-resource-status-view state="degraded"></manifold-resource-product>
  <manifold-resource-status-view state="offline"></manifold-resource-product>
```

## Different sizes

The component is available in two different sizes, `small` and `medium`. Use the `size` attribute to set the component size.

```html
  <manifold-resource-status-view size="small" state="available"></manifold-resource-product>
```

## Loading

The component can be set to a loading state.

```html
  <manifold-resource-status-view loading=""></manifold-resource-product>
```

