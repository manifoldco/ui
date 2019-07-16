---
title: Resource Details View
path: /resource-details
---

# Creating a resource details view

A specific set of component are available to use for creating a resource details view without having to keep
giving the resource label as attributes to all the components in the library.

To setup a resource details view, wrap all the structure you want to be part of the resource details view in
a `manifold-resource-container` component with access to the resource label.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
</manifold-resource-container>
```
<style>
  manifold-data-rename-button button, manifold-data-deprovision-button button {
    border: none;
    padding: 0;
  }
</style>
<manifold-mock-resource>
  <div style="display: flex; justify-content: space-between; margin-bottom: 1em;">
    <div style="display: flex; align-items: center;">
      <manifold-input default-value="my-resource" disabled></manifold-input>
      <manifold-resource-status size="small" style="margin-left: 1em;"></manifold-resource-status>
    </div>
    <div>
      <manifold-resource-rename>
        <manifold-button>Rename</manifold-button>
      </manifold-resource-rename>
      <manifold-resource-deprovision>
        <manifold-button>Deprovision</manifold-button>
      </manifold-resource-deprovision>
    </div>
  </div>
  <manifold-resource-product style="margin-bottom: 1em" as-card=""></manifold-resource-product>
  <manifold-resource-plan style="margin-bottom: 1em"></manifold-resource-plan>
  <manifold-resource-credentials></manifold-resource-credentials>
</resource-mock-resource>

## The resource credentials

The [`manifold-credentials`](/components/credentials) component can be used inside the container without any attribute by
using the `manifold-resource-credentials` component.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
  <manifold-resource-credentials></manifold-resource-credentials>
</manifold-resource-container>
```

## The resource deprovision Button

The [`manifold-data-deprovision-button`](/data/deprovision-button) component can be used inside the container without any attribute by
using the `manifold-resource-deprovision` component. This component is still acting as a data component and can
be stylized or be given children.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
  <manifold-resource-deprovision>Deprovision</manifold-resource-deprovision>
</manifold-resource-container>
```

### Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-deprovisionButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Derovisioning ${resourceLabel} …`)
);
document.addEventListener(
  'manifold-deprovisionButton-success',
  ({ detail: { resourceLabel } }) =>alert(`${resourceLabel} deprovisioned successfully!`)
);
document.addEventListener('manifold-deprovisionButton-error', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceid: "1234", resourceLabel: "my-resource"}
```

| Name                               |                       Returns                        | Description                                                                                                                 |
| :--------------------------------- | :--------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-deprovisionButton-click`   |                    `resourceLabel`                 | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-deprovisionButton-success` |     `message`, `resourceId`, `resourceLabel`       | Successful deprovision. Returns a resource ID and resource Label.                                                                              |
| `manifold-deprovisionButton-error`   |     `message`, `resourceId`, `resourceLabel`       | Erred provision, along with information on what went wrong.     

## The resource rename Button

The [`manifold-data-rename-button`](/data/rename-button) component can be used inside the container without any attribute by
using the `manifold-rename-deprovision` component. This component is still acting as a data component and can
be stylized or be given children.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
  <manifold-resource-rename>Rename</manifold-resource-rename>
</manifold-resource-container>
```

### Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener('manifold-renameButton-click', ({ detail: { resourceLabel, newLabel } }) =>
  console.info(`⌛ Renaming ${resourceLabel} to ${newLabel} …`)
);
document.addEventListener(
  'manifold-renameButton-success',
  ({ detail: { resourceLabel, newLabel } }) => alert(`${resourceLabel} renamed to ${newLabel} successfully!`)
);
document.addEventListener('manifold-renameButton-error', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceid: "1234", resourceLabel: "my-resource", newLabel: "new-name"}
document.addEventListener('manifold-renameButton-invalid', ({ detail }) => console.log(detail));
// {message: "bad_request: bad_request: No plan_id provided", resourceid: "1234", resourceLabel: "my-resource", newLabel: "new-name"}
```

| Name                            |                       Returns                            | Description                                                                                                                 |
| :-------------------------------| :------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-renameButton-click`   |       `resourceId`, `resourceLabel`, `newLabel`          | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-renameButton-success` |   `message`, `resourceId`, `resourceLabel`, `newLabel`   | Successful renaming. Returns a resource ID and resource Label as well as a message and the new name for the resource.       |
| `manifold-renameButton-error`   |   `message`, `resourceId`, `resourceLabel`, `newLabel`   | Erred rename, along with information on what went wrong.                                                                    |
| `manifold-renameButton-error`   |   `message`, `resourceId`, `resourceLabel`, `newLabel`   | Invalid renaming, along with information on what went wrong. 

## The resource product details

The [`manifold-resource-card`](/components/manifold-service-card) component can be used inside the container without any attribute by
using the [`manifold-resource-product`](/components/manifold-resource-product) component.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
  <manifold-resource-product></manifold-resource-product>
</manifold-resource-container>
```

## The resource plan details

The [`manifold-plan`](/components/plan) component can be used inside the container without any attribute by
using the [`manifold-resource-plan`](/components/manifold-resource-plan) component.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
  <manifold-resource-plan></manifold-resource-plan>
</manifold-resource-container>
```

## The resource status

You can display the resource's status like on the `resource-card` component or the standalone
[`manifold-resource-status-view`](/components/manifold-resource-card) component inside the container by
using the `manifold-resource-status` component.

```html
<manifold-resource-container resource-label="my-resource">
  <!--- Your structure goes here --->
  <manifold-resource-status></manifold-resource-status>
</manifold-resource-container>
```
