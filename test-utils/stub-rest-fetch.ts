import { createRestFetch, CreateRestFetch } from '../src/utils/restFetch';

export function stub<T>(ctor: { new (): T }, options: CreateRestFetch) {
  const oldCallback = ctor.prototype.componentWillLoad;
  ctor.prototype.componentWillLoad = function() {
    this.restFetch = createRestFetch(options);
    oldCallback.call(this);
  };
}
