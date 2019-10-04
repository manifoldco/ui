---
title: Using with React
path: /advanced/using-with-react
---

# Using with React

Since Manifold UI components are standard web components, React is fully-supported. However, if
you’re new to web components, there can be some gotchas. Here are the tough parts we’ve found while
implementing UI in a React environment, and the rules to absorb.

## Rule 1: Events must be handled with listeners

Handling web component events in React is arguably the hardest part. In React, you may be used to
handy `onClick={() => }` props for easy callbacks. Unfortunately that’s not yet possible with web
components. Listeners are required. In the React projects we’ve worked in, we’ve found [React
Hooks][hooks] (specifically `useState` and `useRef`) helpful for managing event listeners on web
components.

### Example

Say you’re integrating the [Plan Selector][plan-selector] component in React, and you want to be
notified when the plan changes in order to pass the selected plan to the [provision-button]. This is
what that would look like:

```jsx
import React, { useState, useEffect, useRef } from 'react';

// product: product label, e.g. "logdna"
const PlanSelection = ({ product }) => {
  // refs
  const planSelectorRef = useRef(null);

  // state
  const [planLabel, setPlanLabel] = useState();
  const [regionId, setRegionId] = useState();

  // on load, and at every user selection, update our state
  function update({ detail }) {
    setPlanLabel(detail.planLabel);
    setRegionId(detail.regionId);
  }

  // bind events on first render
  useEffect(() => {
    if (planSelectorRef.current) {
      planSelectorRef.current.addEventListener('manifold-planSelector-load', update);
      planSelectorRef.current.addEventListener('manifold-planSelector-change', update);
    }
  }, []);

  return (
    <div>
      <manifold-plan-selector product={product} ref={planSelectorRef} />
      <manifold-data-provision-button
        planLabel={planLabel}
        productLabel={product}
        regionId={regionId}
      >
        Create
      </manifold-data-provision-button>
    </div>
  );
};
```

To break down what’s happening here:

1. The `useEffect()` will fire once, and only once, because we’re memoizing nothing (`[]`).
1. Within the effect, we’re binding the `manifold-planSelector-load` and
   `manifold-planSelector-change` events to an `update()` function (we know what they are because we
   looked at the [Plan Selector doc][plan-selector]).
1. Whenever `update()` fires, we’re telling React to re-render with the new props for
   `<manifold-data-provision-button>`.

Lastly, the `if (planSelectorRef.current)(` check may be a little confusing. It’s here because if
using TypeScript you’ll find you’ll need to handle the case `ref.current` isn’t a DOM element. But
as long as `<manifold-plan-selector>` is present on the page (i.e. isn’t conditionally rendered or
not), we should have no problems here.

### How do I find what events are possible?

Most Manifold UI components emit several events. To see what each component emits, please reference
the **Events** section of that component’s documentation.

## Rule 2: Every prop is a string

Another reason consuming web component events can be difficult within React is because **web
components can only accept strings as props** because they’re just regular HTML element:

```jsx
const MyComponent = () => {
  const myNumber = 42;
  const myObj = { foo: 'bar' };
  return <manifold-example-component my-number={myNumber} my-array={myArray} />;
};
```

```html
<manifold-example-component my-number="42" my-array="[object Object]"></manifold-example-component>
```

As you can see, the number will be coerced into a string, but this poses a problem for objects and
arrays. Fortunately, we can get around that by setting any property directly on the element node
like so:

```jsx
const MyComponent = () => {
  const provisionButtonRef = useRef(null);

  // set features on every render
  if (provisionButtonRef.current) {
    provisionButtonRef.current.features = {
      optionA: 'foo',
      optionB: 'bar',
    };
  }

  return (
    <manifold-data-provision-button ref={provisionButtonRef}>Create</manifold-data-provision-button>
  );
};
```

Fortunately, the **number of times we require you set a non-string prop on a UI component is rare**,
but resource features is, sadly, one such time. We’re working on making this less painful in future
versions!

## Extra Info: React + TypeScript

When using UI with TypeScript, you’ll likely see an error like this:

```
Property 'manifold-connection' does not exist on type 'JSX.IntrinsicElements'
```

To solve that, create a `custom-elements.d.ts` file somewhere inside your project (must be inside
the [include][tsconfig] option in `tsconfig.json`):

```ts
import { Components } from '@manifoldco/ui';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type ToReact<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

declare global {
  export namespace JSX {
    interface IntrinsicElements {
      'manifold-marketplace': Components.ManifoldMarketplace &
        ToReact<HTMLManifoldMarketplaceElement>;
      'manifold-product': Components.ManifoldProduct & ToReact<HTMLManifoldProductElement>;
      'manifold-plan-selector': Components.ManifoldPlanSelector &
        ToReact<HTMLManifoldPlanSelectorElement>;
    }
  }
}
```

This will expose the types from Stencil to JSX, and you’ll be able to get typechecking as you write.

_Note: Every element will have to be declared manually, at least until [this PR][ts-fix] is merged
in TypeScript core._

[hooks]: https://reactjs.org/docs/hooks-intro.html
[plan-selector]: /components/plan-selector
[provision-button]: /data/provision-button
[ts-fix]: https://github.com/Microsoft/TypeScript/pull/26797
