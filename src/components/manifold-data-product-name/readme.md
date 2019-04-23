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

## Loading State

This data component supports an optional loading state by specifying a child slot:

```html
<manifold-data-product-name product-label="logdna">
  Loading…
</manifold-data-product-name>
```

The loading slot supports text as well as HTML elements.

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                  | Type                  | Default            |
| -------------- | --------------- | -------------------------------------------- | --------------------- | ------------------ |
| `connection`   | --              | _(hidden)_ Passed by `<manifold-connection>` | `Connection`          | `connections.prod` |
| `productId`    | `product-id`    | Product ID (e.g. `"jawsdb-mysql"`)           | `string \| undefined` | `undefined`        |
| `productLabel` | `product-label` | URL-friendly slug (e.g. `"jawsdb-mysql"`)    | `string \| undefined` | `undefined`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
