# Data Product Name

Retrieve a product’s full name from a `:productLabel`.

## Usage

```html
<manifold-data-product-name product-label="jawsdb-mysql" />
<!-- JawsDB MySQL -->
```

## Loading State

This data component supports an optional loading state by specifying a child slot:

```html
<manifold-data-product-name product-label="logdna">
  Loading…
</manifold-data-product-name>
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                  | Type         | Default                 |
| -------------- | --------------- | -------------------------------------------- | ------------ | ----------------------- |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>` | `Connection` | `connections[Env.Prod]` |
| `productLabel` | `product-label` | URL-friendly slug (e.g. `"jawsdb-mysql"`)    | `string`     | `undefined`             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
