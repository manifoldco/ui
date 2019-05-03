[![version (scoped)](https://img.shields.io/npm/v/@manifoldco/ui.svg)](https://www.npmjs.com/package/@manifoldco/ui)
[![Stencil version](https://img.shields.io/badge/Stencil-v0.18.0-blueviolet.svg)](https://stenciljs.com)
[![codecov](https://img.shields.io/badge/codecov.io-1000%25-brightgreen.svg)](https://codecov.io/gh/manifoldco/ui)

# 🍱 Manifold UI

Manifold’s reusable web components, built with [Stencil][stencil].

## Installation

```bash
npm i @manifoldco/ui
```

### Usage

| Framework                 | Supported? |
| :------------------------ | :--------: |
| Vanilla JS (no framework) |     ✅     |
| Angular                   |     ✅     |
| React                     |     ✅     |
| Vue                       |     ✅     |
| Ember                     |     ✅     |

#### HTML (ES Modules)

```html
<manifold-marketplace />

<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/@manifoldco/ui/dist/esm/es2017/manifold.define.js';
  defineCustomElements(window);
</script>
```

#### HTML (No ESM Support)

```html
<manifold-marketplace />
<script src="https://unpkg.com/@manifoldco/ui/dist/manifold.js"></script>
```

#### React

```ts
import React from 'react';
import ReactDOM from 'react-dom';

import { defineCustomElements } from '@manifoldco/ui/dist/loader';

const App = () => <manifold-marketplace />;

ReactDOM.render(<App />, document.getElementById('root'));
defineCustomElements(window);
```

#### Ember, Angular, Vue, and others

Initializing Manifold UI works the exact same as any other Stencil project. For more
advanced instructions on integrating with your specific stack, please refer
to Stencil’s [docs on integration][stencil-framework].

### TypeScript + JSX setup

When using inside TypeScript, you’ll likely see this error (
`manifold-connection` could be any custom element):

```
Property 'manifold-connection' does not exist on type 'JSX.IntrinsicElements'
```

To solve that, add the following to `tsconfig.json`:

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

This will do more than fix the error—now you’ll be able to typecheck the web
components as you write! 🎉

[stencil]: https://stenciljs.com/
[stencil-framework]: https://stenciljs.com/docs/overview
[ts-include]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
