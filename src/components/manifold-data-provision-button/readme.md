# Provision Button

An unstyled text input + button combination for provisioning resources.

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

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                  | Type                  | Default                         |
| -------------- | --------------- | -------------------------------------------- | --------------------- | ------------------------------- |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>` | `Connection`          | `connections.prod`              |
| `features`     | --              |                                              | `UserFeatures`        | `{}`                            |
| `formLabel`    | `form-label`    | Name of `<label>` for input                  | `string`              | `'Resource name'`               |
| `inputId`      | `input-id`      |                                              | `string`              | `'manifold-provision-resource'` |
| `ownerId`      | `owner-id`      |                                              | `string`              | `''`                            |
| `planId`       | `plan-id`       |                                              | `string`              | `''`                            |
| `productId`    | `product-id`    |                                              | `string`              | `''`                            |
| `productLabel` | `product-label` | Product to provision (slug)                  | `string`              | `undefined`                     |
| `regionId`     | `region-id`     |                                              | `string \| undefined` | `globalRegion.id`               |


## Events

| Event                              | Description | Type                |
| ---------------------------------- | ----------- | ------------------- |
| `manifold-provisionButton-click`   |             | `CustomEvent<void>` |
| `manifold-provisionButton-error`   |             | `CustomEvent<void>` |
| `manifold-provisionButton-invalid` |             | `CustomEvent<void>` |
| `manifold-provisionButton-success` |             | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
