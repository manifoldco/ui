---
title: Button Link
path: '/internal/manifold-button-link'
example: |
  <manifold-button-link color="black" href="https://docs.manifold.co">Visit docs</manifold-button-link>
---

# Button Link

```html
<manifold-button-link href="/my-link">My Link</manifold-button-link>
```

## Colors

```html
<manifold-button-link color="white">Solid White</manifold-button-link>
<manifold-button-link color="black">Solid Black</manifold-button-link>
<manifold-button-link color="gray">Solid Gray</manifold-button-link>
<manifold-button-link color="orange">Orange–pink gradient</manifold-button-link>
<manifold-button-link color="pink">Pink–purple gradient</manifold-button-link>
```

## Sizes

```html
<manifold-button-link>Normal size</manifold-button-link>
<manifold-button-link size="small">Small size</manifold-button-link>
```

## Prevent routing

By default, the `<a>` tag generated will… well, act like an `<a>` tag. To prevent that, add
`preserve-event` and add an event listener:

```html
<manifold-button-link href="/about" preserve-event>Return home</manifold-button>
```

```js
document.querySelectorAll('manifold-button-link[preserve-event]').forEach(button =>
  button.addEventListener('manifold-buttonLink-click', e => {
    console.log(e.detail.href);
  })
);
```
