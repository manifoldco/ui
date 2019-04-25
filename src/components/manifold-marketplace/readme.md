# Marketplace

A list of all Manifold services.

```html
<manifold-marketplace />
```

## Catalog curation

Our marketplace offers 2 options, either to show all services excluding a
few, or manually specifying the products that should be shown. For either
option there is either the `excludes` or `products` options—use either, but
not both in the same instance.

#### Excludes

Excludes will start with **all products**, but let you specify which ones
you’d like to hide:

```html
<manifold-marketplace excludes="manifold-provider" />
```

#### Products

Conversely, manually specifying products will start with **no products**, and
let you manually specify every product that should be shown.

A common usecase is using `products` in conjuction with `hide-categories` (below).

```html
<manifold-marketplace products="aiven-redis,cloudamqp,iron_cache,iron_mq,memcachier-cache" />
```

## Hide categories

Hiding the categories is a great way to have a more compact display. It’s
recommended to use this if you’re only displaying a few products via
`products` (above):

```html
<manifold-marketplace hide-categories />
```

## Hide template cards

Add the `hide-templates` attribute to hide external service template cards
(GitHub, Stripe, etc.). This will also hide their respective categories if no
other products are using them.

```html
<manifold-marketplace hide-templates />
```

## Featuring products

You can add a “Featured” tag to select products by specifing a
comma-separated list:

```html
<manifold-marketplace featured="piio,zerosix" />
```

## Events

This component emits [custom
events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
when it updates. To listen to those events, add an event listener either on
the component itself, or `document`:

```js
document.addEventListener('manifold-marketplace-click', { detail: { productLabel } } => {
  alert(`You clicked the card for ${productLabel}`);
});
```

The following events are emitted:

| Event Name                   | Description                                                                                              | Data                        |
| :--------------------------- | :------------------------------------------------------------------------------------------------------- | :-------------------------- |
| `manifold-marketplace-click` | Fires whenever a user has clicked on a product.                                                          | `productId`, `productLabel` |
| `manifold-template-click`    | Fires whenever a user has clicked on a custom template (assuming it’s not hidden with `hide-templates`). | `category`                  |

## Navigation

By default, service cards will only emit the `manifold-marketplace-click`
event (above). But it can also be turned into an `<a>` tag by specifying
`link-format`:

```html
<manifold-marketplace link-format="/product/:product" />
<!-- <a href="/product/jawsdb-mysql"> -->
```

`:product` will be replaced with the url-friendly slug for the product.

Note that this will disable the custom events unless `preserve-event` is
passed as well.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                    | Type                   | Default            |
| ---------------- | ----------------- | -------------------------------------------------------------- | ---------------------- | ------------------ |
| `connection`     | --                | _(hidden)_ Passed by `<manifold-connection>`                   | `Connection`           | `connections.prod` |
| `excludes`       | `excludes`        | Comma-separated list of hidden products (labels)               | `string \| undefined`  | `undefined`        |
| `featured`       | `featured`        | Comma-separated list of featured products (labels)             | `string \| undefined`  | `undefined`        |
| `hideCategories` | `hide-categories` | Hide categories & side menu?                                   | `boolean \| undefined` | `false`            |
| `hideTemplates`  | `hide-templates`  | Hide template cards?                                           | `boolean \| undefined` | `false`            |
| `linkFormat`     | `link-format`     | Link format structure, with `:product` placeholder             | `string \| undefined`  | `undefined`        |
| `preserveEvent`  | `preserve-event`  | Should the JS event still fire, even if link-format is passed? | `boolean`              | `false`            |
| `products`       | `products`        | Comma-separated list of shown products (labels)                | `string \| undefined`  | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
