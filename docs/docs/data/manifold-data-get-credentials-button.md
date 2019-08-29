---
title: 🔒 Get credentials Button
path: /data/get-credentials-button
example: |
  <manifold-data-get-credentials-button resource-label="my-resource">
    Get credentials
  </manifold-data-get-credentials-button>
---

# 🔒 Get credentials Button

An unstyled button for getting a resource's credentials. 🔒 Requires authentication.

## CTA text

Set the CTA text by adding anything between the opening and closing tags:

```html
<manifold-data-get-credentials-button>
  Get credentials
</manifold-data-get-credentials-button>
```

`slot` can be attached to any HTML or JSX element. To read more about slots, see [Stencil’s
Documentation][stencil-slot]

## Copy to clipboard

The `copy-to-clipboard` attribute on the component will make any successful request for credentials
also copy the credentials to the user's clipboard.

You should still control the button's state using the available events. If you wish to change the
format used to copy the values to the clipboard, the `manifold-getCredentialsButton-success` event
should be used instead.

```html
<manifold-data-get-credentials-button resource-label="my-resource" copy-to-clipboard="">
  Copy credentials to clipboard
</manifold-data-get-credentials-button>
```

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-getCredentialsButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Getting the credentials for ${resourceLabel} …`)
);
document.addEventListener(
  'manifold-getCredentialsButton-success',
  ({ detail: { resourceLabel, credentials } }) => {
    console.info(`Found the credentials for ${resourceLabel}`);
    // Do something with credentials
  }
);
document.addEventListener('manifold-getCredentialsButton-error', ({ detail }) =>
  console.log(detail)
);
// {type: "not_found", message: "not_found: Resource not found", resourceid: "1234", resourceLabel: "my-resource"}
```

| Name                                    |                         Returns                         | Description                                                                                                                 |
| :-------------------------------------- | :-----------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-getCredentialsButton-click`   |              `resourceId`, `resourceLabel`              | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-getCredentialsButton-success` | `message`, `resourceId`, `resourceLabel`, `credentials` | Successful credentials request. Returns a resource ID, resource Label and the credentials found for the resource            |
| `manifold-getCredentialsButton-error`   |        `message`, `resourceId`, `resourceLabel`         | Erred credential request, along with information on what went wrong.                                                        |

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS.

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[stencil-slot]: https://stenciljs.com/docs/templating-jsx/
