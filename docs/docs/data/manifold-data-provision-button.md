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

An unstyled button for provisioning resources. 🔒 Requires authentication.

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>
<manifold-toast alert-type="warning">
  <div><code>region-name</code> has been deprecated in favor of <code>region-id</code> starting in version 0.5.1.</div>
</manifold-toast>

## Using with Plan Selector

This component needs a lot of information to do its job. For that reason, we recommend relying on
listening for events from the [plan selector][plan-selector] component. You could do that like so:

```js
const resourceLabel = ''; // Can be obtained from your own input

function updateButton({ detail: { features, planId, productLabel, regionId } }) {
  const provisionButton = document.querySelector('manifold-data-provision-button');
  provisionButton.features = features;
  provisionButton.planId = planId;
  provisionButton.productLabel = productLabel;
  provisionButton.regionId = regionId;
  provisionButton.resourceLabel = resourceLabel;

  // provisionButton.ownerId = '[ownerID]'; // OPTIONAL: only needed if provisioning for a different user (current user must have authorization to do so)
}

document.addEventListener('manifold-planSelector-load', updateButton);
document.addEventListener('manifold-planSelector-change', updateButton);
```

Note that `userId` is the only piece of information required from the identity.

## CTA text

Set the CTA text by adding anything between the opening and closing tags:

```html
<manifold-data-provision-button>
  🚀 Provision My Resource
</manifold-data-provision-button>
```

`slot` can be attached to any HTML or JSX element. To read more about slots, see [Stencil’s
docs][slot].

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
// }}
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

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[slot]: https://stenciljs.com/docs/templating-jsx/
[plan-selector]: /components/plan-selector
