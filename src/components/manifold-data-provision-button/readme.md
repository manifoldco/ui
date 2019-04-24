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

## Error & success messages

An error or status message will display below the component, indicating
success:

```html
<div role="alert" data-error>This is an error message</div>
<div role="alert" data-success>This is success message</div>
```

You can style or hide these as desired.

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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
