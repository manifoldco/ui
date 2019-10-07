---
title: Theming
path: /advanced/theming
---

# Theming

Manifold UI offers a simple, yet versitle, theming API for customizing the look and feel of
components.

<manifold-toast alert-type="warning">
  Theming is still a work-in-progress. This documentation may not be entirely accurate.
</manifold-toast>

<span class="tag part-implemented" /> = Partially Implemented <br />
<span class="tag not-implemented" /> = Not Implemented

## Concepts

### CSS Custom Properties

For the purposes of theming, we need to be able to apply styles within the shadow DOM. Although
selectors can't penetrate the shadow DOM, properties can still be inherited from ancestor elements.
This includes [CSS Custom Properites][custom-properties]. The use of custom properties within
Manifold UI components means that components will inherit theme values defined outside of their
shadow DOM. This preserves style encapsulation and allows certain style properties within components
to be customizable.

### Base Theme

Manifold UI comes with a base theme that provides various levels of abstraction. This allows for
easy theming at a high level for all components with just a small set of valiables, while also
exposing lower level variables for more precise theming of individual components.

We recommend that you use this base theme as a starting point for building your own custom theme. To
add the base theme to your project:

```js
import '@manifoldco/ui/dist/manifold/manifold.css';
```

### Global Theming

Global theming is the easiest way to set theme values that will be propagrated throughout the
Manifold UI components.

We recommend setting variables on `:root`, which will override variables from the base theme:

```css
/* Import the base theme somewhere before this. */

:root {
  --manifold-font-family: 'IBM Plex Sans', sans-serif;
  --manifold-color-primary: #fb3e44;
  /* Other values go here */
}
```

Some variables will work regardless of which element they are set on. However, to ensure that
overrides propagate through the base theme as intended, it's important to define them on the `:root`
element.

