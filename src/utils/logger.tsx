import { h } from '@stencil/core';
import { report } from './errorReport';
import connection from '../state/connection';

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
    rendered &&
    rendered.$tag$ &&
    rendered.$tag$.startsWith &&
    rendered.$tag$.startsWith('manifold-skeleton-')
  ) {
    return true;
  }
  if (rendered && rendered.$children$) {
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
          this.el &&
          this.el.tagName.startsWith('MANIFOLD-') &&
          this.performanceLoadMark &&
          !this.performanceRenderedMark &&
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
          if (this.el) {
            const el = this.el as HTMLElement;
            const startMarkName = `${el.tagName}-load-start`;
            const endMarkName = `${el.tagName}-load-end`;
            const startMarks = performance.getEntriesByName(startMarkName, 'mark');
            const endMarks = performance.getEntriesByName(endMarkName, 'mark');
            if (startMarks.length && !endMarks.length) {
              performance.mark(endMarkName);
              /* eslint-disable no-console */
              console.log(
                el.tagName,
                this.performanceRenderedMark - startMarks[0].startTime,
                evt.detail.duration
              );
              /* eslint-enable no-console */
            }
          }

          document.dispatchEvent(evt);
        }
        return rendered;
      } catch (e) {
        report(
          {
            code: e.name || e,
            componentName: target.constructor.name,
            message: e.message || e,
          },
          { env: connection.env }
        );
        return <manifold-toast alert-type="error">{e.message}</manifold-toast>; // show error to user
      }
    };

    return descriptor;
  };
}
