---
title: Changelog
path: /changelog
---

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Added `oauth-url` prop to `manifold-auth-token` component.

### Fixed
- Fixed name for `manifold-service-view` to be `manifold-service-card-view` to match documentation.
- Added missing support for theme variable `--manifold-tag-free-text-color`.

### Deprecated
- Deprecated `resource-label` attibute on `manifold-data-product-logo`. Use `manifold-data-resource-logo` component instead.
- Deprecated `region-name` prop in favour of `region-id` for `manifold-data-provision-button`.

### Changed
- Added graphqlFetch to `manifold-connection`.
- Converted `manifold-data-product-logo` to use GraphQL.
- Changed the provision button so it fetches the owner ID automatically if not set.
- Added `productName` to `manifold-marketplace-click` event in the `manifold-service-card` component.

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
