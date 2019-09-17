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

interface RenderResult {
  $children$: [RenderResult];
  $tag$: string;
}

export function hasSkeletonElements(rendered: RenderResult): boolean {
  if (
    rendered.$tag$ &&
    rendered.$tag$.startsWith &&
    rendered.$tag$.startsWith('manifold-skeleton-')
  ) {
    return true;
  }
  if (rendered.$children$) {
    return rendered.$children$.map(c => hasSkeletonElements(c)).includes(true);
  }
  return false;
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
        const rendered = originalMethod.apply(this); // attempt to call render()
        if (
          this.performanceLoadMark &&
          !this.performanceRenderedMark &&
          target.constructor.name.startsWith('Manifold') &&
          !hasSkeletonElements(rendered)
        ) {
          this.performanceRenderedMark = performance.now();
          const evt = new CustomEvent('manifold-time-to-render', {
            bubbles: true,
            detail: {
              component: target.constructor.name,
              duration: this.performanceRenderedMark - this.performanceLoadMark,
            },
          });
          document.dispatchEvent(evt);
        }
        return rendered;
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
