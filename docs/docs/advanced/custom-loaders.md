---
title: Resource Details View
path: /advanced/custom-loaders
---

# Custom Loaders

By default, our components that fetch data from our API will display skeleton screens that indicate
what the UI will look like when the data is retrieved. In some cases, you may wish to use your own
loading indicators in order to keep your UI design more consistent. What follows is a guide for
replacing our loaders with your own.

## Hide Until Ready

Components that expose the `hide-until-ready` attribute will support this behavior. If this
attribute is set, our components won't display anything until they have finished retrieving data and
have fully rendered their contents. Example:

```html
<manifold-plan-selector product-label="jawsdb-mysql"></manifold-plan-selector>
```

This is only half of the custom loader story. In order to display your loaders while the component
is still fetching, you can leverage `componentOnReady` as described below.

## Use Your Loading Indicator

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

Please note that this technique requires you to load Manifold UI synchronously.

## Currently Supported Components

We plan to make this functionality available to all components that talk to the API. For the time
being, this is only available for a limited set of components:

- [manifold-plan-selector](/components/plan-selector)
