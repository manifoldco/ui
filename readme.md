[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)
[![version (scoped)](https://img.shields.io/npm/v/@manifoldco/ui.svg)](https://www.npmjs.com/package/@manifoldco/ui)
[![codecov](https://codecov.io/gh/manifoldco/ui/branch/master/graph/badge.svg?token=wDhQnzqKXR)](https://codecov.io/gh/manifoldco/ui)

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
