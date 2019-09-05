---
title: Resource Details View
path: /advanced/custom-loaders
---

# Custom loaders

By default, our components that fetch data from our API will display [skeleton screens][skeletons]
that indicate what the UI will look like when the data is retrieved. In some cases, you may wish to
use your own loading indicators in order to keep your UI design more consistent. What follows is a
guide for replacing our loaders with your own.

## Hide until ready

Components that expose the `hide-until-ready` attribute will support this behavior. If this
attribute is set, our components won't display anything until they have finished retrieving data and
have fully rendered their contents. Example:

```html
<manifold-plan-selector product-label="jawsdb-mysql" hide-until-ready></manifold-plan-selector>
```

This is only half of the custom loader story. In order to display your loaders while the component
is still fetching, you can leverage `componentOnReady` as described below.

## Use your loading indicator

Our web components expose a `componentOnReady()` function. This returns a promise that resolves as
soon as the component has rendered. If you are using `hide-until-ready`, this promise will not
resolve until the component has finished fetching data and rendered all its contents. This allows
you to to add a `.then(...)` call to that promise, which gives you the opportunity to flip a loading
flag. Here's an example of doing this in React:

```js
import React from 'react';
import '@manifoldco/ui/dist/manifold/manifold.css';
import { defineCustomElements } from '@manifoldco/ui/dist/loader';
import MyCustomLoader from './MyCustomLoader';
import './App.css';

defineCustomElements(window);

function App() {
  const selector = React.useRef(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (selector.current) {
      selector.current.componentOnReady().then(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {loading && <MyCustomLoader />}
      <manifold-plan-selector
        product-label="jawsdb-mysql"
        hide-until-ready
        ref={selector}
      ></manifold-plan-selector>
    </>
  );
}

export default App;
```

Please note that because we need `componentOnReady` to exist at the time React renders, using custom
loaders requires you to load Manifold UI synchronously (in other words, `defineCustomElements` can't
be [lazy-loaded][lazy-loading] using `import()`).

## Currently supported components

- [manifold-plan-selector][plan-selector]

[skeletons]: https://css-tricks.com/building-skeleton-screens-css-custom-properties/
[plan-selector]: /components/plan-selector
[lazy-loading]: https://reactjs.org/docs/code-splitting.html
