# Marketplace

A list of all Manifold services.

```html
<manifold-marketplace></manifold-marketplace>
```

## Navigation

There are two ways to trigger navigation when clicking on a service card.

### 1. Provide a URL Format

```html
<manifold-marketplace service-link="/services/:service"></manifold-marketplace>
```

This turns the service cards into `<a>` tags with the URL structure of `<a href="/services/jawsdb-mysql">`, etc. `:service` is the only dynamic paramater accepted. Everything else in the formula will be displayed as-is.

For each service, the URL slug can be found at `https://manifold.co/services/:service`.

### 2. Use JavaScript Events

If you omit the `service-link` property, clicking a service card will emit an event named `manifold-serviceCard-click`, which you can handle with a standard event listener:

```js
// Attach a listener to the manifold-marketplace element
var marketplace = document.querySelector('manifold-marketplace');
marketplace.addEventListener('manifold-serviceCard-click', e => {
  alert(`You just clicked ${e.detail.label}`);
});

// Or, attach the listener to the window object
window.addEventListener('manifold-serviceCard-click', e => {
  alert(`You just clicked ${e.detail.label}`);
});
```

#### Handling Events in React

Attaching listeners to custom components in React [requires the use of refs](https://custom-elements-everywhere.com/). Example:

```js
marketplaceLoaded(node) {
  node.addEventListener("manifold-serviceCard-click", e => {
    alert(`You just clicked ${e.detail.label}`);
  });
}

render() {
  return <manifold-marketplace ref={this.marketplaceLoaded} />;
}
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                     | Type                  | Default                 |
| ------------- | -------------- | --------------------------------------------------------------- | --------------------- | ----------------------- |
| `connection`  | --             | _(hidden)_ Passed by `<manifold-connection>`                    | `Connection`          | `connections[Env.Prod]` |
| `featured`    | `featured`     | _(optional)_ Comma-separated list of featured products (labels) | `string \| undefined` | `undefined`             |
| `serviceLink` | `service-link` | _(optional)_ If cards are <a> tags, how should link work?       | `string \| undefined` | `undefined`             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
