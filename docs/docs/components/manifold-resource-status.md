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

```html
  <manifold-resource-status-view state="available"></manifold-resource-product>
  <manifold-resource-status-view state="provision"></manifold-resource-product>
  <manifold-resource-status-view state="degraded"></manifold-resource-product>
  <manifold-resource-status-view state="offline"></manifold-resource-product>
```

## Sizes

```html
  <manifold-resource-status-view size="xsmall" state="available"></manifold-resource-product>
  <manifold-resource-status-view size="small" state="available"></manifold-resource-product>
  <manifold-resource-status-view size="medium" state="available"></manifold-resource-product>
```

## Loading state

```html
  <manifold-resource-status-view loading></manifold-resource-product>
```
