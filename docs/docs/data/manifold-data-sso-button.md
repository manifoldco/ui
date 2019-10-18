---
title: 🔒 SSO Button
path: /data/sso-button
example: |
  <manifold-data-sso-button resource-label="my-resource">
    SSO into resource
  </manifold-data-sso-button>
---

# 🔒 SSO Button

The `<manifold-data-sso-button>` component allows a user to quickly launch the dashboard of a
provisioned resource without creating a user account. 🔒 Requires [authentication][auth].

```html
<manifold-data-sso-button resource-label="my-resource">
  Launch dashboard
</manifold-data-sso-button>
```

Even though an `<a href="">` tag would be more semantic, we have to do use a `<button>` because the
link is created on-the-fly when a user clicks it and the token expires quickly for security.

It’s for this reason that you **MUST handle the `manifold-ssoButton-success` event** manually to
complete the integration.

## Retrieving by ID

Alternatively, if you’d like to fetch a resource by ID, you can use `resource-id=""`. If both
`resource-label` and `resource-id` are specified, ID will take priority.

```html
<manifold-data-sso-button resource-id="2358fw1rfjtjv0ubty0waymvd204c">
  Launch dashboard
</manifold-data-sso-button>
```

## Events

For validation, error, and success messages, it will emit custom events.

```js
document.addEventListener(
  'manifold-ssoButton-success',
  ({ detail: { resourceLabel, redirectUrl } }) => {
    // ⚠️ IMPORTANT! You must pass redirectUrl to your router or handle the redirect yourself
    window.location = redirectUrl;
  }
);
document.addEventListener('manifold-ssoButton-click', ({ detail: { resourceLabel } }) =>
  console.info(`⌛ Launching dashboard for ${resourceLabel} …`)
);
document.addEventListener('manifold-ssoButton-error', ({ detail }) => console.log(detail));
// {
//   type: 'not_found',
//   message: 'not_found: Resource not found',
//   resourceid: '2358fw1rfjtjv0ubty0waymvd204c',
//   resourceLabel: 'my-resource',
// }
```

| Name                         |                         Returns                         | Description                                                                                                                 |
| :--------------------------- | :-----------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `manifold-ssoButton-click`   |              `resourceId`, `resourceLabel`              | Fires immediately when button is clicked. May be used to trigger a loading state, until `-success` or `-error` is received. |
| `manifold-ssoButton-success` | `message`, `resourceId`, `resourceLabel`, `redirectUrl` | Successful sso. Returns a resource ID, resource Label and the redirect_url for the product's dashboard.                     |
| `manifold-ssoButton-error`   |        `message`, `resourceId`, `resourceLabel`         | Erred sso, along with information on what went wrong.                                                                       |

## With container

If using the [`<manifold-resource-container>` helper][container] to combine requests and have all
components load at once, you can use the alternate version of this component:

```html
<manifold-resource-container resource-label="my-resource">
  <manifold-resource-sso>Launch dashboard</manifold-resource-sso>
</manifold-resource-container>
```

## Styling

Whereas other components in this system take advantage of [Shadow DOM][shadow-dom] encapsulation for
ease of use, we figured this component should be customizable. As such, style it however you’d like!
We recommend attaching styles to a parent element using any CSS-in-JS framework of your choice, or
plain ol’ CSS.

[auth]: /advanced/authentication
[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
