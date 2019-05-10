---
title: 🔒 Manage Button
path: /data/manage-button
example: |
  <manifold-data-manage-button resource-name="my-resource">
    💾 Save
  </manifold-data-manage-button>
---

# Manage Button

Unstyled button for updating an already-provisioned resource. 🔒 Requires
authentication.

## Events

For loading, error and success messages, it will emit custom events.

```js
document.addEventListener('manifold-manageButton-click', ({ detail: { resourceName } }) =>
  console.info(`⌛ Provisioning ${resourceName} …`)
);
document.addEventListener(
  'manifold-manageButton-success',
  ({ detail: { createdAt, resourceName } }) =>
    alert(`🚀 ${resourceName} provisioned successfully on ${createdAt}!`)
);
document.addEventListener('manifold-manageButton-error', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceName: "auauau"}
document.addEventListener('manifold-manageButton-invalid', ({ detail }) => console.log(detail));
// {resourceName: "MyResourceName", message: "Must start with a lowercase letter, and use only lowercase, numbers, and hyphens."}
```

| Name                            |             Returns             | Description                                                                                                                 |
| :------------------------------ | :-----------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-manageButton-click`   |            `planId`             | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-manageButton-success` | `message`, `planId`, `features` | Successful change. Returns plan name.                                                                                       |
| `manifold-manageButton-error`   | `message`, `planId`, `features` | Erred change, along with information on what went wrong.                                                                    |
