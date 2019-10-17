---
title: "\U0001F512 Rename Button"
path: '/data/rename-button'
example: |
  <manifold-data-rename-button resource-label="my-resource">
    Rename resource
  </manifold-data-rename-button>
---

# 🔒 Rename Button

An unstyled button for renaming resources. 🔒 Requires [authentication][auth].

```html
<manifold-data-rename-button>
  Rename My Resource
</manifold-data-provision-button>
```

## Events

For validation, error, and success messages, this button will emit custom events.

```js
document.addEventListener(
  'manifold-renameButton-click',
  ({ detail: { resourceLabel, newLabel } }) =>
    console.info(`⌛ Renaming ${resourceLabel} to ${newLabel} …`)
);
document.addEventListener(
  'manifold-renameButton-success',
  ({ detail: { resourceLabel, newLabel } }) =>
    alert(`${resourceLabel} renamed to ${newLabel} successfully!`)
);
document.addEventListener('manifold-renameButton-error', ({ detail }) => console.log(detail));
// {
//   message: 'bad_request: bad_request: No plan_id provided',
//   resourceid: '1234',
//   resourceLabel: 'my-resource',
//   newLabel: 'new-name',
// }
document.addEventListener('manifold-renameButton-invalid', ({ detail }) => console.log(detail));
// {
//   message: 'bad_request: bad_request: No plan_id provided',
//   resourceid: '1234',
//   resourceLabel: 'my-resource',
//   newLabel: 'new-name',
// }
```

| Name                            |                       Returns                        | Description                                                                                                                 |
| :------------------------------ | :--------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-renameButton-click`   |      `resourceId`, `resourceLabel`, `newLabel`       | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-renameButton-success` | `message`, `resourceId`, `resourceLabel`, `newLabel` | Successful renaming. Returns a resource ID and resource label as well as a message and the new name for the resource.       |
| `manifold-renameButton-error`   | `message`, `resourceId`, `resourceLabel`, `newLabel` | Erred rename, along with information on what went wrong.                                                                    |
| `manifold-renameButton-invalid` | `message`, `resourceId`, `resourceLabel`, `newLabel` | Invalid renaming attempt, along with information on what went wrong.                                                        |

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS.

[auth]: /advanced/authentication
[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
