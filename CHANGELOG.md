# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Changed the docs fetch mocking to now wait for the real request duration. This duration is obtained at build time from the manifold APIs.

## [v0.5.8]

### Fixed

- Fixed resource card CTA slot from flashing while loading (#438)
- Hide credentials button no longer flashes when credentials component loads (#434)
- When an expired auth token causes an API call to respond with a 401, the token will now refresh and
  the API call will retry.

### Changed

- Enforce standard height on product cards for more consistency
- Replace auth token polling with an event based system

## [v0.5.7]

### Added

- We now release and publish our components to our CDN @ `https://js.cdn.manifold.co/@manifoldco/ui`. (#408, #418)

### Fixed

- Fixed events firing twice for `<manifold-resource-rename>`, `<manifold-resource-sso>`, and `<manifold-resource-deprovision>` (#401)
- Performance optimizations for network calls in `manifold-marketplace` (#424)
- Prevent provision button from being clicked multiple times.
- Fixed a bug in Firefox with `<manifold-auth-token> (#429)`

### Changed

- Removed padding above `<manifold-product-page>` (#399)
- Adjusted positioning for CTA slot in `manifold-service-card-view`. (#404)

### Added

- `<manifold-performance>` component for partners to add opt-in metrics collection to their implementation (#427)

## [v0.5.5]

### Fixed

- Stability improvements for GraphQL queries (#376)
- Improved loading state for `<manifold-resource-list>` (#382)
- Fixed public endpoints trying to authenticate (#383)
- Fixed “no services“ flash on `<manifold-marketplace>` (#390)

## [v0.5.4]

### Fixed

- Fixed the service card loading the free badge after rendering, which caused a jumpy UI. (#355)
- Added the ability to specify a slot on the `manifold-credentials` with a default manifold button if not set. (#362)

### Changed

- Updated Stencil to v1.2.5 (#375)
- Changed the event name for the `manifold-auth-token` component from the stencil auto-generated name to `manifold-token-receive` and documented that event. (#360)
- View component `<manifold-service-card-view>` no longer fetches data, is it should (#355)

### Fixed

- Fixed issue where success event of `manifold-data-rename-resource` was emitted before renamed resource was ready. (#380)

## [v0.5.3]

### Fixed

- Fixed the deprovision button failing because the code expected a JSON return value.
- Fixed the resource list not showing the status of provisioning or deprovisioning resources.
- Fixed the resource card loading indicator - for a lack of a better word - wobbling around like its life depended on it.
- Fixed the title of the `service-card` taking a dynamic amount of space and making the description look misaligned.
- Fixed the appearance of “free“ badges on product cards in `<manifold-marketplace>`

### Added

- Added a `refetch-until-valid` property on the `resource-container` component to allow users to reload this component until the found resource exists and is of state `available`.
- Added the terms of service to the product page component.
- Added `<manifold-plan-selector free-plans>` filter flag

## [v0.5.2]

### Added

- Added `oauth-url` prop to `manifold-auth-token` component.

### Fixed

- Fixed name for `manifold-service-view` to be `manifold-service-card-view` to match documentation.
- Added missing support for theme variable `--manifold-tag-free-text-color`.
- Fixed region selector so that it properly emits a `manifold-planSelector-change` event when the region changes.
- Fixed scroll highlight for `<manifold-marketplace>` sidebar

### Deprecated

- Deprecated `resource-label` attibute on `manifold-data-product-logo`. Use `manifold-data-resource-logo` component instead.
- Deprecated `region-name` prop in favour of `region-id` for `manifold-data-provision-button`.

### Changed

- Added graphqlFetch to `manifold-connection`.
- Converted `manifold-data-product-logo` to use GraphQL.
- Changed the provision button so it fetches the owner ID automatically if not set.
- Added `productName` to `manifold-marketplace-click` event in the `manifold-service-card` component.
- Improved `plan-selector` performance by reducing API calls for non-custom plans.

## [v0.5.0]

### Added

- Added a SSO data button and the resource wrapper for ssoing into a resource's product dashboard.
- Added a new CTA slot in the product card for displaying unique cta content.

### Fixed

- Fixed the provision button requiring the label to be set, preventing or automatic label generation from working.

### Changed

- Changed the `manifold-auth-token` component to now use the shadowcat oauth system rather than only use the given token. This enables platforms to now use real authentication.

## [0.4.3]

### Fixed

- Fixed the rename and deprovision button not behaving properly when used in their resource warpers

## [0.4.2]

### Changed

- Changed the deprovision and rename button to not include a shadow dom root, they can now be styled from external stylesheets.

## [0.4.1]

### Changed

- Made all the internal attributes optional on the components to make sure TypeScript does not complain.

## [0.4.0]

### Deprecated

- Deprecated the `resource-name` attribute in all the resource components for `resource-label` as to be more consistent with the other components and our other codebases.

### Changed

- Changed how the `manifold-service-card` works to have it fetch the product unless given. This allows it to be used standalone or in the `marketplace`.

## [0.3.1]

### Added

- New `manifold-resource-product` and `manifold-resource-plan` component to load a resource's product and plan card.
- New `manifold-data-deprovision-button` component that allows to deprovision a resource.
- New `manifold-data-rename-button` component that allows to rename a resource.
- New `manifold-credentials` component that allows to see a resource's credentials without needing to be in a `resource-container`.
- New `manifold-mock-resource` component that allows to mock a `resource-container` with a fake resource.

### Changed

- Changed the input from the `manifold-data-provision-button` to remove the input make it a pure button.
- Changed the `manifold-resource-status` component to now display in two different sizes.
- Changed the `manifold-resource-credentials` component to use the standalone `manifold-credentials` component.

[0.3.0]: https://github.com/manifoldco/ui/compare/v0.2.1...v0.3.0
[0.2.2]: https://github.com/manifoldco/ui/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/manifoldco/ui/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/manifoldco/ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/manifoldco/ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/manifoldco/ui/compare/v0.0.2...v0.1.0
[0.1.0]: https://github.com/manifoldco/ui/compare/v0.0.2...v0.1.0
[0.0.3]: https://github.com/manifoldco/ui/releases/tag/v0.0.3
