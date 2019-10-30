#### 0.6.1 (2019-10-25)

##### Bug Fixes

* Removed Node version restriction on package (#659)

##### Chores

* Updated Stencil to v1.7.4 (#652)

#### 0.6.0 (2019-10-22)

##### Breaking Changes:

* `<manifold-data-provision-button>` now requires `plan-id` rather than `plan-label` as a prop
* `<manifold-plan>` now requires `plan-id` rather than `plan-label` as a prop

##### New Features

* Added a `sidebar` slot to `<manifold-marketplace>` (#612)
* Exposed `ensureAuthToken` function for making authenticated GraphQL calls directly from platforms (#576)
* Added `ownerId` prop to `<manifold-data-provision-button>`, `<manifold-data-resource-list>`, and `<manifold-resource-list>`

##### Performance Improvements

* Converted `manifold-resource-container` to use the GraphQL.
* Converted `manifold-resource-plan` to use the GraphQL data fetched from the `manifold-resource-container`. (#578)
* Converted `manifold-resource-credentials` to use the GraphQL data fetched from the `manifold-resource-container`. (#584)
* Converted `manifold-resource-deprovision` to use the GraphQL data fetched from the `manifold-resource-container`. (#595)
* Converted `<manifold-data-rename-button>` to use GraphQL (#596)
* Converted `<manifold-data-provision-button>` to use GraphQL data (#600)
* Converted `manifold-resource-rename` to use the GraphQL data fetched from the `manifold-resource-container`. (#602)
* Converted `manifold-resource-sso` to use the GraphQL data fetched from the `manifold-resource-container`. (#603)
* Converted `<manifold-data-deprovision-button>` to use GraphQL (#604)
* Converted `<manifold-plan-cost>` to GraphQL (#605)
* Converted `<manifold-data-resize-button>` to use GraphQL (#609)
* Converted `<manifold-resource-status>` to use GraphQL (#611)
* Converted `<manifold-resource-list>` to use GraphQL (#627)
* Converted `<manifold-data-resource-logo>` to use GraphQL (#635)
* Converted `<manifold-data-sso-button>` to use GraphQL (#640)

##### Chores

* Removed `manifold-resource-details` component. (#597)
* Owner ID no longer fetched to create/delete resources (#608)
* Updated `<manifold-product>` ahead of a GraphQL deprecation (#619)
* Updated Stencil to v1.7.2 (#631)
* Added test for `<manifold-plan-selector regions="">` (#644)

#### 0.5.17 (2019-10-02)

##### Performance Improvements

* Converted `manifold-resource-product` to use the GraphQL data fetched from the `manifold-resource-container`. (#566)

#### 0.5.16 (2019-09-30)

##### Chores

* Added `manifold-product-load` event (#560)

##### New Features

* Deprecated friendly resource names in favor of kebab-case resource labels (#559)
* Removed `resource-id` prop from `manifild-resource-card` (#537)
* Converted `manifold-resource-card` to GraphQL (#537)

#### 0.5.15 (2019-09-29)

##### New Features

* Added `manifold-resource-load` event to `manifold-resource-container` (#556)

#### 0.5.14 (2019-09-29)

##### New Features

* Added `disabled` attribute to `manifold-resource-rename` (#553)

##### Bug Fixes

* Fixed local testing addresses.
* Fixed console warning about `loading="lazy"` (#552)
* Prevent actions on `<manifold-credentials>` while awaiting a resourceLabel (#554)

##### Chores

* Changed number of skeleton products that load (#551)

#### 0.5.13 (2019-09-29)

##### Bug Fixes

* Credentials appear one-per-line (#546)
* Fixed credential error message top margin (#545)
* Fixed success event after a resource rename to include potentially modified label (#547)

#### 0.5.12 (2019-09-26)

##### Breaking changes

* `resource-id` renamed to `resource-label` in `<manifold-resource-card>`
* `product-id` renamed to `product-label` in `<manifold-service-card>`

##### New Features

* Added `label` to `<manifold-data-has-resource>` (#542)

##### Chores

* Removed `product-id` from `manifold-service-card` (#533)

##### Performance Improvements

* Converted `manifold-service-card` to GraphQL (#533)

##### Bug Fixes

* Fixed loading flicker of resource components while provisioning/deprovisioning. (#539)

#### 0.5.11 (2019-09-19)

##### New Features

* Ability to authenticate and refresh manually, bypassing OAuth. (#495)
* Added a time to first meaningful render event to be consumed by `<manifold-performance>` component (#501)

##### Chores

* Changed `manifold-marketplace` to use GraphQL. (#489)
* Improved Storybook stories (#500)
* `@manifoldco/shadowcat` is now part of UI. (#498)
* `<manifold-data-provision-button>` will now work even if given an undefined resource label. The API will auto-generate the label if omitted. (#503)

##### Bug Fixes

* Fixed `<manifold-button>` borders (#500)
* `<manifold-credentials>` now uses GraphQL (#490)
* `<manifold-marketplace>` fetches products in one request (#522)

#### 0.5.10 (2019-09-09)

##### New Features

* Enabled custom loading indicators. (#471)
* Added `<manifold-copy-credentials>` for quickly-copying secrets to a user’s clipboard. (#452)

##### Bug Fixes

* Multiple queries in GraphQL now supported in TypeScript. (#476)

##### Chores

* Clarified documentation for multiple components. (#481)

## 0.5.9 (2019-09-05)

##### New Features

* Added an events queue to `<manifold-performance>` to capture any performance events emitted before DataDog is ready. (#451)
* Added more event data & testing for `<manifold-data-provision-button>`. (#447)

##### Bug Fixes

* Fixed a typo in manifold-data-deprovision-button documentation. (#457)
* Upgraded `@manifoldco/shadowcat` to feature the latest security patches. (#477)

##### Chores

* Changed the docs fetch mocking to now wait for the real request duration. This duration is obtained at build time from the manifold APIs. (#450)
* Changed the `manifold-product` component to now use the GraphQL API rather than the REST API. (#456)
* Changed `manifold-data-product-name` to use GraphQL. (#463)
* Changed `manifold-data-resource-list` to use GraphQL. (#474)

#### 0.5.8 (2019-08-26)

##### Bug Fixes

* Fixed resource card CTA slot from flashing while loading. (#438)
* Hide credentials button no longer flashes when credentials component loads. (#434)
* When an expired auth token causes an API call to respond with a 401, the token will now refresh and the API call will retry. (#440)

##### Chores

* Enforce standard height on product cards for more consistency. (#435)
* Replace auth token polling with an event based system. (#436)

#### 0.5.7 (2019-08-23)

##### New Features

* `<manifold-performance>` component for partners to add opt-in metrics collection to their implementation (#427)
* We now release and publish our components to our CDN @ `https://js.cdn.manifold.co/@manifoldco/ui`. (#408, #418)

##### Bug Fixes

* Fixed events firing twice for `<manifold-resource-rename>`, `<manifold-resource-sso>`, and `<manifold-resource-deprovision>`. (#401)
* Performance optimizations for network calls in `manifold-marketplace`. (#424)
* Prevent provision button from being clicked multiple times. (#410)
* Fixed a bug in Firefox with `<manifold-auth-token>`. (#429)
* Removed padding above `<manifold-product-page>` (#399)
* Adjusted positioning for CTA slot in `manifold-service-card-view`. (#404) )

#### 0.5.6 (2019-08-21)

##### New Features

* Emit metrics events from restFetch and graphqlFetch (#396)

##### Bug Fixes

* Fixed flash of “No services found” on marketplace grid (#390)

#### 0.5.5 (2019-08-16)

##### Bug Fixes

* Stability improvements for GraphQL queries (#376)
* Improved loading state for `<manifold-resource-list>` (#382)
* Fixed public endpoints trying to authenticate (#383)
* Fixed “no services“ flash on `<manifold-marketplace>` (#390)

#### 0.5.4 (2019-08-15)

##### Bug Fixes

* Fixed the service card loading the free badge after rendering, which caused a jumpy UI. (#355)
* Added the ability to specify a slot on the `manifold-credentials` with a default manifold button if not set. (#362)

##### Chores

* Updated Stencil to v1.2.5 (#375)
* Changed the event name for the `manifold-auth-token` component from the stencil auto-generated name to `manifold-token-receive` and documented that event. (#360)
* View component `<manifold-service-card-view>` no longer fetches data, is it should (#355)

##### Bug Fixes

* Fixed issue where success event of `manifold-data-rename-resource` was emitted before renamed
  resource was ready. (#380)

#### 0.5.3 (2019-08-12)

##### Bug Fixes

* Fixed the deprovision button failing because the code expected a JSON return value.
* Fixed the resource list not showing the status of provisioning or deprovisioning resources.
* Fixed the resource card loading indicator - for a lack of a better word - wobbling around like its life depended on it.
* Fixed the title of the `service-card` taking a dynamic amount of space and making the description look misaligned.
* Fixed the appearance of “free“ badges on product cards in `<manifold-marketplace>`

##### New Features

* Added a `refetch-until-valid` property on the `resource-container` component to allow users to reload this component until the found resource exists and is of state `available`.
* Added the terms of service to the product page component.
* Added `<manifold-plan-selector free-plans>` filter flag

#### 0.5.2 (2019-08-02)

##### Breaking changes

* Deprecated `resource-label` attibute on `manifold-data-product-logo`. Use `manifold-data-resource-logo` component instead.
* Deprecated `region-name` prop in favour of `region-id` for `manifold-data-provision-button`.

##### New Features

* Added `oauth-url` prop to `manifold-auth-token` component.

##### Bug Fixes

* Fixed name for `manifold-service-view` to be `manifold-service-card-view` to match documentation.
* Added missing support for theme variable `--manifold-tag-free-text-color`.
* Fixed region selector so that it properly emits a `manifold-planSelector-change` event when the region changes.
* Fixed scroll highlight for `<manifold-marketplace>` sidebar

##### Chores

* Added graphqlFetch to `manifold-connection`.
* Converted `manifold-data-product-logo` to use GraphQL.
* Changed the provision button so it fetches the owner ID automatically if not set.
* Added `productName` to `manifold-marketplace-click` event in the `manifold-service-card` component.
* Improved `plan-selector` performance by reducing API calls for non-custom plans.

#### 0.5.1 (2019-08-01)

##### Breaking changes

* `resource-label` removed from `<manifold-data-product-logo>` in favor of new `<manifold-data-resource-logo>` component

#### 0.5.0 (2019-07-25)

##### New Features

* Added a SSO data button and the resource wrapper for ssoing into a resource's product dashboard.
* Added a new CTA slot in the product card for displaying unique cta content.

##### Bug Fixes

* Fixed the provision button requiring the label to be set, preventing or automatic label generation from working.

##### Chores

* Changed the `manifold-auth-token` component to now use the shadowcat oauth system rather than only use the given token. This enables platforms to now use real authentication.

#### 0.4.3 (2019-07-16)

##### Bug Fixes

* Fixed the rename and deprovision button not behaving properly when used in their resource warpers

#### 0.4.2 (2019-07-16)

##### Chores

* Changed the deprovision and rename button to not include a shadow dom root, they can now be styled from external stylesheets.

#### 0.4.1 (2019-07-15)

##### Chores

* Made all the internal attributes optional on the components to make sure TypeScript does not complain.

#### 0.4.0 (2019-07-15)

##### Breaking changes

* Deprecated the `resource-name` attribute in all the resource components for `resource-label` as to be more consistent with the other components and our other codebases.
* `resource-name` renamed to `resource-label` in the following components: `<manifold-resource-list>`, `<manifold-resource-plan>`, `<manifold-resource-product>`, `<manifold-data-product-logo>`, `<manifold-data-product-name>`, `<manifold-data-provision-button>`, `<manifold-data-resource-list>`

##### Chores

* Changed how the `manifold-service-card` works to have it fetch the product unless given. This allows it to be used standalone or in the `marketplace`.

#### 0.3.1 (2019-07-12)

##### New Features

* New `manifold-resource-product` and `manifold-resource-plan` component to load a resource's product and plan card.
* New `manifold-data-deprovision-button` component that allows to deprovision a resource.
* New `manifold-data-rename-button` component that allows to rename a resource.
* New `manifold-credentials` component that allows to see a resource's credentials without needing to be in a `resource-container`.
* New `manifold-mock-resource` component that allows to mock a `resource-container` with a fake resource.
* Added new size to `manifold-resource-status`

##### Chores

* Changed the input from the `manifold-data-provision-button` to remove the input make it a pure button.
* Changed the `manifold-resource-credentials` component to use the standalone `manifold-credentials` component.

#### 0.3.0 (2019-07-09)

* https://github.com/manifoldco/ui/compare/v0.2.2...v0.3.0

#### 0.2.2 (2019-07-08)

* https://github.com/manifoldco/ui/compare/v0.2.1...v0.2.2

#### 0.2.1 (2019-07-05)

* https://github.com/manifoldco/ui/compare/v0.2.0...v0.2.1

#### 0.2.0 (2019-07-04)

* https://github.com/manifoldco/ui/compare/v0.1.1...v0.2.0

#### 0.1.1 (2019-06-19)

* https://github.com/manifoldco/ui/compare/v0.1.0...v0.1.1

#### 0.1.0 (2019-06-13)

* https://github.com/manifoldco/ui/compare/v0.0.3...v0.1.0
