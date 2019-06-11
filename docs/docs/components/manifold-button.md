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

## Using an `<a>` tag

By default, `<manifold-button>` will render a `button` element. You can
switch it to link by specifying an `href` like so:

```html
<manifold-button href="/">Return home</manifold-button>
```

However, note that when operating as a link, it **will change the URL** when
clicked. To prevent that, also specify `preserve-event` to let the component
know you’ll handle the event.

```html
<manifold-button href="/" preserve-event>Return home</manifold-button>
```

```js
document.querySelector('manifold-button').addEventListener('manifold-button-click', e => {
  console.log(e.detail.href);
});
```

_Note: you don’t need to specify `preserve-event` unless you’re also
specifying an `href`._
