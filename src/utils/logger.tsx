import { h } from '@stencil/core';
import { report } from './errorReport';

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
        const detail: ErrorDetail = {
          component: target.constructor.name,
          error: e.message,
        };
        report(detail);
        return <manifold-toast alert-type="error">{e.message}</manifold-toast>; // show error to user
      }
    };

    return descriptor;
  };
}
