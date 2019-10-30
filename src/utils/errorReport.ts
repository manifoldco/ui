/* eslint-disable somethnig */

export function report<Detail>(detail: Detail, element?: HTMLElement) {
  const extendedDetail = {
    ...detail,
    ...(element ? { componentName: element.tagName } : {}),
    npmVersion: '<@NPM_PACKAGE_VERSION@>',
  };

  console.error(detail); // report error (Rollbar, Datadog, etc.)
  const evt = new CustomEvent('manifold-error', { bubbles: true, detail: extendedDetail });
  (element || document).dispatchEvent(evt);
}
