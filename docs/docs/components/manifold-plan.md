---
title: Plan Card
path: /components/plan
example: |
  <manifold-plan
    plan-id="235dznuxuchzx5nm10djvyja1zzvm"
  ></manifold-plan>
---

# Plan Card

In most cases you’d want to use the [Plan Selector][plan-selector] component for neatly laying out
all of a product’s plans for comparison. However, if you simply must, you can embed an individual
plan’s details using this component.

```html
<manifold-plan plan-id="2352n96xxbyekac7xbvr5k4a5dqy8"></manifold-plan>
```

To find a particular plan ID, refer to our [GraphQL API][graphql-api]:

<iframe src="https://graphqlbin.com/v2/7pMzum" height="400" width="800"></iframe>

[graphql-api]: https://api.manifold.co
[plan-selector]: /components/plan-selector
