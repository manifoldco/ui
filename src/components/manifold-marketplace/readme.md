# Marketplace

A list of all Manifold services.

```html
<manifold-marketplace />
```

## Blacklist/whitelist

Blacklists (hidden products) and whitelists (allowed services) are two ways
to filter the services you’d like to display to users. Use either `blacklist`
or `whitelist`; **don’t use both**.

#### Blacklist

Blacklist will start with **all products**, but let you specify which ones
you’d like to hide:

```html
<manifold-marketplace blacklist="manifold-provider" />
```

#### Whitelist

Conversely, whitelisting will start with **no products**, and let you
manually specify every product that should be shown.

A common usecase is using `whitelist` in conjuction with `hide-categories` (below).

```html
<manifold-marketplace whitelist="aiven-redis,cloudamqp,iron_cache,iron_mq,memcachier-cache" />
```

## Hide categories

Hiding the categories is a great way to have a more compact display. It’s
recommended to use this if you’re only displaying a few products via
`whitelist` (above):

```html
<manifold-marketplace hide-categories />
```

## Hide template cards

Add the `hide-templates` attribute to hide external service template cards
(GitHub, Stripe, etc.):

```html
<manifold-marketplace hide-templates />
```

## Featuring products

You can add a “Featured” tag to select products by specifing a
comma-separated list:

```html
<manifold-marketplace featured="piio,zerosix" />
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

Note that template cards also emit an event as well:
`manifold-templateCard-click`.

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

| Property         | Attribute         | Description                                        | Type                   | Default            |
| ---------------- | ----------------- | -------------------------------------------------- | ---------------------- | ------------------ |
| `blacklist`      | `blacklist`       | Comma-separated list of hidden products (labels)   | `string \| undefined`  | `undefined`        |
| `connection`     | --                | _(hidden)_ Passed by `<manifold-connection>`       | `Connection`           | `connections.prod` |
| `featured`       | `featured`        | Comma-separated list of featured products (labels) | `string \| undefined`  | `undefined`        |
| `hideCategories` | `hide-categories` | Hide categories & side menu?                       | `boolean \| undefined` | `false`            |
| `hideTemplates`  | `hide-templates`  | Hide template cards?                               | `boolean \| undefined` | `false`            |
| `linkFormat`     | `link-format`     | Link format structure, with `:product` placeholder | `string \| undefined`  | `undefined`        |
| `whitelist`      | `whitelist`       | Comma-separated list of allowed products (labels)  | `string \| undefined`  | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
