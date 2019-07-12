---
title: 🔒 Resource List
path: /data/resource-list
example: |
  <manifold-data-resource-list paused>
    <ul>
      <li><a href="/resources/db-prod">db-prod</a></li>
      <li><a href="/resources/db-stage">db-stage</a></li>
      <li><a href="/resources/logging-prod">logging-prod</a></li>
      <li><a href="/resources/logging-test">logging-test</a></li>
    </ul>
  </manifold-data-resource-list>
---

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>

# 🔒 Resource List

Creates an unstyled, unordered list with `<a>` tags.

```html
<manifold-data-resource-list />
```

## Events

Navigating client-side happens via the `manifold-resourceList-click` custom event.

| Name                          | Details                    | Data                                          |
| :---------------------------- | :------------------------- | :-------------------------------------------- |
| `manifold-resourceList-click` | User has clicked on a link | `resourceId`, `resourceName`, `resourceLabel` |

## Link format

To navigate using a traditional `<a>` tag, specify a `resource-link-format`
attribute, using `:resource` as a placeholder:

```html
<manifold-data-resource-list resource-link-format="/resource/:resource" />
```

Note that this will disable the custom event unless `preserve-event` is
passed as well.

## Pausing updates

By default, this component will subscribe to updates from the server. To
disable that, pass the `paused` attribute:

```html
<manifold-data-resource-list paused />
```
