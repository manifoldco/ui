# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
