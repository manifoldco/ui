---
title: 🔒 Resource List
path: /components/resource-list
example: <manifold-resource-list paused="true"></manifold-resource-list>
---

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>

# 🔒 Resource List

Creates a list of resource cards that lists all the resources the user owns directly.

```html
<manifold-resource-list></manifold-resource-list>
```

## Link format

To navigate using a traditional `<a>` tag, specify a `resource-link-format` attribute, using
`:resource` as a placeholder:

```html
<manifold-data-resource-list
  resource-link-format="/resource/:resource"
></manifold-data-resource-list>
```

Note that this will disable the custom event unless `preserve-event` is passed as well.

## Pausing updates

By default, this component will subscribe to updates from the server. To disable that, pass the
`paused` attribute:

```html
<manifold-data-resource-list paused></manifold-data-resource-list>
```

## Loading state

By default, this component generates its own loading state with 4 placeholder cards, so loading is
handled for you. But optionally, you can display a message below while loading by passing in a
`slot="loading"` child ([docs][slot]):

```html
<manifold-resource-list>
  <div slot="loading">Loading…</div>
</manifold-resource-list>
```

## No resources state

You can pass in your own "no resources" state for the componenent by passing in any element with
`slot="no-resources"` as an attribute. [Read more about slots][slot].

```html
<manifold-resource-list>
  <div slot="no-resources">No resources here</div>
</manifold-resource-list>
```

[slot]: https://stenciljs.com/docs/templating-jsx/
