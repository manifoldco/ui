---
title: Theming
path: /theming
---

# Theming

Manifold UI offers a simple, yet versitle, theming API for customizing the look and feel of components. 


## Concepts

### CSS Custom Properties

For the purposes of theming, we need to be able to apply styles within the shadow DOM. Although selectors can't penetrate the shadow DOM, properties can still be inherited from ancestor elements. This includes [CSS Custom Properites][custom-properties]. The use of custom properties within Manifold UI components means that components will inherit theme values defined outside of their shadow DOM. This preserves style encapsulation and allows certain style properties within components to be customizable.

### Base Theme

Manifold UI comes with a base theme that provides various levels of abstraction. This allows for easy theming at a high level for all components with just a small set of valiables, while also exposing lower level variables for more precise theming of individual components.

We reccomend that you use this base theme as a starting point for building your own custom theme. To add the base theme to your project:

```js
import '@manifoldco/ui/dist/manifold.css';
```

### Global Theming

Global theming is the easiest way to set theme values that will be propagrated throughout the Manifold UI components.

We recommend setting variables on `:root`, which will override variables from the base theme:

```css
/* Import the base theme somewhere before this. */

:root {
  --manifold-font-family: 'IBM Plex Sans', sans-serif;
  --manifold-color-primary: #fb3e44;
  /* Other values go here */
}
```

Some variables will work regardless of which element they are set on. However, to ensure that overrides propagate through the base theme as intended, it's important to define them on the `:root` element.

