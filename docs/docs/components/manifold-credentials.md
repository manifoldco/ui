---
title: '🔒 Resource Credentials'
path: '/components/credentials'
example: '<manifold-credentials resource-name="cms-stage"></manifold-credentials>'
---

# 🔒 Credentials

Display credentials for a resource. 🔒 Requires authentication.

The resource label needs to be provided for the component to be able to fetch the resource's credentials on demand.

```html
<manifold-credentials resource-label="my-resource"></manifold-credentials>
```

## Button colors

The component supports all the colors available to the [`manifold-button`](/internal/manifold-button) component for the two buttons it renders.

Use the `showButtonColor` property for the color of the button during the default state and the `hideButtonColor` property for the color of the button once the credentials are shown.

```html
<manifold-credentials resource-label="my-resource" showButtonColor="orange" hideButtonColor="pink"></manifold-credentials>
```

