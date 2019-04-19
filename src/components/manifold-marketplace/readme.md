# Marketplace

A list of all Manifold services.

```html
<manifold-marketplace />
```

## Navigation

When users click on a product card, you expect something to happen, right? By
default, service cards will emit a `manifold-serviceCard-click` custom event
whenever a user clicks anywhere on a card. You can listen for it like so,
and use this value to navigate client-side or perform some other action of
your choice:

```js
document.addEventListener('manifold-serviceCard-click', { detail: { label } } => {
  alert(`You clicked the card for ${label}`);
});
```

Alternately, if you’d like the service cards to be plain, ol’ `<a>` tags, you
can specify a `link-format` attribute, where `:product` will be substituted
with each product’s URL-friendly slug:

```html
<manifold-marketplace link-format="/product/:product" />
<!-- <a href="/product/jawsdb-mysql"> -->
```

#### Handling Events in React

Attaching listeners to custom components in React [requires the use of refs](https://custom-elements-everywhere.com/). Example:

```js
marketplaceLoaded(node) {
  node.addEventListener("manifold-serviceCard-click", ({ detail: { label } }) => {
    alert(`You clicked the card for ${label}`);
  });
}

render() {
  return <manifold-marketplace ref={this.marketplaceLoaded} />;
}
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                     | Type                  | Default            |
| ------------ | ------------- | --------------------------------------------------------------- | --------------------- | ------------------ |
| `connection` | --            | _(hidden)_ Passed by `<manifold-connection>`                    | `Connection`          | `connections.prod` |
| `featured`   | `featured`    | _(optional)_ Comma-separated list of featured products (labels) | `string \| undefined` | `undefined`        |
| `linkFormat` | `link-format` | _(optional)_ Link format structure, with `:product` placeholder | `string \| undefined` | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
