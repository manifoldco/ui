---
title: 🔒 Resize Button
path: /data/resize-button
example: |
  <manifold-data-resize-button resource-label="my-resource" plan-id="new-plan-id">
    💾 Save
  </manifold-data-resize-button>
---

# Resize Button

We use the term “resizing” to refer specifically to plan changes for an existing resource.
Performing that with this UI component is a breeze. Just pass in the `resource-label` and `plan-id`
desired:

```html
<manifold-data-resize-button resource-label="my-resource" plan-id="new-plan-id">
  Change plan
</manifold-data-resize-button>
```

## Events

For loading, error and success messages, it will emit custom events.

```js
document.addEventListener('manifold-resizeButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Changing plan for ${resourceLabel} …`)
);
document.addEventListener('manifold-resizeButton-success', ({ detail: { resourceLabel } }) =>
  alert(`🚀 ${resourceLabel} resized successfully!`)
);
document.addEventListener('manifold-resizeButton-error', ({ detail }) => console.log(detail));
// {
//   message: 'bad_request: No plan_id provided',
//   resourceLabel: 'my-resource'
//   resourceId: 'abc1234',
//   planId: undefined
// }
```

| Name                            |                                 Returns                                  | Description                                                                                                                 |
| :------------------------------ | :----------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-resizeButton-click`   |      `planId`, `resourceId`, `resourceLabel`, `configuredFeatures`       | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-resizeButton-success` |            `message`, `planId`, `resourceId`, `resourceLabel`            | Successful resize with confirmation on values returned from our backend.                                                    |
| `manifold-resizeButton-error`   | `message`, `planId`, `resourceId`, `resourceLabel`, `configuredFeatures` | Erred resize, along with information on what went wrong.                                                                    |
