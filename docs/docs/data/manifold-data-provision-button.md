---
title: 🔒 Provision Button
path: /data/provision-button
example: |
  <label for="my-provision-button">Resource Name</label>
  <manifold-data-provision-button input-id="my-provision-button">
    🚀 Provision Business plan on Prefab.cloud
  </manifold-data-provision-button>
---

# 🔒 Provision Button

An unstyled text input + button combination for provisioning resources. 🔒
Requires authentication.

## Using with Plan Selector

This component needs a lot of information to do its job. For that reason, we
recommend relying on listening from events from the [plan
selector](#manifold-plan-selector) component. You could do that like so:

```js
const userId = ''; // Note: must be set

function updateButton({ detail: { features, planId, productLabel, regionId } }) {
  const provisionButton = document.querySelector('manifold-data-provision-button');
  provisionButton.features = features;
  provisionButton.planId = planId;
  provisionButton.productLabel = productLabel;
  provisionButton.regionId = regionId;

  provisionButton.userId = userId;
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

`slot` can be attached to any HTML or JSX element. To read more about slots, see [Stencil’s Documentation][stencil-slot]

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-provisionButton-click', ({ detail: { resourceName } }) =>
  console.info(`⌛ Provisioning ${resourceName} …`)
);
document.addEventListener(
  'manifold-provisionButton-success',
  ({ detail: { createdAt, resourceName } }) =>
    alert(`🚀 ${resourceName} provisioned successfully on ${createdAt}!`)
);
document.addEventListener('manifold-provisionButton-error', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceName: "auauau"}
document.addEventListener('manifold-provisionButton-invalid', ({ detail }) => console.log(detail));
// {resourceName: "MyResourceName", message: "Must start with a lowercase letter, and use only lowercase, numbers, and hyphens."}
```

| Name                               |                       Returns                        | Description                                                                                                                 |
| :--------------------------------- | :--------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-provisionButton-click`   |                    `resourceName`                    | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-provisionButton-success` | `message`, `resourceName`, `resourceId`, `createdAt` | Successful provision. Returns name, along with a resource ID                                                                |
| `manifold-provisionButton-error`   |              `message`, `resourceName`               | Erred provision, along with information on what went wrong.                                                                 |
| `manifold-provisionButton-invalid` |              `message`, `resourceName`               | Fires if the resource name isn’t named properly.                                                                            |

## Styling

Whereas other components in this system take advantage of [Shadow
DOM][shadow-dom] encapsulation for ease of use, we figured this component
should be customizable. As such, style it however you’d like! We recommend
attaching styles to a parent element using any CSS-in-JS framework of your
choice, or plain ol’ CSS.

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[stencil-slot]: https://stenciljs.com/docs/templating-jsx/
