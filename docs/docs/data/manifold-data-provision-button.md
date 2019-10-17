---
title: 🔒 Provision Button
path: /data/provision-button
example: |
  <label for="my-provision-button">Resource Name</label>
  <input id="my-provision-button" value="my-resource"></input>
  <manifold-data-provision-button resource-label="my-resource">
    🚀 Provision Business plan on Prefab.cloud
  </manifold-data-provision-button>
---

# 🔒 Provision Button

An unstyled button for creating resources. 🔒 Requires [authentication][auth].

```html
<manifold-data-provision-button
  product-label="aiven-cassandra"
  plan-id="2355hnm97ppy5cb0keb64ft7zq426"
  region-id="235mhkk15ky7ha9qpu4gazrqjt2gr"
  resource-label="new-resource"
>
  🚀 Create new-resource
</manifold-data-provision-button>
```

| Attribute        | Required? | Description                                                                                                    |
| :--------------- | :-------: | :------------------------------------------------------------------------------------------------------------- |
| `product-label`  |    ✅     | Which product this is for, identified by its unique slug (e.g. `mailgun`)                                      |
| `plan-id`        |    ✅     | Which plan a user has selected                                                                                 |
| `region-id`      |    ✅     | Required only if this is a plan where the user must select a region (most plans do not have this)              |
| `resource-label` |           | What the user has named this resource (we’ll generate a random name if this is blank)                          |
| `features`       |           | Required only if this is a configurable plan that requires a user’s inputs (e.g. JawsDB MySQL **Custom** plan) |

For a list of these values like `product-label` and `plan-id`, refer to our GraphQL API:

<iframe src="https://graphqlbin.com/v2/ngX3Ix" width="800" height="400"></iframe>

## Using with Plan Selector

This component needs a lot of information to do its job. For that reason, we recommend relying on
listening for events from the [plan selector][plan-selector] component rather than passing
everything in manually. You could do that like so:

```js
const resourceLabel = ''; // Can be obtained from your own input

function updateButton({ detail: { features, planId, productLabel, regionId } }) {
  const provisionButton = document.querySelector('manifold-data-provision-button');
  provisionButton.productLabel = productLabel;
  provisionButton.resourceLabel = resourceLabel;
  provisionButton.planId = planId;
  provisionButton.features = features; // only needed for configurable products such as JawsDB custom
  provisionButton.regionId = regionId; // only needed for products that allow users to choose a region
}

document.addEventListener('manifold-planSelector-load', updateButton);
document.addEventListener('manifold-planSelector-change', updateButton);
```

## Context (team, org, etc.)

By default, **Manifold assumes the user creating the resource will own it**. But when creating a
resource owned by another context (e.g. a team, or organization, or whatever your platform calls
it), you’ll need to specify an owner-id different from their own:

```html
<manifold-data-provision-button owner-id="team-123"></manifold-data-provision-button>
```

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-provisionButton-click', ({ detail }) => console.log(detail));
// {
//   planId: '2358fw1rfjtjv0ubty0waymvd204c',
//   productLabel: 'logdna',
//   resourceName: 'my-resource'
// }
document.addEventListener('manifold-provisionButton-success', ({ detail }) => console.log(detail));
// {
//   message: 'my-resource succesfully provisioned',
//   planId: '2358fw1rfjtjv0ubty0waymvd204c',
//   productLabel: 'logdna',
//   resourceId: '2358fw1rfjtjv0ubty0waymvd204c',
//   resourceName: 'my-resource'
// }
document.addEventListener('manifold-provisionButton-error', ({ detail }) => console.log(detail));
// {
//   message: 'bad_request: No plan_id provided',
//   productLabel: 'lodgna',
//   planId: undefined,
//   resourceLabel: 'my-resource'
// }
document.addEventListener('manifold-provisionButton-invalid', ({ detail }) => console.log(detail));
// {
//   resourceLabel: 'MyResourceName',
//   message: 'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.'
// }
```

| Name                               | Returns                                                            | Description                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `manifold-provisionButton-click`   | `resourceLabel`, `productLabel`, `planId`                          | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-provisionButton-success` | `message`, `resourceLabel`, `resourceId`, `productLabel`, `planId` | Successful provision. Returns name, along with a resource ID                                                                |
| `manifold-provisionButton-error`   | `message`, `resourceLabel`, `productLabel`, `planId`               | Erred provision, along with information on what went wrong.                                                                 |
| `manifold-provisionButton-invalid` | `message`, `resourceLabel`, `productLabel`, `planId`               | Fires if the resource name isn’t named properly.                                                                            |

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS.

[auth]: /advanced/authentication
[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[plan-selector]: /components/plan-selector
