# Marketplace

A list of all Manifold services.

```html
<manifold-marketplace></manifold-marketplace>
```

## URL format

```html
<manifold-marketplace service-link="/services/:service"></manifold-marketplace>
```

This turns the service cards into `<a>` tags with the URL structure of `<a href="/services/jawsdb-mysql">`, etc. Even if you plan on using JavaScript on
top, setting this is still recommended for accessibility purposes.

`:service` is the only dynamic paramater accepted. Everything else in the
formula will be displayed as-is.

For each service, the URL slug can be found at `https://manifold.co/services/:service`.

## JavaScript callback

Coming soon!

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                             | Default     |
| ------------- | -------------- | ----------- | -------------------------------- | ----------- |
| `serviceLink` | `service-link` |             | `string \| undefined`            | `undefined` |
| `theme`       | `theme`        |             | `"dark" \| "light" \| undefined` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
