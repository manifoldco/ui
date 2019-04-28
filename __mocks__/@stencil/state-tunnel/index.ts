// -> https://github.com/ionic-team/stencil-state-tunnel/blob/master/packages/state-tunnel/src/utils/state-tunnel.tsx

import { FunctionalComponent } from '@stencil/core';

type PropList<T> = Extract<keyof T, string>[] | string;
type SubscribeCallback<T> = (el: HTMLStencilElement, props: PropList<T>) => () => void;
type ConsumerRenderer<T> = (subscribe: SubscribeCallback<T>, renderer: Function) => any;

export const createProviderConsumer = <T extends { [key: string]: any }>(
  defaultState: T,
  consumerRender: ConsumerRenderer<T>
) => {
  let listeners: Map<HTMLStencilElement, PropList<T>> = new Map();
  let currentState: T = defaultState;

  const updateListener = (fields: PropList<T>, listener: HTMLStencilElement) => {
    if (!listener) return;

    if (Array.isArray(fields)) {
      [...fields].forEach(fieldName => {
        (listener as any)[fieldName] = currentState[fieldName];
      });
    } else {
      (listener as any)[fields] = {
        ...(currentState as object),
      } as T;
    }
    listener.forceUpdate();
  };

  const subscribe: SubscribeCallback<T> = (el: HTMLStencilElement, propList: PropList<T>) => {
    if (listeners.has(el)) {
      return () => {};
    }
    listeners.set(el, propList);
    updateListener(propList, el);

    return () => {
      listeners.delete(el);
    };
  };

  const Provider: FunctionalComponent<{ state: T }> = ({ state }, children) => {
    currentState = state;
    listeners.forEach(updateListener);
    return children;
  };

  const Consumer: FunctionalComponent<{}> = (props, children) => {
    // The casting on subscribe is to allow for crossover through the stencil compiler
    // In the future we should allow for generics in components.
    return consumerRender(subscribe, children[0] as any);
  };

  const injectProps = (childComponent: any, fieldList: PropList<T>) => {
    let unsubscribe: any = null;

    const elementRefName = Object.keys(childComponent.properties).find(propName => {
      return childComponent.properties[propName].elementRef == true;
    });
    if (elementRefName == undefined) {
      throw new Error(
        `Please ensure that your Component ${
          childComponent.is
        } has an attribute with an "@Element" decorator. ` +
          `This is required to be able to inject properties.`
      );
    }

    const prevComponentWillLoad = childComponent.prototype.componentWillLoad;
    childComponent.prototype.componentWillLoad = function() {
      unsubscribe = subscribe(this[elementRefName], fieldList);
      if (prevComponentWillLoad) {
        return prevComponentWillLoad.bind(this)();
      }
    };

    const prevComponentDidUnload = childComponent.prototype.componentDidUnload;
    childComponent.prototype.componentDidUnload = function() {
      unsubscribe();
      if (prevComponentDidUnload) {
        return prevComponentDidUnload.bind(this)();
      }
    };
  };

  return {
    Provider,
    Consumer,
    injectProps,
  };
};
