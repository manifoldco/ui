---
path: /getting-started
title: Getting Started
---

# Getting Started

Manifold’s [web component][web-components] UI library, powered by
[Stencil][stencil].

## Installation

```bash
npm i @manifoldco/ui
```

## Usage

Manifold UI can be used in any frameworkless project (“vanilla” JS), or any
modern framework like React, Vue, or Angular.

### HTML (ES Modules)

```html
<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/@manifoldco/ui/dist/manifold.css"
  />
</head>
<body>
  <manifold-marketplace></manifold-marketplace>
  <script type="module">
    import { defineCustomElements } from 'https://unpkg.com/@manifoldco/ui/dist/esm/es2017/manifold.define.js';
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
    href="https://unpkg.com/@manifoldco/ui/dist/manifold.css"
  />
</head>
<body>
  <manifold-marketplace></manifold-marketplace>
  <script src="https://unpkg.com/@manifoldco/ui/dist/manifold.js"></script>
</body>
```

### React

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@manifoldco/ui/dist/manifold.css';
import { defineCustomElements } from '@manifoldco/ui/dist/loader';

const App = () => <manifold-marketplace />;

ReactDOM.render(<App />, document.getElementById('root'));
defineCustomElements(window);
```

### TypeScript + JSX setup

When using inside TypeScript, you’ll likely see this error (
`manifold-connection` could be any custom element):

```
Property 'manifold-connection' does not exist on type 'JSX.IntrinsicElements'
```

To solve that, add the `@manifoldco/ui` directory to `typeRoots` in
`tsconfig.json`:

```json
"compilerOptions": {
  "typeRoots": ["./node_modules/@types", "./node_modules/@manifoldco"],
  "types": ["ui"]
}
```

Next, create a `custom-elements.d.ts` file somewhere inside your project
(must be inside the [include][tsconfig] option in `tsconfig.json`):

```ts
declare module JSX {
  export interface IntrinsicElements {
    'manifold-connection': StencilIntrinsicElements['manifold-connection'] & {
      children?: ReactElement;
    };
    'manifold-product': StencilIntrinsicElements['manifold-product'] & {
      children?: ReactElement;
    };
    'manifold-plan-selector': StencilIntrinsicElements['manifold-plan-selector'] & {
      children?: ReactElement;
    };
  }
}
```

This will expose the types from Stencil to JSX, and you’ll be able to get
typechecking as you write.

_Note: every element will have to be declared manually, at least until [this
PR][ts-fix] is merged in TypeScript core._

### Ember, Angular, Vue, and others

Initializing Manifold UI works the exact same as any other Stencil project.
For more advanced instructions on integrating with your specific stack,
please refer to Stencil’s [docs on integration][stencil-framework].

[stencil]: https://stenciljs.com/
[stencil-framework]: https://stenciljs.com/docs/overview/
[tsconfig]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.htm
[ts-fix]: https://github.com/Microsoft/TypeScript/pull/26797
[web-components]: https://www.webcomponents.org/introduction
