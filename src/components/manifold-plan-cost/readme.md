# manifold-plan-cost

This component can help you calculate plan costs. In order to do so, it requires
2 props:

- `plan-id`: the ID of the plan to price
- `all-features`: you can grab this from `plan.body.expanded_features`

Using these 2 pieces of information, it’ll display fixed & metered plans
correctly.

## Customizable plans

However, if you’re loading the cost for user-customized features, it needs
one additional prop:

- `selected-features`: Key-value object of `{ [feature-label]: currentValue }`
  for all user-defined features.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute      | Description | Type                   | Default     |
| ------------------ | -------------- | ----------- | ---------------------- | ----------- |
| `allFeatures`      | --             |             | `ExpandedFeature[]`    | `undefined` |
| `compact`          | `compact`      |             | `boolean \| undefined` | `false`     |
| `connection`       | --             |             | `Connection`           | `undefined` |
| `customizable`     | `customizable` |             | `boolean \| undefined` | `false`     |
| `planId`           | `plan-id`      |             | `string`               | `undefined` |
| `selectedFeatures` | --             |             | `UserFeatures`         | `{}`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
