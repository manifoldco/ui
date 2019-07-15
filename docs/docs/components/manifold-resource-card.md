---
title: '🔒 Resource Card'
path: '/components/manifold-resource-card'
example: |
  <manifold-resource-card-view label="my-resource" name="my resource" logo="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png" resource-id="1234" resource-status="available" />
---

# 🔒 Resource Card

Compact view of a user resource. 🔒 Requires authentication.

```html
<manifold-resource-card label="my-resource" />
```

## Fetching by label or ID

The resource card can fetch the resource with either an ID or a resource label.

```html
<manifold-resource-card label="my-resource" />
<!-- OR -->
<manifold-resource-card resource-id="123456" />
```

## Navigation

By default, resource cards will only emit the `manifold-resource-click`
event (above). But it can also be turned into an `<a>` tag by specifying
`resource-link-format`:

```html
<manifold-resource-card resource-link-format="/resources/:resource" />
<!-- <a href="/resource/my-resource"> -->
```

`:label` will be replaced with the url-friendly slug for the product.

Note that this will disable the custom events unless `preserve-event` is
passed as well.

## Events

This component emits [custom
events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
when it updates. To listen to those events, add an event listener either on
the component itself, or `document`:

```js
document.addEventListener('manifold-resource-click', { detail: { resourceLabel } } => {
  alert(`You clicked the card for ${resourceLabel}`);
});
```

The following events are emitted:

| Event Name                   | Description                                     | Data                        |
| :--------------------------- | :---------------------------------------------- | :-------------------------- |
| `manifold-resource-click` | Fires whenever a user has clicked on a resource. | `resourceId`, `resourceLabel` |

## Displaying without fetching

The underlying `<manifold-resource-card-view />` component may be used to display the values for a resource without any fetch calls.

```html
<manifold-resource-card-view
  label="my-resource"
  name="my resource"
  logo="http://logo.png"
  resource-id="123456"
  resource-status="available"
  resource-link-format="/resources/:resource"
  preserve-event=""
/>
```

### Fetching the resource ID

If the resource ID is unknown, omitting it will make the component fetch the ID automatically.

### Loading status

The `<manifold-resource-card-view />` can display a loading status rather than the resource's values.

```html
<manifold-resource-card-view
  label="my-resource"
  name="my resource"
  logo="http://logo.png"
  resource-id="123456"
  resource-status="unknown"
  loading=""
/>
```
