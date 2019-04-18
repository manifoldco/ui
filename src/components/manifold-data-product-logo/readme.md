# Data Product Logo

Retrieve an unstyled `<img>` tag with the product’s logo from a `:productLabel`. Similar to `<manifold-data-product-name>`.

## Usage

```html
<manifold-data-product-logo product-label="scout" />
<!-- <img src="https://cdn.manifold.co/providers/scout/logos/h3z4mxt33k3ufm7rzmth0xa4r8.png" alt="Scout" /> -->
```

## Loading State

This data component supports an optional loading state by specifying a child slot:

```html
<manifold-data-product-logo product-label="scout">
  <img src="placeholder.svg" alt="Loading…" />
</manifold-data-product-logo>
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                  | Type                  | Default                 |
| -------------- | --------------- | -------------------------------------------- | --------------------- | ----------------------- |
| `alt`          | `alt`           | _(optional)_ `alt` attribute                 | `string \| undefined` | `undefined`             |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>` | `Connection`          | `connections[Env.Prod]` |
| `productLabel` | `product-label` | URL-friendly slug (e.g. `"jawsdb-mysql"`)    | `string`              | `undefined`             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