These variables should also be set after the base theme import, because overriding these variables replies on [precedence](https://css-tricks.com/precedence-css-order-css-matters/).

### Component Theming [Coming Soon]

Component theming allows fine-tuning of theme values on a component level. Each component has its own set of variables that inherit from the global theme. Overriding a component's theme variables can be done by defining variables on the component's element selector. 

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
|--------------------------------------|-----------------|----------------------------------------------------|
| `--manifold-grayscale-base`          | `0, 0, 0`       | The darkest color on your grayscale in RGB values  |
| `--manifold-grayscale-base-inverted` | `255, 255, 255` | The lightest color on your grayscale in RGB values |

These grayscale bases provide the foundation for your theme. These two values, define a grayscale range. Intermediate values are then derived by varying the opacity of each base and used throughout Manifold UI components.

By default, `--manifold-grayscale-[opacity]` values range from solid black down to transparent, and `--manifold-grayscale-[opacity]i` (notice the `i` for _inverted_) values range from solid white down to transparent. The main advantage to using these two contrasting grascales, is that a dark theme can be created simply by swapping these base values:

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

| Level       | Name              | Description                                                          |
|-------------|-------------------|----------------------------------------------------------------------|
| 1 (highest) | Base              | The base theme provided by Manifold UI                               |
| 2           | Top-level         | Your custom theme and branding                                       |
| 3           | Common Components | Reusable UI elements like cards, buttons, and tags                   |
| 4 (lowest)  | Unique Components | Specific use components like Marketplace, Plan Selector, and Product |

Each level recieves it's default value from the level above. Redefining a lower level value will override the value from the higher level. For example, the button in the Plan selector:

```css
:root {
  /* Base: the default primary color is applied and the button is blue (along with other elements that use the primary color). */
  --manifold-color-primary: blue; /* imported from Manifold UI */

  /* Top-level: overrides primary color from the Base and turns the button red (along with other elements that use the primary color). */
  --manifold-color-primary: red;

  /* Common Component: overrides the primary color from the Top-Level and turns the button green (along with all other buttons). */
  --manifold-button-background: green;

  /* Unique Component: overrides the button background from the Common Component and turns the button orange (no other elements are affected) */
  --manifold-plan-selector-cta-background: orange;
}
```

<!-- 
### Global Colors

| Name                         | Default             | Description                             |
|------------------------------|---------------------|-----------------------------------------|
| `--manifold-background`      | `white`             | Default background color                |
| `--manifold-color-primary`   | `rgb(30, 80, 218)`  | Primary color                           |
| `--manifold-color-secondary` | `rgb(15, 181, 208)` | Secondary color                         |
| `--manifold-color-info`      | `rgb(30, 80, 218)`  | General info message color<sup>\*</sup> |
| `--manifold-color-success`   | `rgb(49, 186, 162)` | Success color<sup>\*</sup>              |
| `--manifold-color-warn`      | `rgb(254, 113, 75)` | Warning color<sup>\*</sup>              |
| `--manifold-color-error`     | `rgb(213, 15, 73)`  | Error color<sup>\*</sup>                |

_\* Examples: **Toast** and **Resource Status**_


### Typography

| Name                               | Default                             | Description                          |
|------------------------------------|-------------------------------------|--------------------------------------|
| `--manifold-font-family`           | (System)                            | Default text family                  |
| `--manifold-font-family-monospace` | `IBM Plex Sans Monospace,monospace` | Code font family (credentials, etc.) |
| `--manifold-text-color`            | `black`                             | Base text color                      |
| `--manifold-text-color-body`       | `black`                             | Body text color                      |
| `--manifold-text-color-accent`     | `white`                             | Accent text color                    |

### Common Styles

| Name                      | Default                                   | Description                                         |
|---------------------------|-------------------------------------------|-----------------------------------------------------|
| `--manifold-radius`       | `4px`                                     | Default radius for buttons, tags, cards, textfields |
| `--manifold-border`       | `1px solid var(--manifold-grayscale-10)`  | Default border for cards, text fields               |
| `--manifold-border-focus` | `1px solid var(--manifold-color-primary)` | Default border for text fields on focus             |



### Cards

Card components include the **Service Card** and the left-hand side of **Plan Selector**.

| Name                                | Default                        | Description       |
|-------------------------------------|--------------------------------|-------------------|
| `--manifold-card-background-hover`  | `transparent`                  | Hover background  |
| `--manifold-card-background-active` | `transparent`                  | Active background |
| `--manifold-card-border-active`     | `1px solid rgb(30, 80, 218)`   | Active border     |
| `--manifold-card-border-hover`      | `1px solid rgba(0, 0, 0, 0.1)` | Hover border      |
| `--manifold-card-color-active`      | `rgb(30, 80, 218)`             | Active text color |

Some variables that are for a specific state `*-hover`, `*-focus`, `*-active` will only applied to cetain elements. `*-hover` styles will only be applied on interactive (clickable) elements, `*-focus` styles will only be applied to focusable elements. -->

## API Reference

### Top Level Properties

| Name                               | Default                                   | Description                                         |
|------------------------------------|-------------------------------------------|-----------------------------------------------------|
| `--manifold-background`            | `white`                                   | Default background color                            |
| `--manifold-color-primary`         | `rgb(30, 80, 218)`                        | Primary color                                       |
| `--manifold-color-secondary`       | `rgb(15, 181, 208)`                       | Secondary color                                     |
| `--manifold-color-info`            | `rgb(30, 80, 218)`                        | General info message color<sup>\*</sup>             |
| `--manifold-color-success`         | `rgb(49, 186, 162)`                       | Success color<sup>\*</sup>                          |
| `--manifold-color-warn`            | `rgb(254, 113, 75)`                       | Warning color<sup>\*</sup>                          |
| `--manifold-color-error`           | `rgb(213, 15, 73)`                        | Error color<sup>\*</sup>                            |
| `--manifold-font-family`           | (System)                                  | Default text family                                 |
| `--manifold-font-family-monospace` | `IBM Plex Sans Monospace,monospace`       | Code font family (credentials, etc.)                |
| `--manifold-text-color`            | `black`                                   | Base text color                                     |
| `--manifold-text-color-body`       | `black`                                   | Body text color                                     |
| `--manifold-text-color-accent`     | `white`                                   | Accent text color                                   |
| `--manifold-radius`                | `4px`                                     | Default radius for buttons, tags, cards, textfields |
| `--manifold-border`                | `1px solid var(--manifold-grayscale-10)`  | Default border for cards, text fields               |
| `--manifold-border-focus`          | `1px solid var(--manifold-color-primary)` | Default border for text fields on focus             |

### Common Component Properties

#### Cards

| Name                                | Default                        | Description       |
|-------------------------------------|--------------------------------|-------------------|
| `--manifold-card-background-hover`  | `transparent`                  | Hover background  |
| `--manifold-card-background-active` | `transparent`                  | Active background |
| `--manifold-card-border-active`     | `1px solid rgb(30, 80, 218)`   | Active border     |
| `--manifold-card-border-hover`      | `1px solid rgba(0, 0, 0, 0.1)` | Hover border      |
| `--manifold-card-color-active`      | `rgb(30, 80, 218)`             | Active text color |

#### Buttons

TODO

#### Tags

TODO

### Unique Component Properties

#### Marketplace

TODO

#### Plan Selector

TODO

#### Product

TODO

[css-part]: https://meowni.ca/posts/part-theme-explainer/
[shadow-dom]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
[custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
