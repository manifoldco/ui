---
title: Product Logo
path: /data/product-logo
example: |
  <manifold-data-product-logo product-label="aiven-redis"></manifold-data-product-logo>
---

# Data Product Logo

Retrieve an unstyled `<img>` tag with the product’s logo from a `:productLabel`.

## Usage

```html
<manifold-data-product-logo product-label="scout"></manifold-data-product-logo>
<!-- <img src="https://cdn.manifold.co/providers/scout/logos/h3z4mxt33k3ufm7rzmth0xa4r8.png" alt="Scout" /> -->
```

## Alt attribute

By default, the `<img>` tag’s `alt` attribute is the product name. But you can override this by
specifying one of your own:

```html
<manifold-data-product-logo
  product-label="iron_cache"
  alt="My alternate text"
></manifold-data-product-logo>
```
