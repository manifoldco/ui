import { h } from '@stencil/core';

interface ErrorDetail {
  component?: string;
  error: string;
}

interface StencilComponent {
  constructor: {
    name: string;
  };
}

/* eslint-disable no-param-reassign */

export default function logger<T>() {
  return function loggerDecorator(
    target: T & StencilComponent,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function render() {
      try {
        return originalMethod.apply(this); // attempt to call render()
      } catch (e) {
        console.error(e); // report error (Rollbar, Datadog, etc.)
        const detail: ErrorDetail = {
          component: target.constructor.name,
          error: e.message,
        };
        const evt = new CustomEvent('manifold-error', { bubbles: true, detail });
        document.dispatchEvent(evt); // dispatch custom event
        return <manifold-toast alert-type="error">{e.message}</manifold-toast>; // show error to user
      }
    };

    return descriptor;
  };
}
