---
title: 🔒 Deprovision Button
path: /data/deprovision-button
example: |
  <manifold-data-deprovision-button resource-label="my-resource">
    Deprovison resource
  </manifold-data-provision-button>
---

# 🔒 Derovision Button

An unstyled button for deprovisioning resources. 🔒 Requires authentication.

## CTA text

Set the CTA text by adding anything between the opening and closing tags:

```html
<manifold-data-deprovision-button>
  Deprovision My Resource
</manifold-data-provision-button>
```

`slot` can be attached to any HTML or JSX element. To read more about slots, see [Stencil’s Documentation][stencil-slot]

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-deprovisionButton-click', ({ detail: { resourceName } }) =>
  console.info(`⌛ Derovisioning ${resourceName} …`)
);
document.addEventListener(
  'manifold-deprovisionButton-success',
  ({ details: { resourceName } }) =>alert(`${resourceName} deprovisioned successfully!`)
);
document.addEventListener('manifold-deprovisionButton-error', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceid: "1234", resourceName: "my-resource"}
```

| Name                               |                       Returns                        | Description                                                                                                                 |
| :--------------------------------- | :--------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-provisionButton-click`   |                    `resourceName`                   | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-provisionButton-success` |     `message`, `resourceId`, `resourceName`         | Successful deprovision. Returns a resource ID and resource Label.                                                                              |
| `manifold-provisionButton-error`   |     `message`, `resourceId`, `resourceName`         | Erred provision, along with information on what went wrong.                                                                 |

## Styling

Whereas other components in this system take advantage of [Shadow
DOM][shadow-dom] encapsulation for ease of use, we figured this component
should be customizable. As such, style it however you’d like! We recommend
attaching styles to a parent element using any CSS-in-JS framework of your
choice, or plain ol’ CSS.

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[stencil-slot]: https://stenciljs.com/docs/templating-jsx/