These variables should also be set after the base theme import, because overriding these variables
replies on [precedence](https://css-tricks.com/precedence-css-order-css-matters/).

### Component Theming [Coming Soon]

Component theming allows fine-tuning of theme values on a component level. Each component has its
own set of variables that inherit from the global theme. Overriding a component's theme variables
can be done by defining variables on the component's element selector.

<!--
Global theme variables are prefixed with `--manifold-*` to avoid potential name collisions, while internal component variables are not prefixed.



```css
manifold-marketplace {
  --card-background: #fff;
  --card-background-hover: #eee;
  /* Other values go here */
}
``` -->

### Grayscales & Dark Theming

| Name                                 | Default         | Description                                        |
| ------------------------------------ | --------------- | -------------------------------------------------- |
| `--manifold-grayscale-base`          | `0, 0, 0`       | The darkest color on your grayscale in RGB values  |
| `--manifold-grayscale-base-inverted` | `255, 255, 255` | The lightest color on your grayscale in RGB values |

These grayscale bases provide the foundation for your theme. These two values, define a grayscale
range. Intermediate values are then derived by varying the opacity of each base and used throughout
Manifold UI components.

By default, `--manifold-grayscale-[opacity]` values range from solid black down to transparent, and
`--manifold-grayscale-[opacity]i` (notice the `i` for _inverted_) values range from solid white down
to transparent. The main advantage to using these two contrasting grascales, is that a dark theme
can be created simply by swapping these base values:

#### Light Theme (Default)

```css
:root {
  --manifold-grayscale-base: 0, 0, 0;
  --manifold-grayscale-base-inverted: 255, 255, 255;
}
```

#### Dark Theme

```css
:root {
  --manifold-grayscale-base: 255, 255, 255;
  --manifold-grayscale-base-inverted: 0, 0, 0;
}
```

### Theme Hierarchy

There are four theming levels:

| Level                                                           | Description                                                          |
| --------------------------------------------------------------- | -------------------------------------------------------------------- |
| Base (highest)                                                  | The base theme provided by Manifold UI                               |
| Top-level                                                       | Your custom theme and branding                                       |
| Common Components                                               | Reusable UI elements like cards, buttons, and tags                   |
| <span class="tag not-implemented" /> Unique Components (lowest) | Specific use components like Marketplace, Plan Selector, and Product |

Each level recieves its default values from the level above. Redefining a lower level value will
override the value from the higher level.

For example, the CTA button background in the Plan Selector component is customizable with one the
following properties:

```css
:root {
  /* Base: the default primary color is applied and the button is blue
  (along with other elements that use the primary color). */
  --manifold-color-primary: blue; /* imported from Manifold UI */

  /* Top-level: overrides primary color from the Base and turns the button
  red (along with other elements that use the primary color). */
  --manifold-color-primary: red;

  /* Common Component: overrides the primary color from the Top-Level and
  turns the button green (along with all other buttons). */
  --manifold-button-background: green;

  /* Unique Component (not implemented): overrides the button background from the Common
  Component and turns the button orange (no other elements are affected) */
  --manifold-plan-selector-cta-background: orange;
}
```

Text styles follow a similar hierarchy:

```css
:root {
  /* Base: default color applied to all generic text. */
  --manifold-text-color: var(--manifold-grayscale-100); /* black */

  /* Top-level: your theme's text color applied to all generic text. */
  --manifold-text-color: #444;

  /* Common Text: Text color applied to all level headings (overrides
  top-level text color). */
  --manifold-heading-text-color: #666;

  /* Unique Text (not implemented): Text color applied to category headings in the
  Marketplace component (overrides common text text color). */
  --manifold-marketplace-category-heading-text-color: #888;
}
```

#### Missing Properties?

Even at the lowest level, some properties are not exposed in the theming API. If there are
additional styles that you would like to customize for your theme, please let us know and we can
work to make them available.

### State

Some variables that are for a specific state `*-hover`, `*-focus`, `*-active` will only applied to
cetain elements. `*-hover` styles will only be applied on interactive (clickable) elements,
`*-focus` styles will only be applied to focusable elements.

## API Reference

### Grayscale

| Name                                 | Default                                                                     | Description                                        |
| ------------------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------- |
| `--manifold-grayscale-base`          | `0, 0, 0` <span class="color" style="background: rgb(0,0,0)" />             | The darkest color on your grayscale in RGB values  |
| `--manifold-grayscale-base-inverted` | `255, 255, 255` <span class="color" style="background: rgb(255,255,255)" /> | The lightest color on your grayscale in RGB values |

### Top Level Properties

| Name                               | Default                                                                        | Description                                        |
| ---------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| `--manifold-color-primary`         | `rgb(30, 80, 218)` <span class="color" style="background: rgb(30,80,218)" />   | Primary color                                      |
| `--manifold-color-success`         | `rgb(49, 186, 162)` <span class="color" style="background: rgb(49,186,162)" /> | Success color<sup>\*</sup>                         |
| `--manifold-color-info`            | `rgb(30, 80, 218)` <span class="color" style="background: rgb(30,80,218)" />   | General info message color<sup>\*</sup>            |
| `--manifold-color-warn`            | `rgb(254, 113, 75)` <span class="color" style="background: rgb(254,113,75)" /> | Warning color<sup>\*</sup>                         |
| `--manifold-color-error`           | `rgb(213, 15, 73)` <span class="color" style="background: rgb(213,15,73)" />   | Error color<sup>\*</sup>                           |
|                                    |                                                                                |                                                    |
| `--manifold-font-family`           | (System)                                                                       | Default text family                                |
| `--manifold-font-family-monospace` | `IBM Plex Sans Monospace,monospace`                                            | Code font family (credentials, etc.)               |
| `--manifold-text-color`            | `var(--manifold-grayscale-100)`                                                | Base text color                                    |
|                                    |                                                                                |                                                    |
| `--manifold-radius`                | `4px`                                                                          | Radius for buttons, tags, cards, textfields        |
|                                    |                                                                                |                                                    |
| `--manifold-border`                | `1px solid var(--manifold-grayscale-15)`                                       | Border for cards, text fields                      |
| `--manifold-border-hover`          | `1px solid var(--manifold-grayscale-30)`                                       | Border for interactive cards, text fields on hover |
| `--manifold-border-focus`          | `1px solid var(--manifold-color-primary)`                                      | Border for interactive cards, text fields on focus |
| `--manifold-border-active`         | `1px solid var(--manifold-color-primary)`                                      | Border for interactive cards when they are active  |

### Common Component Properties

#### Text

Text components are used thoughout most components.

| Name                              | Default                          | Description                                                                                              |
| --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `--manifold-text-color-secondary` | `var(--manifold-grayscale-50)`   | Secondary text color; provides additional context to some primary text. Examples: suffixes, descriptions |
| `--manifold-text-color-accent`    | `var(--manifold-grayscale-100i)` | Accent text color; overlays on `--manifold-color-primary` for buttons, tags, etc.                        |
| `--manifold-text-color-body`      | `var(--manifold-text-color)`     | Body text color; paragraphs of text.                                                                     |
| `--manifold-heading-text-color`   | `var(--manifold-text-color)`     | Text color for all headings.                                                                             |
| `--manifold-heading-font-family`  | `var(--manifold-font-family)`    | Font family for all headings                                                                             |
| `--manifold-heading-font-weight`  | `400`                            | Weight for all headings                                                                                  |

#### Cards

Cards are used in Marketplace (service cards) and Plan Selector (plan buttons, plan details panel).

| Name                                | Default                           | Property              |
| ----------------------------------- | --------------------------------- | --------------------- |
| `--manifold-card-background`        | `var(--manifold-grayscale-100i)`  | `background`          |
| `--manifold-card-border`            | `var(--manifold-border)`          | `border`              |
| `--manifold-card-radius`            | `var(--manifold-radius)`          | `border-radius`       |
| `--manifold-card-shadow`            | `none`                            | `box-shadow`          |
|                                     |                                   |                       |
| `--manifold-card-background-hover`  | `var(--manifold-card-background)` | `background` (hover)  |
| `--manifold-card-border-hover`      | `var(--manifold-card-border)`     | `border` (hover)      |
| `--manifold-card-shadow-hover`      | `var(--manifold-card-shadow)`     | `box-shadow` (hover)  |
|                                     |                                   |                       |
| `--manifold-card-background-active` | `var(--manifold-card-background)` | `background` (active) |
| `--manifold-card-border-active`     | `var(--manifold-border-active)`   | `border` (active)     |
| `--manifold-card-text-color-active` | `var(--manifold-text-color)`      | `color` (active)      |

#### Input Fields

| Name                                | Default                                  | Property             |
| ----------------------------------- | ---------------------------------------- | -------------------- |
| `--manifold-input-background`       | `var(--manifold-grayscale-100i)`         | `background`         |
| `--manifold-input-text-color`       | `var(--manifold-text-color)`             | `color`              |
| `--manifold-input-border`           | `var(--manifold-border)`                 | `border`             |
| `--manifold-input-radius`           | `var(--manifold-radius)`                 | `border-radius`      |
| `--manifold-input-shadow`           | `none`                                   | `box-shadow`         |
|                                     |                                          |                      |
| `--manifold-input-background-focus` | `var(--manifold-input-background-hover)` | `background` (focus) |
| `--manifold-input-border-focus`     | `var(--manifold-input-border-focus)`     | `border` (focus)     |
| `--manifold-input-shadow-focus`     | `var(--manifold-input-shadow-hover)`     | `box-shadow` (focus) |

#### Tags

| Name                             | Default                             | Property            |
| -------------------------------- | ----------------------------------- | ------------------- |
| `--manifold-tag-background`      | `var(--manifold-color-primary)`     | `background`        |
| `--manifold-tag-text-color`      | `var(--manifold-text-color-accent)` | `color`             |
| `--manifold-tag-font-family`     | `var(--manifold-font-family)`       | `font-family`       |
| `--manifold-tag-font-size`       | `down1`                             | `font-size`         |
| `--manifold-tag-font-weight`     | `700`                               | `font-weight`       |
| `--manifold-tag-text-transform`  | `initial`                           | `text-transform`    |
| `--manifold-tag-radius`          | `3em` (round)                       | `border-radius`     |
| `--manifold-tag-padding`         | `0.25em 1em`                        | `padding`           |
|                                  |                                     |                     |
| `--manifold-tag-free-background` | `var(--manifold-color-secondary)`   | `background` (free) |
| `--manifold-tag-free-text-color` | `var(--manifold-text-color-accent)` | `color` (free)      |

### Unique Component Properties

#### Marketplace

| Name                                                                   | Default                                | Description                             |
| ---------------------------------------------------------------------- | -------------------------------------- | --------------------------------------- |
| `--manifold-categoryMenu-top`                                          | `0`                                    | Category menu top sticky position       |
| <span class="tag not-implemented" /> `--link-text-color`               | `var(--manifold-text-color-secondary)` | Category menu link text color           |
| <span class="tag not-implemented" /> `--link-font-weight`              | `inherit`                              | Category menu link font weight          |
| <span class="tag not-implemented" /> `--link-text-color-hover`         | `var(--manifold-text-color-primary)`   | Category menu link text color (hover)   |
| <span class="tag not-implemented" /> `--link-font-weight-hover`        | `var(--link-font-weight)`              | Category menu link font weight (hover)  |
| <span class="tag not-implemented" /> `--link-text-color-active`        | `var(--link-text-color-hover)`         | Category menu link text color (active)  |
| <span class="tag not-implemented" /> `--link-font-weight-active`       | `var(--link-font-weight-hover)`        | Category menu link font weight (active) |
|                                                                        |                                        |                                         |
| <span class="tag not-implemented" /> `--search-background`             | `var(--manifold-input-background)`     | Search field background                 |
| <span class="tag not-implemented" /> `--search-border`                 | `var(--manifold-input-border)`         | Search field border                     |
| <span class="tag not-implemented" /> `--search-radius`                 | `var(--manifold-input-radius)`         | Search field border radius              |
| <span class="tag not-implemented" /> `--search-shadow`                 | `var(--manifold-input-shadow)`         | Search field shadow                     |
| <span class="tag not-implemented" /> `--search-text-color`             | `var(--manifold-text-color)`           | Search field text color                 |
| <span class="tag not-implemented" /> `--search-placeholder-text-color` | `var(--manifold-text-color-secondary)` | Search field text color                 |
| <span class="tag not-implemented" /> `--search-background-focus`       | `var(--search-background)`             | Search field background (focus)         |
| <span class="tag not-implemented" /> `--search-border-focus`           | `var(--search-border)`                 | Search field border (focus)             |
| <span class="tag not-implemented" /> `--search-shadow-focus`           | `var(--search-shadow)`                 | Search field shadow (focus)             |
|                                                                        |                                        |                                         |
| <span class="tag not-implemented" /> `--heading-color`                 | `var(--manifold-text-color-secondary)` | Category heading text color             |
| <span class="tag not-implemented" /> `--heading-font-size`             | `--`                                   | Category heading font size              |
| <span class="tag not-implemented" /> `--heading-font-weight`           | `inherit`                              | Category heading font weight            |
|                                                                        |                                        |                                         |
| <span class="tag not-implemented" /> `--grid-gap`                      | `1rem`                                 | Gap between product/service cards       |

#### Plan Selector

| Name                                                                      | Default                            | Description                   |
| ------------------------------------------------------------------------- | ---------------------------------- | ----------------------------- |
| <span class="tag not-implemented" /> `--plan-menu-grid-gap`               | `1rem`                             | Gap between plan menu buttons |
|                                                                           |                                    |                               |
| <span class="tag not-implemented" /> `--plan-menu-card-background`        | `var(--manifold-card-background)`  | Background                    |
| <span class="tag not-implemented" /> `--plan-menu-card-border`            | `var(--manifold-card-border)`      | Border                        |
| <span class="tag not-implemented" /> `--plan-menu-card-radius`            | `var(--manifold-card-radius)`      | Corner radius                 |
| <span class="tag not-implemented" /> `--plan-menu-card-shadow`            | `var(--manifold-card-shadow)`      | Box shadow                    |
|                                                                           |                                    |                               |
| <span class="tag not-implemented" /> `--plan-menu-card-background-hover`  | `var(--plan-menu-card-background)` | Hover background              |
| <span class="tag not-implemented" /> `--plan-menu-card-border-hover`      | `var(--plan-menu-card-border)`     | Hover border                  |
| <span class="tag not-implemented" /> `--plan-menu-card-shadow-hover`      | `var(--plan-menu-card-shadow)`     | Box shadow                    |
|                                                                           |                                    |                               |
| <span class="tag not-implemented" /> `--plan-menu-card-background-active` | `var(--plan-menu-card-background)` | Active background             |
| <span class="tag not-implemented" /> `--plan-menu-card-border-active`     | `var(--plan-menu-border-active)`   | Active border                 |
| <span class="tag not-implemented" /> `--plan-menu-card-text-color-active` | `var(--plan-menu-text-color)`      | Active text color             |
|                                                                           |                                    |                               |
| <span class="tag not-implemented" /> `--plan-details-card-background`     | `var(--manifold-card-background)`  | Plan details panel background |
| <span class="tag not-implemented" /> `--plan-details-card-border`         | `var(--manifold-card-border)`      | Plan details panel border     |
| <span class="tag not-implemented" /> `--plan-details-card-radius`         | `var(--manifold-card-radius)`      | Plan details panel radius     |
| <span class="tag not-implemented" /> `--plan-details-card-shadow`         | `var(--manifold-card-shadow)`      | Plan details panel box shadow |

#### Product

| Name                                                                    | Default                                | Description                      |
| ----------------------------------------------------------------------- | -------------------------------------- | -------------------------------- |
| <span class="tag not-implemented" /> `--product-card-background`        | Branded Gradient                       | Background                       |
| <span class="tag not-implemented" /> `--product-card-border`            | `var(--manifold-border)`               | Border                           |
| <span class="tag not-implemented" /> `--product-card-radius`            | `var(--manifold-radius)`               | Corner radius                    |
| <span class="tag not-implemented" /> `--product-card-shadow`            | `none`                                 | Box shadow                       |
|                                                                         |                                        |                                  |
| <span class="tag not-implemented" /> `--sidebar-text-color-heading`     | `var(--manifold-text-color-heading)`   | Text color for sidebar headings. |
| <span class="tag not-implemented" /> `--sidebar-font-family-heading`    | `var(--manifold-font-family-heading)`  | Font family for sidebar headings |
| <span class="tag not-implemented" /> `--sidebar-font-weight-heading`    | `var(--manifold-font-weight-heading)`  | Weight for sidebar headings      |
| <span class="tag not-implemented" /> `--sidebar-font-size-heading`      | `var(--manifold-font-size-h4)`         | Font size for sidebar headings   |
|                                                                         |                                        |                                  |
| <span class="tag not-implemented" /> `--sidebar-text-color-links`       | `var(--manifold-text-color-secondary)` | Text color for sidebar links.    |
| <span class="tag not-implemented" /> `--sidebar-text-color-links-hover` | `var(--manifold-color-primary)`        | Text color for sidebar links.    |

[css-part]: https://meowni.ca/posts/part-theme-explainer/
[shadow-dom]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
[custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
