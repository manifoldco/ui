export function report<Detail>(detail: Detail) {
  console.error(detail); // report error (Rollbar, Datadog, etc.)
  const evt = new CustomEvent('manifold-error', { bubbles: true, detail });
  document.dispatchEvent(evt);
}
