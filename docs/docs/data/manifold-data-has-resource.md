---
title: 🔒 Has Resources
path: /data/has-resource
example: |
  <manifold-data-has-resource paused="true">
    <span slot="loading">Loading</span>
    <span slot="no-resource">No resources</span>
    <span slot="has-resource">Has resources</span>
  </manifold-data-has-resource>
---

# Has Resources

Need to determine whether a resource exists, or whether a user has any resources? This is a good
tool. Specify any HTML element with a [slot][slot] to mark when it should show up. You may omit any
`slot`s you don’t need.

```html
<manifold-data-has-resource>
  <span slot="loading">Loading…</span>
  <span slot="no-resource">User has no resources.</span>
  <span slot="has-resource">User has at least 1 resource!</span>
</manifold-data-has-resource>
```

## Querying specific resource

Adding a `label` will let you see if a user has a specific resource or not. In this instance,
`no-resource` will display if a user doesn’t have **that specific resource** (they may still have
resources provisioned other than the one specfied).

```html
<manifold-data-has-resource label="my-resource">
  <span slot="loading">Loading…</span>
  <span slot="no-resource">No label called “my-resource”</span>
  <span slot="has-resource">“my-resource” found!</span>
</manifold-data-has-resource>
```

## Pausing updates

By default, this component will subscribe to updates from the server and make periodic requests. To
disable that, add the `paused` attribute:

```html
<manifold-data-has-resource paused></manifold-data-has-resource>
```

## Events

You can also programatically listen for events with the `manifold-hasResource-load` event. This is
handy for redirecting in the case of resources not found:

```js
document.addEventListener('manifold-hasResource-load', ({ detail }) => {
  console.log(detail);

  // {
  //   hasAnyResources: true,
  //   resourceLabel: 'my-resource',
  // }
});
```

[slot]: https://stenciljs.com/docs/templating-jsx/
