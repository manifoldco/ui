# Plan Selector

Display the plans for a product.

```html
<manifold-plan-selector product-label="jawsdb-mysql" />
```

You can find the `:product` label for each at
`https://manifold.co/services/:product`.

## Events

This component emits [custom
events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
when it updates. To listen to those events, add an event listener either on
the component itself, or `document`.

```js
document.addEventListener('manifold-planSelector-change', ({ detail }) => {
  console.log(detail);
});
// { planId: "2357v8j36f5h866c32ddwwjxvfe8j", planLabel: "nvidia-1080ti-100gb-ssd", productLabel: "zerosix", features: { … } } }
```

The following events are emitted:

| Event Name                     | Description                                                                                                                | Data                                              |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| `manifold-planSelector-change` | Fires whenever a user makes a change.                                                                                      | `planID`, `planLabel`, `productLabel`, `features` |
| `manifold-planSelector-load`   | Identical to `-update` above, but this fires once on DOM mount to set the initial state (i.e. user hasn’t interacted yet). | `planID`, `planLabel`, `productLabel`, `features` |
| `manifold-planSelector-click`  | If the CTA is showing (see `hide-cta` below), this will fire when clicked.                                                 | `planID`, `planLabel`, `productLabel`, `features` |

## Navigation

By default, the CTA bottom-right will fire the `manifold-planSelector-click`
event (above). But it can also be turned into an `<a>` tag by specifying
`link-format`:

```html
<manifold-product
  product-label="aiven-redis"
  link-format="/create/:product/?plan=:plan&:features"
/>
<!-- <a href="/product/aiven-redis?plan=startup-4&cpus=1"> -->
```

`:plan`, `:product`, and `:features` (for customizable plans) will all be
replaced with url-friendly slugs for each. In most cases, these are all
passable to [**data components**](#data-components).

### Hiding CTA

If you would like to hide the CTA altogether, specify `hide-cta`:

```html
<manifold-product product-label="till" hide-cta />
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                | Type                   | Default            |
| -------------- | --------------- | ------------------------------------------------------------------------------------------ | ---------------------- | ------------------ |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>`                                               | `Connection`           | `connections.prod` |
| `hideCta`      | `hide-cta`      | _(optional)_ Hide CTA?                                                                     | `boolean \| undefined` | `undefined`        |
| `linkFormat`   | `link-format`   | _(optional)_ Link format structure, with `:product`, `:plan`, and `:features` placeholders | `string \| undefined`  | `undefined`        |
| `productLabel` | `product-label` | URL-friendly slug (e.g. `"jawsdb-mysql"`)                                                  | `string`               | `undefined`        |
| `resourceId`   | `resource-id`   | _(optional)_ Is this modifying an existing resource?                                       | `string \| undefined`  | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
