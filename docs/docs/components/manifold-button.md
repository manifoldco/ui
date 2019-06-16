---
title: Button
path: '/internal/manifold-button'
example: |
  <manifold-button color="orange">Create Resource</manifold-button>
---

# Button

```html
<manifold-button color="black">Submit</manifold-button>
```

## Disabled

```html
<manifold-button disabled>Disabled</manifold-button>
```

## Colors

```html
<manifold-button color="white">Solid White</manifold-button>
<manifold-button color="black">Solid Black</manifold-button>
<manifold-button color="gray">Solid Gray</manifold-button>
<manifold-button color="orange">Orange–pink gradient</manifold-button>
<manifold-button color="pink">Pink–purple gradient</manifold-button>
```

## Sizes

```html
<manifold-button>Normal size</manifold-button>
<manifold-button size="small">Small size</manifold-button>
```

## Events

This element will emit a `manifold-button-click` event when clicked.

```js
document.querySelector('manifold-button').addEventListener('click', () => /* do something */);
```
