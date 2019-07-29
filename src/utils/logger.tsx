import { h } from '@stencil/core';

interface ErrorDetail {
  error: string;
}

/* eslint-disable no-param-reassign */

export default function logger<T>() {
  return function loggerDecorator(
    _target: T,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function render(...args: T[]) {
      try {
        const result = originalMethod.apply(this, args); // call render()
        return result;
      } catch (e) {
        console.error(e); // report error (Rollbar, Datadog, etc.)
        const detail: ErrorDetail = { error: e.message };
        const evt = new CustomEvent('manifold-error', { bubbles: true, detail }); // custom event
        document.dispatchEvent(evt);
        return <manifold-toast alert-type="error">{e.message}</manifold-toast>;
      }
    };

    return descriptor;
  };
}
