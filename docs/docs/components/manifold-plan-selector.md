---
title: Plan Selector
path: /components/plan-selector
example: |
  <manifold-plan-selector product-label="jawsdb-mysql">
    <manifold-link-button>Get JawsDB MySQL</manifold-link-button>
  </manifold-plan-selector>
---

# Plan Selector

Display the plans for a product.

```html
<manifold-plan-selector product-label="jawsdb-mysql" />
```

You can find the `:product` label for each at
`https://manifold.co/services/:product`.

## CTA

You can pass in your own button or link in the bottom-right of the component
by passing in a [slot][slot] (child component):

```jsx
<manifold-plan-selector product-label="jawsdb-mysql">
  <MyButton onClick={() => myAction()}>Get JawsDB MySQL</MyButton>
</manifold-plan-selector>
```

## Events

This component emits [custom
events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
when it updates. To listen to those events, add an event listener either on
the component itself, or `document`.

```js
document.addEventListener('manifold-planSelector-change', ({ detail }) => {
  console.log(detail);
});
// { planId: "2357v8j36f5h866c32ddwwjxvfe8j", planLabel: "nvidia-1080ti-100gb-ssd", planName: "NVIDIA 1080TI", productLabel: "zerosix", features: { … } } }
```

The following events are emitted:

| Event Name                     | Description                                                                                                                | Data                                                          |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| `manifold-planSelector-change` | Fires whenever a user makes a change.                                                                                      | `planID`, `planLabel`, `planName`, `productLabel`, `features` |
| `manifold-planSelector-load`   | Identical to `-update` above, but this fires once on DOM mount to set the initial state (i.e. user hasn’t interacted yet). | `planID`, `planLabel`, `planName`, `productLabel`, `features` |

## Regions

Most of our products are regionless, but some plans let users specify the
region. In this case, you may optionally want to order the regions with the
`regions` attribute:

```html
<manifold-plan-selector regions="aws-eu-west-1,aws-eu-west-2,aws-us-east-1,aws-us-east-2" />
```

Regions will be ordered in the order specified. Any regions not mentioned
will come at the end, alphabetically. Any regions not supported by the plan
will simply be ignored (in this sense, you could even pass the same ordered
list to all plans regardless, if you’d like them always to display in the
same order).

### Supported regions

| Label                | Name                                       |
| :------------------- | :----------------------------------------- |
| `aws-ap-northeast-1` | AWS - Asia Pacific Northeast 1 (Tokyo)     |
| `aws-ap-northeast-2` | AWS - Asia Pacific Northeast 2 (Seoul)     |
| `aws-ap-south-1`     | AWS - Asia South 1 (Mumbai)                |
| `aws-ap-southeast-1` | AWS - Asia Pacific Southeast 1 (Singapore) |
| `aws-ap-southeast-2` | AWS - Asia Pacific Southeast 2 (Sydney)    |
| `aws-ca-central-1`   | AWS - CA Central 1 (Canada Central)        |
| `aws-eu-central-1`   | AWS - EU Central 1 (Frankfurt)             |
| `aws-eu-west-1`      | AWS - EU West 1 (Ireland)                  |
| `aws-eu-west-2`      | AWS - EU West 2 (London)                   |
| `aws-sa-east-1`      | AWS - South America East 1 (Sao Paulo)     |
| `aws-us-east-1`      | AWS - US East 1 (N. Virginia)              |
| `aws-us-east-2`      | AWS - US East 2 (Ohio)                     |
| `aws-us-west-1`      | AWS - US West 1 (N. California)            |
| `aws-us-west-2`      | AWS - US West 2 (Oregon)                   |
| `do-ams2`            | DigitalOcean - Amsterdam 2                 |
| `do-ams3`            | DigitalOcean - Amsterdam 3                 |
| `do-blr1`            | DigitalOcean - Bangalore 1                 |
| `do-fra1`            | DigitalOcean - Frankfurt 1                 |
| `do-lon1`            | DigitalOcean - London 1                    |
| `do-nyc1`            | DigitalOcean - New York 1                  |
| `do-nyc2`            | DigitalOcean - New York 2                  |
| `do-nyc3`            | DigitalOcean - New York 3                  |
| `do-sfo1`            | DigitalOcean - San Francisco 1             |
| `do-sfo2`            | DigitalOcean - San Francisco 2             |
| `do-sgp1`            | DigitalOcean - Singapore 1                 |
| `do-tor1`            | DigitalOcean - Toronto 1                   |
| `gcp-eu-west-1`      | Google Cloud - Europe West 1               |
| `gcp-eu-west-2`      | Google Cloud - Europe West 2               |
| `gcp-eu-west-3`      | Google Cloud - Europe West 3               |
| `gcp-us-central-1`   | Google Cloud - US Central 1                |
| `gcp-us-east-1`      | Google Cloud - US East 1                   |
| `gcp-us-east-4`      | Google Cloud - US East 4                   |
| `gcp-us-west-1`      | Google Cloud - US West 1                   |
| `gcp-us-west-2`      | Google Cloud - US West 2                   |
| `rs-dallas-1`        | Rackspace - Dallas 1                       |

[slot]: https://stenciljs.com/docs/templating-jsx/
