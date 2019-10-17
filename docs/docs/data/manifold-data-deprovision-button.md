---
title: 🔒 Deprovision Button
path: /data/deprovision-button
example: |
  <manifold-data-deprovision-button resource-label="my-resource">
    Deprovison resource
  </manifold-data-deprovision-button>
---

# 🔒 Deprovision Button

An unstyled button for deleting (deprovisioning) resources. 🔒 Requires [authentication][auth].

```html
<manifold-data-deprovision-button resource-label="my-resource">
  Delete my-resource
</manifold-data-deprovision-button>
```

## Events

For validation, error, and success messages, this button will emit custom events.

```js
document.addEventListener('manifold-deprovisionButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Deprovisioning ${resourceLabel} …`)
);
document.addEventListener('manifold-deprovisionButton-success', ({ detail: { resourceLabel } }) =>
  alert(`${resourceLabel} deprovisioned successfully!`)
);
document.addEventListener('manifold-deprovisionButton-error', ({ detail }) => console.log(detail));
// {
//   message: 'bad_request: bad_request: No plan_id provided',
//   resourceid: '1234',
//   resourceLabel: 'my-resource',
// }
```

| Name                                 | Returns                                  | Description                                                                                                                 |
| ------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `manifold-deprovisionButton-click`   | `resourceLabel`                          | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-deprovisionButton-success` | `message`, `resourceId`, `resourceLabel` | Successful deprovision. Returns a resource ID and resource Label.                                                           |
| `manifold-deprovisionButton-error`   | `message`, `resourceId`, `resourceLabel` | Erred deprovision, along with information on what went wrong.                                                               |

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS.

[auth]: /advanced/authentication
[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
