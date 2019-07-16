---
title: Product Name
path: /data/product-name
example: |
  <manifold-data-product-name product-label="iron_cache">
  </manifold-data-product-name>
---

<manifold-toast alert-type="warning">
  <div><code>resource-name</code> has been deprecated in favor of <code>resource-label</code> starting in version 0.4.0.</div>
</manifold-toast>

# Data Product Name

Retrieve a product’s full name from a `:productLabel` as an unstyled text node.

Can’t remember a product’s capitalization? Want to receive automatic updates
if a service rebrands? We’ve got you covered with a simple name web
component.

## Usage

```html
<manifold-data-product-name product-label="piio" />
<!-- Piio -->
```

The loading slot supports text as well as HTML elements.

## Resource Name

You can look up a logo by resource label by passing `resource-label`:

```html
<manifold-data-product-logo resource-label="my-resource" />
```
