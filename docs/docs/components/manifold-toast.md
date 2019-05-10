---
title: Toast
path: /components/toast
example: |
  <manifold-toast alert-type="error">
    This is an alert the user should act upon.
  </manifold-toast>
  <manifold-toast dismissable>
    This is a dismissable alert
  </manifold-toast>
---

# Toast

Simple error display component.

```html
<manifold-toast>Basic info</manifold-toast>
<manifold-toast alert-type="error">Error</manifold-toast>
<manifold-toast alert-type="warning">Warning</manifold-toast>
<manifold-toast alert-type="success">Success</manifold-toast>
```

## Dismissable

Specify a dismissable toast with `dismissable`:

```html
<manifold-toast dismissable>This is dismissable. Bye bye!</manifold-toast>
```
