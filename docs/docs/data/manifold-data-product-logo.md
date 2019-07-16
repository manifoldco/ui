---
title: Product Logo
path: /data/product-logo
example: |
  <manifold-data-product-logo product-label="aiven-redis">
  </manifold-data-product-logo>
---

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>

# Data Product Logo

Retrieve an unstyled `<img>` tag with the product’s logo from a
`:productLabel`.

## Usage

```html
<manifold-data-product-logo product-label="scout" />
<!-- <img src="https://cdn.manifold.co/providers/scout/logos/h3z4mxt33k3ufm7rzmth0xa4r8.png" alt="Scout" /> -->
```

## Alt attribute

By default, the `<img>` tag’s `alt` attribute is the product name. But you
can override this by specifying one of your own:

```html
<manifold-data-product-logo product-label="iron_cache" alt="My alternate text" />
```

## Resource Name

You can look up a logo by resource name by passing `resource-label`:

```html
<manifold-data-product-logo resource-label="my-resource" />
```
