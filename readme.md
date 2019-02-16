# @manifoldco/ui

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

```js
// Replace this… 🚫
import { defineCustomElements } from 'test-components/dist/loader';

// …with this ✅
import { defineCustomElements } from '@manifoldco/ui/dist/loader';
```

[stencil]: https://stenciljs.com/
[stencil-framework]: https://stenciljs.com/docs/overview
