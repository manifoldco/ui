[![version (scoped)](https://img.shields.io/npm/v/@manifoldco/ui.svg)](https://www.npmjs.com/package/@manifoldco/ui)
[![Stencil version](https://img.shields.io/badge/Stencil-v0.18.0-blueviolet.svg)](https://stenciljs.com)
[![codecov](https://codecov.io/gh/manifoldco/ui/branch/master/graph/badge.svg?token=wDhQnzqKXR)](https://codecov.io/gh/manifoldco/ui)

# 🍱 Manifold UI

Manifold’s reusable web components, built with [Stencil][stencil]

## Installation

Distribution is via npm. To use, run the following in any terminal:

```bash
npm install @manifoldco/ui --save
```

### Usage in Frameworks

Currently, Manifold UI supports the following frameworks:

| Name                      | Supported? |
| :------------------------ | :--------- |
| Angular                   | ✅         |
| React                     | ✅         |
| Vue                       | ✅         |
| Ember                     | ✅         |
| Vanilla JS (no framework) | ✅         |

To integrate into your app, please refer to [Stencil’s documentation][stencil-framework].

The only change needed from their docs is replace `test-components` with
`@manifoldco/ui`, like so:

#### React

```ts
import React from 'react';
import ReactDOM from 'react-dom';

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

To solve that, add the `@manifoldco/ui` directory to `typeRoots` in `tsconfig.json`:

```json
"compilerOptions": {
  "typeRoots": ["./node_modules/@types", "./node_modules/@manifoldco"],
  "types": ["ui"]
}
```

Next, create a `custom-elements.d.ts` file somewhere inside your project
(must be inside the [include][ts-include] option in `tsconfig.json`):

```ts
declare module JSX {
  interface IntrinsicElements extends StencilIntrinsicElements {}
}
```

This will expose the types from Stencil to JSX, and you’ll be able to get
typechecking as you write 🎉.

[stencil]: https://stenciljs.com/
[stencil-framework]: https://stenciljs.com/docs/overview
[ts-include]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
