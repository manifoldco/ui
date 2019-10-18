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

# 🔒 Resource List

Creates an unstyled, unordered list with `<a>` tags.

```html
<manifold-data-resource-list></manifold-data-resource-list>
```

## Events

By default, this component will only emit `click` events for you to decide how they are handled.
This will be useful if you use a client-side router such as `react-router`, etc.

| Name                          | Details                    | Data                          |
| ----------------------------- | -------------------------- | ----------------------------- |
| `manifold-resourceList-click` | User has clicked on a link | `resourceId`, `resourceLabel` |

```js
document.addEventListener('manifold-resourceList-click', ({ detail }) => {
  console.log(detail);
  // {
  //   resourceId: '2358fw1rfjtjv0ubty0waymvd204c',
  //   resourceLabel: 'my-resource'
  // }

  navigate(`/resource/${detail.resourceLabel}`); // your client-side router function
});
```

## Link format

To navigate using a traditional `<a>` tag (which would cause a full-page refresh), specify a
`resource-link-format` attribute, using `:resource` as a placeholder:

```html
<manifold-data-resource-list
  resource-link-format="/resource/:resource"
></manifold-data-resource-list>
```

Note that specifying this attribute will disable the custom event unless `preserve-event` is passed
as well.

## Pausing updates

By default, this component will subscribe to updates from the server (in case users add a new
resource in a different tab, or rename a resource, etc.). To disable updates, pass the `paused`
attribute:

```html
<manifold-data-resource-list paused></manifold-data-resource-list>
```

## Context (team, org, etc.)

To filter the resource list by an owner-id that provides a different context than just the user 
context (e.g. team resources), you can provide the owner-id to filter by:

```html
<manifold-data-resource-list owner-id="team-123"></manifold-data-resource-list>
```
