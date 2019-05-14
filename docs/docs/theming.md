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

However, for the purposes of theming, we need to be able to apply styles within the shadow DOM. Although selectors can't penetrate the shadow DOM, properties can still be inherited from ancestor elements. This includes [CSS Custom Properites](). The use of custom properties within Manifold UI components means that components will inherit theme values defined outside of their shadow DOM. This preserves style encapsulation and allows certain style properties within components to be customizable.

## Base Theme

Manifold UI comes with a base theme that provides various levels of abstraction. This allows for easy theming at a high level for all components with just a small set of valiables, while also exposing lower level variables for more precise theming of individual components.

We reccomend that you use this base theme as a starting point for building your own custom theme. To add the base theme to your project, use one of the following methods:

JavaScript Import

```js
import '@manifoldco/ui/dist/manifold.css';
```

CSS Import

```css
@import '@manifoldco/ui/dist/manifold.css';
```

## How to Customize

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

### Component Theming

Component theming allows fine-tuning of theme values on a component level. Each component has its own set of variables that inherit from the global theme. Overriding a component's theme variables can be done by defining variables on the component's element selector. 


Global theme variables are prefixed with `--manifold-*` to avoid potential name collisions, while internal component variables are not prefixed.

At this level, redefining global theme variables will change the theme values for for only this component type and will preserve the theme structure. If the theme stucture itself needs to be modified.

```css
manifold-marketplace {
  --card-background: #fff;
  --manifold-color-primary: #fb3e44;
  /* Other values go here */
}
```

## Global Colors

| Name                         | Default             | Description                             |
|------------------------------|---------------------|-----------------------------------------|
| `--manifold-background`      | `white`             | Default background color                |
| `--manifold-color-primary`   | `rgb(30, 80, 218)`  | Primary CTA color                       |
| `--manifold-color-secondary` | `rgb(15, 181, 208)` | Secondary CTA color                     |
| `--manifold-color-info`      | `rgb(30, 80, 218)`  | General info message color<sup>\*</sup> |
| `--manifold-color-success`   | `rgb(49, 186, 162)` | Success color<sup>\*</sup>              |
| `--manifold-color-warn`      | `rgb(254, 113, 75)` | Warning color<sup>\*</sup>              |
| `--manifold-color-error`     | `rgb(213, 15, 73)`  | Error color<sup>\*</sup>                |

_\* Examples: **Toast** and **Resource Status**_

## Typography

| Name                               | Default                             | Description                          |
|------------------------------------|-------------------------------------|--------------------------------------|
| `--manifold-font-family`           | (System)                            | Default text family                  |
| `--manifold-font-family-monospace` | `IBM Plex Sans Monospace,monospace` | Code font family (credentials, etc.) |
| `--manifold-text-color`            | `black`                             | Base text color                      |
| `--manifold-text-color-body`       | `black`                             | Body text color                      |
| `--manifold-text-color-accent`     | `white`                             | Accent text color                    |

[css-part]: https://meowni.ca/posts/part-theme-explainer/
[shadow-dom]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM

## Cards

Card components include the **Service Card** and the left-hand side of **Plan Selector**.

| Name                                | Default                        | Description       |
|-------------------------------------|--------------------------------|-------------------|
| `--manifold-card-background-hover`  | `transparent`                  | Hover background  |
| `--manifold-card-background-active` | `transparent`                  | Active background |
| `--manifold-card-border-active`     | `1px solid rgb(30, 80, 218)`   | Active border     |
| `--manifold-card-border-hover`      | `1px solid rgba(0, 0, 0, 0.1)` | Hover border      |
| `--manifold-card-color-active`      | `rgb(30, 80, 218)`             | Active text color |
