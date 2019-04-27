# 🔒 Resource List

Creates an unstyled, unordered list with `<a>` tags.

```html
<manifold-data-resource-list />
```

## Events

Navigating client-side happens via the `manifold-resourceList-click` custom event.

| Name                          | Details                    | Data                         |
| :---------------------------- | :------------------------- | :--------------------------- |
| `manifold-resourceList-click` | User has clicked on a link | `resourceId`, `resourceName` |

## Link format

To navigate using a traditional `<a>` tag, specify a `link-format` attribute, using
`:resource` as a placeholder:

```html
<manifold-data-resource-list link-format="/resource/:resource" />
```

Note that this will disable the custom events unless `preserve-event` is
passed as well.

## Loading State

This data component supports an optional loading state by specifying a child
slot:

```html
<manifold-data-resource-list>Loading…</manifold-data-product-name>
```

## Pausing updates

By default, this component will subscribe to updates from the server. To
disable that, pass the `paused` attribute:

```html
<manifold-data-resource-list paused />
```

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                    | Type                  | Default            |
| --------------- | ---------------- | -------------------------------------------------------------- | --------------------- | ------------------ |
| `connection`    | --               | _(hidden)_ Passed by `<manifold-connection>`                   | `Connection`          | `connections.prod` |
| `linkFormat`    | `link-format`    | Link format structure, with `:resource` placeholder            | `string \| undefined` | `undefined`        |
| `paused`        | `paused`         | Disable auto-updates?                                          | `boolean`             | `false`            |
| `preserveEvent` | `preserve-event` | Should the JS event still fire, even if link-format is passed? | `boolean`             | `false`            |


## Events

| Event                         | Description | Type                |
| ----------------------------- | ----------- | ------------------- |
| `manifold-resourceList-click` |             | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
