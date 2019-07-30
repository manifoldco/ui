---
title: Errors
path: /advanced/errors
---

# Errors

## Automatic reporting

Any error our components have while rendering logs out to `console.error()`.
Many frontend APM tools such as [Datadog][datadog] and [Rollbar][rollbar]
will automatically pick up on this, and log accordingly. For many of these
tools, you should see error reporting automatically happen there with no
action on your part.

## Manual reporting

If you’d optionally like to handle errors yourself, reporting can be handled
safely via the `manifold-error` [custom event][custom-event]. This same
custom event fires for all components:

```js
document.addEventListener('manifold-error', e => {
  const { component, error } = e.detail;
  console.log(component); // ManifoldPlanSelector
  console.log(error); // 'Something went wrong'

  // Report error message somewhere, or show something to the user…
});
```

## User display

We’ll automatically display the same error message to the user via a
[toast][toast] if a component fails to render.

[custom-event]: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
[datadog]: https://www.datadoghq.com/
[rollbar]: https://rollbar.com/
[toast]: /components/toast
