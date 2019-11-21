/* eslint-disable no-param-reassign */
import { mark } from '../packages/analytics';

export default function loadMark<T>() {
  return function loadMarkDecorator(
    _target: T,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

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
