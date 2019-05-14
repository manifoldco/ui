---
title: Theming
path: /theming
---

# Theming

Manifold UI offers a simple, yet versitle, theming API for customizing the look and feel of components. 

Web components use [Shadow DOM][shadow-dom] for style encapsulation.
CSS selectors can't penetrate the shadow DOM, but more importantly styles
declared in the components won’t leak out. This has the benefit of not
conflicting with any of your existing styles. 

However, for the purposes of theming, we need to be able to apply styles within the shadow DOM. Although selectors can't penetrate the shadow DOM, properties can still be inherited from ancestor elements. This includes [CSS Custom Properites][custom-properties]. The use of custom properties within Manifold UI components means that components will inherit theme values defined outside of their shadow DOM. This preserves style encapsulation and allows certain style properties within components to be customizable.

## Concepts

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

```css
:root {
  --manifold-grayscale-base: 255, 255, 255;
  --manifold-grayscale-base-inverted: 0, 0, 0;
}
```


### Global Colors

| Name                         | Default             | Description                             |
|------------------------------|---------------------|-----------------------------------------|
| `--manifold-background`      | `white`             | Default background color                |
| `--manifold-color-primary`   | `rgb(30, 80, 218)`  | Primary brand color                     |
| `--manifold-color-secondary` | `rgb(15, 181, 208)` | Secondary brand color                   |
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

Some variables that are for a specific state `*-hover`, `*-focus`, `*-active` will only applied to cetain elements. `*-hover` styles will only be applied on interactive (clickable) elements, `*-focus` styles will only be applied to focusable elements.

[css-part]: https://meowni.ca/posts/part-theme-explainer/
[shadow-dom]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
[custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
