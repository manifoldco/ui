---
title: 'Resource Status'
path: '/components/resource-status'
example: '<manifold-mock-resource><manifold-resource-status></manifold-resource-status></manifold-mock-resource>'
---

# Resource Status

Displays an availability tag for a resource. Can be used standalone without any data fetching.

```html
<manifold-resource-status state="available"></manifold-resource-status>
```

## Resource states

```html
<manifold-resource-status state="available"></manifold-resource-status>
<manifold-resource-status state="provision"></manifold-resource-status>
<manifold-resource-status state="degraded"></manifold-resource-status>
<manifold-resource-status state="offline"></manifold-resource-status>
```

## Sizes

```html
<manifold-resource-status size="xsmall" state="available"></manifold-resource-status>
<manifold-resource-status size="small" state="available"></manifold-resource-status>
<manifold-resource-status size="medium" state="available"></manifold-resource-status>
```

## Loading state

```html
  <manifold-resource-status-view loading></manifold-resource-product>
```
