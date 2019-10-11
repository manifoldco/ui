---
path: /getting-started
title: Getting Started
---

# Getting Started

Manifold’s [Web Component][web-components] UI library, powered by [Stencil][stencil].

## Installation

```bash
npm i @manifoldco/ui
```

## Usage

Manifold UI can be used in any frameworkless project (“vanilla” JS), or any modern framework like
React, Vue, or Angular.

| Framework                 | Supported? |
| :------------------------ | :--------: |
| Vanilla JS (no framework) |     ✅     |
| Angular                   |     ✅     |
| React                     |     ✅     |
| Vue                       |     ✅     |
| Ember                     |     ✅     |

In any setup, you can use our CDN for UI:

```html
<!-- latest (beware of breaking changes!) -->
<script src="https://js.cdn.manifold.co/@manifoldco/ui/dist/manifold.js"></script>
<!-- specific version -->
<script src="https://js.cdn.manifold.co/@manifoldco/ui@0.6.0/dist/manifold.js"></script>
```

### HTML (ES Modules)

```html
<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://js.cdn.manifold.co/@manifoldco/ui/dist/manifold/manifold.css"
  />
</head>
<body>
  <manifold-connection>
    <manifold-marketplace />
  </manifold-connection>
  <script type="module">
    import { defineCustomElements } from 'https://js.cdn.manifold.co/@manifoldco/ui/dist/esm/es2017/manifold.define.js';
    defineCustomElements(window);
  </script>
</body>
```

### HTML (No ESM Support)

```html
<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://js.cdn.manifold.co/@manifoldco/ui/dist/manifold/manifold.css"
  />
</head>
<body>
  <manifold-connection>
    <manifold-marketplace />
  </manifold-connection>
  <script src="https://js.cdn.manifold.co/@manifoldco/ui/dist/manifold.js"></script>
</body>
```

### React

You may choose to load Manifold UI asynchrously with a dynamic import, or synchronously with a
regular import.

**Asynchronous:**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@manifoldco/ui/dist/manifold/manifold.css';
import(/* webpackChunkName: "manifold-ui" */ '@manifoldco/ui/dist/loader').then(
  ({ defineCustomElements }) => defineCustomElements(window)
);

const App = () => (
  <manifold-connection>
    <manifold-marketplace />
  </manifold-connection>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

**Synchronous:**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@manifoldco/ui/dist/manifold/manifold.css';
import { defineCustomElements } from '@manifoldco/ui/dist/loader';

defineCustomElements(window);

const App = () => (
  <manifold-connection>
    <manifold-marketplace />
  </manifold-connection>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### TypeScript + JSX setup

When using UI with TypeScript, you’ll likely see an error like this:

```
Property 'manifold-connection' does not exist on type 'JSX.IntrinsicElements'
```

To solve that, create a `custom-elements.d.ts` file somewhere inside your project (must be inside
the [include][tsconfig] option in `tsconfig.json`):

```ts
import { Components } from '@manifoldco/ui';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type ToReact<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

declare global {
  export namespace JSX {
    interface IntrinsicElements {
      'manifold-marketplace': Components.ManifoldMarketplace &
        ToReact<HTMLManifoldMarketplaceElement>;
      'manifold-product': Components.ManifoldProduct & ToReact<HTMLManifoldProductElement>;
      'manifold-plan-selector': Components.ManifoldPlanSelector &
        ToReact<HTMLManifoldPlanSelectorElement>;
    }
  }
}
```

This will expose the types from Stencil to JSX, and you’ll be able to get typechecking as you write.

_Note: Every element will have to be declared manually, at least until [this PR][ts-fix] is merged
in TypeScript core._

### Ember, Angular, Vue, and others

Initializing Manifold UI works the same as any other Stencil project. For more advanced instructions
on integrating with your specific stack, please refer to Stencil’s [docs on
integration][stencil-framework].

[stencil]: https://stenciljs.com/
[stencil-framework]: https://stenciljs.com/docs/overview/
[tsconfig]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.htm
[ts-fix]: https://github.com/Microsoft/TypeScript/pull/26797
[web-components]: https://www.webcomponents.org/introduction
