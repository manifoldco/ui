import { h } from '@stencil/core';
import { report } from './errorReport';
import { connection } from '../global/app';
import analytics, { mark, measure } from '../packages/analytics';

interface StencilComponent {
  constructor: {
    name: string;
  };
}

export function loadMark<T>() {
  return function loadMarkDecorator(
    _target: T,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function componentWillLoad() {
      if (this.el) {
        mark(this.el, 'first_render');
        mark(this.el, 'first_render_with_data');
      }
      return originalMethod.apply(this); // call original method
    };

    return descriptor;
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
        const rendered = originalMethod.apply(this); // attempt to call render()
        if (this.el && this.el.tagName.startsWith('MANIFOLD-')) {
          const el = this.el as HTMLElement;

          const loadMeasure = measure(el, 'load');
          const firstRenderMeasure = measure(el, 'first_render');
          if (performance.getEntriesByName(`${el.tagName}-rtt_graphql-end`).length) {
            // This element has loaded data via graphql, we can report first_render_with_data
            const rttGraphqlMeasure = measure(el, 'rtt_graphql');
            const firstRenderWithDataMeasure = measure(el, 'first_render_with_data');
            if (
              firstRenderWithDataMeasure &&
              firstRenderWithDataMeasure.firstReport &&
              rttGraphqlMeasure &&
              loadMeasure
            ) {
              analytics(
                {
                  name: 'first_render_with_data',
                  type: 'metric',
                  properties: {
                    componentName: el.tagName,
                    uiVersion: '<@NPM_PACKAGE_VERSION@>',
                    duration: firstRenderWithDataMeasure.duration,
                    rttGraphql: rttGraphqlMeasure.duration,
                    load: loadMeasure.duration,
                  },
                },
                { env: connection.env }
              );
            }
          }

          if (loadMeasure && loadMeasure.firstReport) {
            analytics(
              {
                name: 'load',
                type: 'metric',
                properties: {
                  componentName: el.tagName,
                  uiVersion: '<@NPM_PACKAGE_VERSION@>',
                  duration: loadMeasure.duration,
                },
              },
              { env: connection.env }
            );
          }

          if (firstRenderMeasure && firstRenderMeasure.firstReport) {
            analytics(
              {
                name: 'first_render',
                type: 'metric',
                properties: {
                  componentName: el.tagName,
                  uiVersion: '<@NPM_PACKAGE_VERSION@>',
                  duration: firstRenderMeasure.duration,
                },
              },
              { env: connection.env }
            );
          }
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
