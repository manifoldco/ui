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
    uiVersion: '<@NPM_PACKAGE_VERSION@>',
  };

  analytics({
    name: 'ui_error',
    type: 'error',
    properties: {
      code: detail.code || '',
      message: detail.message || '',
      componentName: detail.componentName || (element && element.tagName) || '',
      uiVersion: extendedDetail.uiVersion,
    },
  });

  console.error(detail); // report error (Rollbar, Datadog, etc.)
  const evt = new CustomEvent('manifold-error', { bubbles: true, detail: extendedDetail });
  (element || document).dispatchEvent(evt);
}
