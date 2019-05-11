---
title: Theming
path: /theming
---

# Theming

These web components use [Shadow DOM][shadow-dom] for style encapsulation.
That means styles can cascade down, but more importantly it means styles
declared in the components won’t leak out. This has the benefit of not
conflicting with any of your existing styles.

However, there are times when it’s advantageous to overwrite some variables.
In that usecase, CSS variables are recommended.

We recommend setting variables on `body`, which will override
`@manifoldco/ui/dist/manifold.css` which are scoped to `:host`:

```css
body {
  --manifold-font-family: 'IBM Plex Sans', sans-serif;
  --manifold-color-primary: #fb3e44;
  /* Other values go here */
}
```

## Global Colors

| Name                         | Default             | Description                             |
| :--------------------------- | :------------------ | :-------------------------------------- |
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
| :--------------------------------- | :---------------------------------- | :----------------------------------- |
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
| :---------------------------------- | :----------------------------- | :---------------- |
| `--manifold-card-background-hover`  | `transparent`                  | Hover background  |
| `--manifold-card-background-active` | `transparent`                  | Active background |
| `--manifold-card-border-active`     | `1px solid rgb(30, 80, 218)`   | Active border     |
| `--manifold-card-border-hover`      | `1px solid rgba(0, 0, 0, 0.1)` | Hover border      |
| `--manifold-card-color-active`      | `rgb(30, 80, 218)`             | Active text color |
