/* eslint-disable no-param-reassign */

export default function loadMark<T>() {
  return function loadMarkDecorator(
    _target: T,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function componentWillLoad() {
      this.performanceLoadMark = performance.now();
      return originalMethod.apply(this); // call original method
    };

    return descriptor;
  };
}
