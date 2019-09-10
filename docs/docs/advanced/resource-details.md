---
title: Resource Helpers
path: /advanced/resource-details
example: |
  <style>
    manifold-data-rename-button button,
    manifold-data-deprovision-button button,
    manifold-data-sso-button button {
      border: none;
      padding: 0;
    }
  </style>
  <manifold-mock-resource>
    <div style="display: flex; justify-content: space-between; margin-bottom: 1em;">
      <div style="display: flex; align-items: center;">
        <manifold-input default-value="my-resource" disabled></manifold-input>
        <manifold-resource-status size="small" style="margin-left: 1em;"></manifold-resource-status>
      </div>
      <div>
        <manifold-resource-rename>
          <manifold-button>Rename</manifold-button>
        </manifold-resource-rename>
        <manifold-resource-sso>
          <manifold-button>SSO</manifold-button>
        </manifold-resource-sso>
        <manifold-resource-deprovision>
          <manifold-button>Deprovision</manifold-button>
        </manifold-resource-deprovision>
      </div>
    </div>
    <manifold-resource-product style="margin-bottom: 1em"></manifold-resource-product>
    <manifold-resource-plan style="margin-bottom: 1em"></manifold-resource-plan>
    <manifold-resource-credentials></manifold-resource-credentials>
  </manifold-mock-resource>
---

# Resource Helpers

A special wrapper component, `<manifold-resource-container>`, can be used to create a special shared
context for related resource components. Using this has the following advantages:

- Requests will be consolidated so users experience shorter loading times
- You don’t have to specify `resource-label="my-resource"` on all its children

To use this special context, you also have to use aliased components, as specified below:

```html
<manifold-resource-container resource-label="my-resource">
  <!-- use any, or all, of the following components: -->

  <manifold-resource-credentials></manifold-resource-credentials>

  <manifold-resource-deprovision>Deprovision</manifold-resource-deprovision>

  <manifold-resource-plan></manifold-resource-plan>

  <manifold-resource-product></manifold-resource-product>

  <manifold-resource-rename>Rename</manifold-resource-rename>

  <manifold-resource-sso>Launch Dashboard</manifold-resource-sso>

  <manifold-resource-status></manifold-resource-status>
</manifold-resource-container>
```

All of the children of `<manifold-resource-container>` are special versions of existing components.
**These versions of components don’t require any attributes.** They do emit all events, and accept
all children of their aliases:

| Original component                                  | Resource context version          |       Events?       |
| :-------------------------------------------------- | :-------------------------------- | :-----------------: |
| [`<manifold-credentials>`][credentials]             | `<manifold-resource-credentials>` |                     |
| [`<manifold-data-deprovision-button>`][deprovision] | `<manifold-resource-deprovision>` | [Yes][deprovision]  |
| [`<manifold-data-rename-button>`][rename]           | `<manifold-resource-rename>`      |    [Yes][rename]    |
| [`<manifold-data-sso-button>`][sso]                 | `<manifold-resource-sso>`         |     [Yes][sso]      |
| [`<manifold-service-card>`][service-card]           | `<manifold-resource-product>`     | [Yes][service-card] |
| [`<manifold-plan>`][plan]                           | `<manifold-resource-plan>`        |                     |
| [`<manifold-resource-status>`][status]              | `<manifold-resource-status>`      |                     |

_For example: the `<manifold-resource-sso>` component will emit the same `manifold-ssoButton-click`,
`manifold-ssoButton-success`, and `manifold-ssoButton-error` events as
`<manifold-data-sso-button>`._

## Refetch until valid

The `refetch-until-valid` property on the `resource-container` can be used to force the container to
continually attempt to fetch the resource until it has found one and the status of that resource is
available. This is useful for reloading the page until the resource has finished resizing or
provisioning for example.

```html
<manifold-resource-container resource-label="my-resource" refetch-until-valid>
  <manifold-resource-credentials></manifold-resource-credentials>
</manifold-resource-container>
```

[credentials]: /components/credentials
[deprovision]: /data/deprovision-button
[plan]: /components/plan
[rename]: /data/rename-button
[resource-plan]: /components/manifold-resource-plan
[resource-product]: /components/manifold-resource-product
[service-card]: /components/manifold-service-card
[sso]: /data/sso-button
[status]: /components/resource-status/
