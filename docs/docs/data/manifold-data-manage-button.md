---
title: 🔒 Manage Button
path: /data/manage-button
example: |
  <manifold-data-manage-button resource-label="my-resource">
    💾 Save
  </manifold-data-manage-button>
---

# Manage Button

Unstyled button for updating an already-provisioned resource. 🔒 Requires authentication.

## Events

For loading, error and success messages, it will emit custom events.

```js
document.addEventListener('manifold-manageButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Provisioning ${resourceLabel} …`)
);
document.addEventListener('manifold-manageButton-success', ({ detail: { resourceLabel } }) =>
  alert(`🚀 ${resourceName} resized successfully!`)
);
document.addEventListener('manifold-manageButton-error', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceLabel: "auauau"}
```

| Name                            |                            Returns                             | Description                                                                                                                 |
| :------------------------------ | :------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-manageButton-click`   |            `planId`, `resourceId`, `resourceLabel`             | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-manageButton-success` | `message`, `planId`, `features`, `resourceId`, `resourceLabel` | Successful change with information on what was changed.                                                                     |
| `manifold-manageButton-error`   | `message`, `planId`, `features`, `resourceId`, `resourceLabel` | Erred change, along with information on what went wrong.                                                                    |
