---
title: 'Performance'
path: '/components/performance'
---

# Performance

Our components by default contain **no performance monitoring**. We do this so that consumers
control the amount of data sent to Manifold, and start at the bare-minimum (our core APIs).

But in order to receive the best updates to Manifold UI, we’d strongly encouraging sharing
performance metrics with us. Adding the `<manifold-performance>` component anywhere in your app is
all that’s required to do so.

```html
<manifold-connection>
  <manifold-performance>
    <manifold-product product-label="logdna"></manifold-product>
  </manifold-performance>
</manifold-connection>
```

We recommend you place this **just beneath `<manifold-connection>`** in your DOM tree. It only needs
to be placed once.

## Data Collection

Manifold doesn’t collect **any identifying user data** with this component. It is for anonymous
performance profiling, and can’t be associated with any account, nor will it collect any other
sensitive information on-page.

Manifold uses the [Datadog APM][datadog] client to monitor and collect performance.

[datadog]: https://www.datadoghq.com/apm/
