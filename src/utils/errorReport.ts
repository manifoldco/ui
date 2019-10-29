export function report<Detail>(detail: Detail, element?: HTMLElement) {
  const d = element
    ? {
        ...detail,
        componentName: element.tagName,
        npmVersion: '<@NPM_PACKAGE_VERSION@>',
      }
    : detail;
  console.error(d); // report error (Rollbar, Datadog, etc.)
  const evt = new CustomEvent('manifold-error', { bubbles: true, detail: d });
  (element || document).dispatchEvent(evt);
}
