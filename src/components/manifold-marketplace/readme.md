# manifold-marketplace

## Service Cards

### Anchor link formatting

By passing a `serviceLink` prop to the top-level component, you can specify a
URL pattern like so:

```html
<manifold-marketplace serviceLink="/services/:service"></manifold-marketplace>
```

The `:service` placeholder will be replaced with a URL-friendly slug of the
service clicked on. That will render links like so:

```html
<a href="/services/jawsdb-mysql"></a>
<a href="/services/logdna"></a>
<a href="/services/mailgun"></a>
```

Even if you plan on using JavaScript in addition, setting `serviceLink` to
set `href` is still recommended for accessibility purposes.

### JavaScript callback

Coming soon!

## Marketplace Management

### Featured Services

Passing a string of comma-separated service slugs to the top-level component
will display a “featured” tag for those services:

```html
<manifold-marketplace featured="jawsdb-mysql,logdna"></manifold-marketplace>
```

For each service, the URL slug can be found at
`https://manifold.co/services/:service`.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                | Default     |
| ------------- | -------------- | ----------- | ------------------- | ----------- |
| `serviceLink` | `service-link` |             | `string`            | `undefined` |
| `theme`       | `theme`        |             | `"dark" \| "light"` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
