---
title: Service Card
path: '/components/manifold-service-card'
example: |
  <manifold-service-card
    product-id="234qkjvrptpy3thna4qttwt7m2nf6"
  </manifold-service-card>
---

# Service Card

Compact view of a Manifold Product. Available as a self-fetching component or a view component.

```html
<manifold-service-card product-label="jawsdb-mysql"></manifold-service-card>
```

## CTA

You can pass in your own CTA content in the right of the component
by passing in any element with `slot="cta"` as an attribute. [Read more about
slots][slot].

```jsx
<manifold-service-card product-label="jawsdb-mysql">
  <div slot="cta">BUY ME!</div>
</manifold-service-card>
```

## Fetching using the label

The `manifold-service-card` component can be used to fetch a product's data with a label.

```html
<manifold-service-card product-label="logdna"></manifold-product-card>
```

## Fetching using the id

The `manifold-service-card` component can be used to fetch a product's data with an id.

```html
<manifold-service-card product-id="1234"></manifold-product-card>
```

## Navigation

By default, service cards will only emit the `manifold-marketplace-click`
event (above). But it can also be turned into an `<a>` tag by specifying
`product-link-format`:

```html
<manifold-service-card
  product-label="jawsdb-mysql"
  product-link-format="/product/:product"
></manifold-service-card>
<!-- <a href="/product/jawsdb-mysql"> -->
```

`:product` will be replaced with the url-friendly slug for the product.

Note that this will disable the custom events unless `preserve-event` is
passed as well.

## Events

This component emits [custom
events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
when it updates. To listen to those events, add an event listener either on
the component itself, or `document`:

```js
document.addEventListener('manifold-marketplace-click', { detail } => {
  console.log(detail); // { productLabel: "jawsdb-mysql", productName: "JawsDB MySQL", productId: "234w1jyaum5j0aqe3g3bmbqjgf20p" }
});
```

The following events are emitted:

| Event Name                   | Description                                     | Data                                       |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------ |
| `manifold-marketplace-click` | Fires whenever a user has clicked on a product. | `productId`, `productLabel`, `productName` |
