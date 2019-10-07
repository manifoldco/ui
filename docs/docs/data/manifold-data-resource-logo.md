---
title: 🔒 Resource Logo
path: /data/resource-logo
example: |
  <manifold-data-resource-logo resource-label="my-scout-resource">
  </manifold-data-resource-logo>
---

# Data Resource Logo

Retrieve an unstyled `<img>` tag with the resource's product logo from a `:resourceLabel`.

## Usage

```html
<manifold-data-resource-logo resource-label="my-scout-resource"></manifold-data-resource-logo>
<!-- <img src="https://cdn.manifold.co/providers/scout/logos/h3z4mxt33k3ufm7rzmth0xa4r8.png" alt="Scout" /> -->
```

## Alt attribute

By default, the `<img>` tag’s `alt` attribute is the resource's product name. But you can override
this by specifying one of your own:

```html
<manifold-data-resource-logo
  resource-label="iron_cache"
  alt="My alternate text"
></manifold-data-resource-logo>
```
