# Provision Button

An unstyled `<button>` tag that can make a call to our provisioning API. It
takes quite a few options.

Although this is an unstyled data component, it needs a lot of information to
do its job. For that reason, this currently depends on both the
`<manifold-plan-selector />` and `<manifold-regions />` components. It
listens for updates from those.

## Specify product, name, and plan

Specify the URL-friendly product slug you’d like to provision:

```js
const productLabel = 'prefab';
const resourceName = 'prefab-stage';
const planId = '23556zydkr0vgh04bne0c2q9ww5kj';
const provisionButton = document.querySelector('manifold-data-provision-button');
provisionButton.productLabel = productLabel;
provisionButton.resourceName = resourceName;
provisionButton.planId = planId;
```

The easiest way to find a Plan ID is to listen to the `manifold-planUpdated`
custom event on `<manifold-plan-selector />`, which provides the ID.

## Regions

Many products are regionless, meaning either that service migrates your data
for you, or regions don’t apply. By default, the provision button will try
and provision on our “regionless” region.

Some products, however, require users to specify their desired region. A list
of currently supported region IDs may be found
[here](https://api.catalog.manifold.co/v1/regions). Once located, specify the
region label like so:

```js
const regionId = '235mhkk15ky7ha9qpu4gazrqjt2gr';
document.querySelector('manifold-data-provision-button').regionId = regionId;
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                  | Type                  | Default            |
| -------------- | --------------- | -------------------------------------------- | --------------------- | ------------------ |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>` | `Connection`          | `connections.prod` |
| `features`     | --              |                                              | `UserFeatures`        | `{}`               |
| `planId`       | `plan-id`       |                                              | `string`              | `''`               |
| `productId`    | `product-id`    |                                              | `string`              | `''`               |
| `productLabel` | `product-label` | Product to provision (slug)                  | `string`              | `undefined`        |
| `regionId`     | `region-id`     |                                              | `string \| undefined` | `globalRegion.id`  |
| `resourceName` | `resource-name` | Name of new resource                         | `string`              | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
