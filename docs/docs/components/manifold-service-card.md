---
title: Service Card
path: '/components/manifold-service-card'
example: |
  <manifold-service-card
    logo="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png"
    name="LogDNA"
    description="The best logging service you will ever use">
  </manifold-service-card>
---

# Service Card

Compact view of a Manifold Product.

```html
<manifold-service-card
  logo="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png"
  name="LogDNA"
  description="The best logging service you will ever use"
></manifold-service-card>
```

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

| Event Name                   | Description                                     | Data                        |
| :--------------------------- | :---------------------------------------------- | :-------------------------- |
| `manifold-marketplace-click` | Fires whenever a user has clicked on a product. | `productId`, `productLabel` |
