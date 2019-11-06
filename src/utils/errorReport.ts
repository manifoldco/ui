import analytics from '../packages/analytics';

interface ErrorDetail {
  code?: string;
  componentName?: string;
  message?: string;
}

export function report(detail: ErrorDetail, element?: HTMLElement) {
  const extendedDetail = {
    ...detail,
    ...(element ? { componentName: element.tagName } : {}),
    ...(detail.componentName ? { componentName: detail.componentName } : {}),
    npmVersion: '<@NPM_PACKAGE_VERSION@>',
  };

  analytics({
    name: 'Error',
    type: 'error',
    properties: {
      code: detail.code || '',
      message: detail.message || '',
      componentName: detail.componentName || (element && element.tagName) || '',
      uiVersion: extendedDetail.npmVersion,
    },
  });

  console.error(detail); // report error (Rollbar, Datadog, etc.)
  const evt = new CustomEvent('manifold-error', { bubbles: true, detail: extendedDetail });
  (element || document).dispatchEvent(evt);
}
