---
title: 🔒 Copy Credentials
path: /data/copy-credentials
example: |
  <manifold-copy-credentials resource-label="my-resource">
    Copy
  </manifold-copy-credentials>
---

# 🔒 Copy credentials

An unstyled button for copying a resource’s credentials to the clipboard. 🔒 Requires
authentication.

## Refreshing credentials

This component will **fetch credentials as soon as it’s rendered** because copying to clipboard
needs to be a user-initiated click, and happen immediately (this is a security feature of most
browsers to prevent bad scripts from hijacking/accessing the clipboard).

However, a component that has fetched credentials before a user may have needed them results in an
obvious problem: **they may be out of date.** This is fixable by requesting fresh credentials using
its `refresh()` class method:

```js
document.querySelector('manifold-copy-credentials[resource-label="my-resource"]').refresh();
```

## CTA text

Set the CTA text by adding anything between the opening and closing tags:

```html
<manifold-copy-credentials>Copy</manifold-copy-credentials>
```

## Events

For successful user actions as well as errors, the following events will be emitted:

```js
document.addEventListener('manifold-copyCredentials-success', ({ detail }) => console.log(detail));
// {
//   resourceLabel: 'my-resource',
// };
document.addEventListener('manifold-copyCredentials-error', ({ detail }) => console.log(detail));
// {
//   error: 'not_found: Resource not found',
//   resourceLabel: 'my-resource',
// };
```

_Note: for security reasons, we don’t broadcast user credentials anywhere._

| Name                               |         Returns          | Description                                                                                                     |
| :--------------------------------- | :----------------------: | :-------------------------------------------------------------------------------------------------------------- |
| `manifold-copyCredentials-success` |     `resourceLabel`      | Credentials were successfully copied to the clipboard. Yay!                                                     |
| `manifold-copyCredentials-error`   | `error`, `resourceLabel` | Something went wrong, either during the copy to clipboard action, or retrieving credentials in the first place. |

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS. Selectors like `manifold-copy-credentials button` will work just fine.

[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
