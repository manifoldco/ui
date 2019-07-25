// import {propertyKey, EventEmitter, Event } from '@stencil/core';

export default function logger<T>() {
  // @Event({
  // eventName: 'errorEvent',
  // composed: true,
  // cancelable: true,
  // bubbles: true,
  // })

  return function loggerDecorator(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    console.log(target);

    descriptor.value = function render(...args: T[]) {
      try {
        const result = originalMethod.apply(this, args);
        return result;
      } catch (e) {
        this.errorEvent.emit({ error: e, target, propertyKey });
      }
    };

    return descriptor;
  };
}
