---
title: Marketplace
path: /components/manifold-marketplace
example: |
  <manifold-marketplace>
  </manifold-marketplace>
---

# Marketplace

A list of all Manifold services.

```html
<manifold-marketplace></manifold-marketplace>
```

## Catalog Curation

Specifying products will start with **no products**, and let you manually specify every product that
should be shown.

A common usecase is using `products` in conjuction with `hide-categories` (below).

```html
<manifold-marketplace
  products="aiven-redis,cloudamqp,iron_cache,iron_mq,memcachier-cache"
></manifold-marketplace>
```

## Hide categories

Hiding the categories is a great way to have a more compact display. It’s recommended if you’re only
displaying a few products via `products` (above):

```html
<manifold-marketplace hide-categories></manifold-marketplace>
```

## Hide search

This attribute hides the search bar (always shown by default).

```html
<manifold-marketplace hide-search></manifold-marketplace>
```

## Hide template cards

Add the `hide-templates` attribute to hide external service template cards (GitHub, Stripe, etc.).
This attribute will also hide the cards’ respective categories if no other products are using them.

```html
<manifold-marketplace hide-templates></manifold-marketplace>
```

## Featuring products

You can add a “Featured” tag to select products by specifing a comma-separated list:

```html
<manifold-marketplace featured="piio,zerosix"></manifold-marketplace>
```

## Slots

Slots in web components allow you to place content in the middle of a web component. Each component
will have different areas. Any HTML element can be used, so long as it has `slot="[slot-name]"` as a
property. [Read more about slots][slot].

```html
<manifold-marketplace>
  <div slot="sidebar">
    This will appear in the sidebar (if visible)
  </div>
</manifold-marketplace>
```

## Events

This component emits
[custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) when it
updates. To listen to those events, add an event listener either on the component itself, or
`document`:

```js
document.addEventListener('manifold-marketplace-click', { detail } => {
  console.log(detail); // { productLabel: "jawsdb-mysql", productName: "JawsDB MySQL", productId: "234w1jyaum5j0aqe3g3bmbqjgf20p" }
});
```

The following events are emitted:

| Event Name                   | Description                                                                                              | Data                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `manifold-marketplace-click` | Fires whenever a user has clicked on a product.                                                          | `productId`, `productLabel`, `productName` |
| `manifold-template-click`    | Fires whenever a user has clicked on a custom template (assuming it’s not hidden with `hide-templates`). | `category`                                 |

## Navigation

By default, service cards will only emit the `manifold-marketplace-click` event (above). But it can
also be turned into an `<a>` tag by specifying `product-link-format` and `template-link-format`:

```html
<manifold-marketplace
  product-link-format="/product/:product"
  template-link-format="/template/:template"
></manifold-marketplace>
<!-- <a href="/product/jawsdb-mysql"> -->
```

`:product` will be replaced with the url-friendly slug for the product, as will `:template` for
custom resource templates.

Note that use of either of these two attributes will disable the custom events unless
`preserve-event` is passed as well.

[slot]: https://stenciljs.com/docs/templating-jsx/
