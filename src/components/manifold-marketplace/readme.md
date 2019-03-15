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

## Custom Products URL

Pass in a custom products URL to fetch the list of services to display in the marketplace.

```html
<manifold-marketplace url='https://api.catalog.manifold.co/v1/'></manifold-marketplace>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                  | Default                                 |
| ------------- | -------------- | ----------- | --------------------- | --------------------------------------- |
| `featured`    | `featured`     |             | `string \| undefined` | `undefined`                             |
| `serviceLink` | `service-link` |             | `string \| undefined` | `undefined`                             |
| `url`         | `url`          |             | `string`              | `'https://api.catalog.manifold.co/v1/'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
