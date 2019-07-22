---
title: 🔒 SSO Button
path: /data/sso-button
example: |
  <manifold-data-sso-button resource-label="my-resource">
    SSO into resource
  </manifold-data-sso-button>
---

# 🔒 SSO Button

An unstyled button for ssoing into resources. 🔒 Requires authentication.

## CTA text

Set the CTA text by adding anything between the opening and closing tags:

```html
<manifold-data-sso-button>
  SSO into My Resource
</manifold-data-provision-button>
```

`slot` can be attached to any HTML or JSX element. To read more about slots, see [Stencil’s Documentation][stencil-slot]

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-ssoButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Ssoing into ${resourceLabel} …`)
);
document.addEventListener(
  'manifold-ssoButton-success',
  ({ detail: { resourceLabel, redirectUrl } }) => window.location = redirectUrl
);
document.addEventListener('manifold-ssoButton-error', ({ detail }) => console.log(detail));
// {type: "not_found", message: "no_found: Resource not found", resourceid: "1234", resourceLabel: "my-resource"}
```

| Name                         |                       Returns                               | Description                                                                                                                 |
| :----------------------------| :---------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-ssoButton-click`   |              `resourceId`, `resourceLabel`                  | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-ssoButton-success` |   `message`, `resourceId`, `resourceLabel`, `redirectUrl`   | Successful sso. Returns a resource ID, resource Label and the redirect_url for the product's dashboard.                     |
| `manifold-ssoButton-error`   |           `message`, `resourceId`, `resourceLabel`          | Erred sso, along with information on what went wrong.                                                                       |

## Styling

Whereas other components in this system take advantage of [Shadow
DOM][shadow-dom] encapsulation for ease of use, we figured this component
should be customizable. As such, style it however you’d like! We recommend
attaching styles to a parent element using any CSS-in-JS framework of your
choice, or plain ol’ CSS.

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[stencil-slot]: https://stenciljs.com/docs/templating-jsx/
