---
title: Performance
path: /advanced/performance
---

# Performance

## Code splitting

Arguably the biggest difference you can make speeding up your user experience
is by using [dynamic imports][import] in your code. This splits out the web
component loader into a lazy-loading chunk that doesn’t block your main
bundle.

```js
// Before
import { defineCustomElements } from '@manifoldco/ui/dist/loader';
defineCustomElements(window);

// After
import(/* webpackChunkName: manifold-ui */ '@manifoldco/ui/dist/loader').then(
  ({ defineCustomElements }) => defineCustomElements(window)
);
```

> 💁 **Tip:** `webpackChunkName` is useful in webpack setups to ensure if you use
> this code more than once, it’ll re-use the same chunk each time rather than
> create multiple copies.

Though this may _technically_ delay the web components’ loading (because it’s
fetching an async request to get the loader, rather than being bundled
already by the time this is executed), overall this is generally a win for
users, and lets you deliver a [first meaningful paint][fmp] sooner.

Lazy-loading _everything_ indiscriminately across your application would slow
down the user experience, but when used strategically like this it can have
big payoffs.

[fmp]: https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint
[import]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[stencil-browsers]: https://stenciljs.com/docs/browser-support

## Other Gotchas

Though there’s nothing actionable in this section, it’s nice to have a
general understanding of how Stencil is bundled as it affects your
application.

### Efficient element loading

Stencil splits up custom elements into their own chunks. For our UI bundle,
if you only use `<manifold-product>` and `<manifold-plan-selector>` on a
page, your users will download the JS to render those two, and only those
two. That means **as Manifold UI scales and adds components, it comes at
almost no cost to your users.**

To see this in action, open your **Network** tab in Chrome, and filter to
**JS**. You should see things like `15.js` and `53.js`, each weighing only a
few KB.

### Polyfill bloat

Stencil’s web components work for more browsers than even have web component
support [via a polyfill][stencil-browsers]. It’s great to have built-in
support, but sometimes webpack can accidentally bundle the polyfill when it
doesn’t need to. We’ve found the best fix to be **code splitting** (above).
