---
title: Plan Selector
path: /components/plan-selector
example: |
  <manifold-plan-selector product-label="jawsdb-mysql">
    <manifold-button slot="cta">Get JawsDB MySQL</manifold-button>
  </manifold-plan-selector>
---

# Plan Selector

The plan selector component is a very important component for browsing all of a product’s plans and
comparing features and prices. Simply select which product you’d like to view with a `product-label`
and it will handle the rest:

```html
<manifold-plan-selector product-label="jawsdb-mysql"></manifold-plan-selector>
```

You can find the `:product` label for each at `https://manifold.co/services/:product`.

## CTA

If you’d like to place a button in that empty space bottom-right, you can do so easily with any
element that has `slot="cta"` on it. [Read more about slots][slot].

```jsx
<manifold-plan-selector product-label="jawsdb-mysql">
  <MyButton onClick={() => myAction()} slot="cta">
    Get JawsDB MySQL
  </MyButton>
</manifold-plan-selector>
```

## Events

This component emits [custom events][custom-events] when it updates. To listen to those events, add
an event listener either on the component itself, or `document`.

```js
document.addEventListener('manifold-planSelector-change', ({ detail }) => {
  console.log(detail);
});
// {
//   planId: '2357v8j36f5h866c32ddwwjxvfe8j',
//   planLabel: 'nvidia-1080ti-100gb-ssd',
//   planName: 'NVIDIA 1080TI',
//   productLabel: 'zerosix',
//   freePlan: false
// }
```

The following events are emitted:

| Event Name                     | Description                                                                                                                | Data                                                                                                 |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `manifold-planSelector-change` | Fires whenever a user makes a change.                                                                                      | `planID`, `planLabel`, `planName`, `productId`, `productLabel`, `regionId`, `regionName`, `freePlan` |
| `manifold-planSelector-load`   | Identical to `-update` above, but this fires once on DOM mount to set the initial state (i.e. user hasn’t interacted yet). | `planID`, `planLabel`, `planName`, `productId`, `productLabel`, `regionId`, `regionName`, `freePlan` |

## Free plans only

```html
<manifold-plan-selector free-plans></manifold-plan-selector>
```

## Regions

Most of our products are regionless, but some plans let users specify the region. If the plan
supports it, you can show which regions display with the `regions` atribute with a list of
comma-separated IDs:

```html
<manifold-plan-selector
  regions="235p16bz8n7qkjtvqyg599qtqa9ur,235wy26njfzf53k1d050k2eg9f5ey,235u7nm47cknwjyjdyqwxg070zfmm"
></manifold-plan-selector>
```

For a list of all region IDs for a particular product, refer to our [GraphQL API][graphql-api]:

<iframe src="https://graphqlbin.com/v2/gnyVCY" height="400" width="800"></iframe>

_Note: `All Regions` will display if a product does not allow user-defined regions._

## Hide Until Ready

By default, the plan selector will display our skeleton UI while it retrieves data. You can use
`hide-until-ready` to tell the component to display nothing until the data has been retrieved. This
also allows you to use your own loading indicators, as described [in the advanced
section][custom-loaders].

[custom-loaders]: /advanced/authentication
[custom-events]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
[graphql-api]: https://api.manifold.co
[slot]: https://stenciljs.com/docs/templating-jsx/
