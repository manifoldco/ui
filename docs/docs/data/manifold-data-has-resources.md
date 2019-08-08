---
title: 🔒 Has Resources
path: /data/has-resource
example: |
  <manifold-data-has-resource paused="">
    <span slot="no-resource">No resources</span>
    <span slot="has-resource">Has resources</span>
  </manifold-data-has-resource>
---

# Has Resources

Unstyled conditional component that will render a specific slot depending on whether or not the user
has any resources in their profile.

## Pausing updates

By default, this component will subscribe to updates from the server. To
disable that, pass the `paused` attribute:

```html
<manifold-data-has-resource paused></manifold-data-has-resource>
```

## Has one or more resources

You can pass in your own content to render if the user has one or more resources
by passing in any element with `slot="has-resource"` as an attribute. [Read more about
slots][slot].

```html
<manifold-data-has-resource>
  <span slot="has-resource">Has resources</span>
</manifold-data-has-resource>
```

## Has no resources

You can pass in your own content to render if the user has no resources
by passing in any element with `slot="no-resource"` as an attribute. [Read more about
slots][slot].

```html
<manifold-data-has-resource>
  <span slot="no-resource">No resources</span>
</manifold-data-has-resource>
```

[slot]: https://stenciljs.com/docs/templating-jsx/
