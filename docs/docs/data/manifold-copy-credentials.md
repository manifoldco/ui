---
title: 🔒 Copy Credentials
path: /data/copy-credentials
example: |
  <manifold-copy-credentials resource-label="my-resource">
    Copy
  </manifold-copy-credentials>
---

# 🔒 Get credentials Button

An unstyled button for copying a resource’s credentials to the clipboard. 🔒 Requires
authentication.

## CTA text

Set the CTA text by adding anything between the opening and closing tags:

```html
<manifold-copy-credentials>
  Get credentials
</manifold-copy-credentials>
```

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-copyCredentials-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Getting the credentials for ${resourceLabel} …`)
);
document.addEventListener(
  'manifold-copyCredentials-success',
  ({ detail: { resourceLabel, credentials } }) => {
    console.info(`Found the credentials for ${resourceLabel}`);
    // Do something with credentials
  }
);
document.addEventListener('manifold-copyCredentials-error', ({ detail }) => console.log(detail));
// {
//   type: 'not_found',
//   message: 'not_found: Resource not found',
//   resourceid: '1234',
//   resourceLabel: 'my-resource',
// };
```

| Name                               |                         Returns                         | Description                                                                                                                 |
| :--------------------------------- | :-----------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-copyCredentials-click`   |              `resourceId`, `resourceLabel`              | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-copyCredentials-success` | `message`, `resourceId`, `resourceLabel`, `credentials` | Successful credentials request. Returns a resource ID, resource Label and the credentials found for the resource            |
| `manifold-copyCredentials-error`   |        `message`, `resourceId`, `resourceLabel`         | Erred credential request, along with information on what went wrong.                                                        |

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS. Selectors like `manifold-copy-credentials button` will work just fine.

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
