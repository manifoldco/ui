# 🔨 Development

```bash
npm install
npm run dev
```

This will start Storybook at `localhost:6060`. Storybook is the preferred way
to work on styles and testing.

Copy these specs from [our specs][specs] into here:

- `src/spec/catalog/v1.yaml`
- `src/spec/gateway/v1.yaml`
- `src/spec/marketplace/v1.yaml`
- `src/spec/provisioning/v1.yaml`

And run `npm run generate:specs`. This is a public repo, but our API specs
aren’t public for now (the types are OK though).

## 📖 Writing stories

Create a new story in `stories/`, or modify an existing one to add it to
Storybook. Testing every version of a component is recommended.

## 📋 Testing

| Command                        | Effect                                                        |
| :----------------------------- | :------------------------------------------------------------ |
| `npm run test [pattern]`       | (slow) Run all unit & E2E tests matching `[pattern]`          |
| `npm run test:e2e [pattern]`   | (slow) Run all E2E tests matching `[pattern]`                 |
| `npm run test:spec [pattern]`  | (fast) Run all unit tests matching `[pattern]`                |
| `npm run test:watch [pattern]` | (fast) Run all unit tests while working, matching `[pattern]` |

## 🖼️ Visual Regression Testing

We use [Happo](https://happo.io/) integrated into our CI pipeline for visual regression testing.

After a PR is made, Happo tests a screenshot of the new PR against a screenshot of the previous version of the same component. If a visual change is detected, the Happo check in the CI pipeline will fail, and it will require human eyes to approve the check.

You can do this by clicking `Details` on a failed Happo check and using the `Review ˅` drop down to Accept or Reject the visual differences you see in the screenshot tests. If the changes are intended PR changes, you can Accept, and if the changes are unexpected you can Reject and the author will be signaled to review their changes.

A passing Happo check means that the test detected no visual changes.

### Writing Happo Tests

New components that are not yet covered by Happo screenshots should include visual regression test coverage. In order to write a new test, add a file to your component directory titled `[my-component]-happo.ts`, substituting [my-component] with the name of your component.

A simple Happo test just requires the component to be appended to the body of the DOM and exported:
```
export const skeleton = () => {
  const details = document.createElement('manifold-resource-details-view');

  document.body.appendChild(details);
};
```

Components that use data can add mocked data to the element objects with the `fromJSON` util:
```
import resource from '../../spec/mock/cms-stage/resource.json';
import fromJSON from '../../spec/mock/fromJSON';

export const available = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = { loading: false, data: fromJSON(resource) };

  document.body.appendChild(status);

  return status.componentOnReady();
};
```

Components that have slots can have the slot elements appended to them using `appendChild` before the element is returned:
```
import fromJSON from '../../spec/mock/fromJSON';

export const jawsDB = () => {
  const productPage = document.createElement('manifold-product-page');
  productPage.product = fromJSON(jawsdbMock);
  productPage.provider = fromJSON(jawsdbProvider);

  const button = document.createElement('manifold-button');
  button.textContent = 'Get JawsDB MySQL';
  button.slot = 'cta';

  productPage.appendChild(button);
  document.body.appendChild(productPage);

  return productPage.componentOnReady();
};
```

If necessary, tests can be written with HTML as a string and interpolated using the `toHTML` util:
```
import toHTML from '../../../test-utils/to-html';

export const primary = () => {
  const content = `
    <manifold-tooltip label-text="This is a tooltip">
      <span class="value" data-value="42" data-locked>
        <manifold-icon class="icon" icon="${lock}" margin-right></manifold-icon>
        42
      </span>
  `;

  const tooltip = toHTML(content) as HTMLManifoldTooltipElement;
  document.body.appendChild(tooltip);

  return tooltip.componentOnReady();
};
```

Returning on `componentOnReady()` helps ensure the screenshot loads all the necessary data before the test is run.

Use the CLI during test development to create reports that show you the screenshots that will be tested:

| Command                        | Effect                                                        |
| :----------------------------- | :------------------------------------------------------------ |
| `npm run happo dev`       | Run a Happo example test that will watch your changes for test iterations            |
| `npm run happo`   | Run a Happo example test that will persist                 |

Further examples of Happo tests can be found in their [docs](https://github.com/happo/happo.io/blob/master/README.md#defining-examples).

## 🖋️ Editing documentation

The docs are powered by Gatsby. To preview them locally, run:

```bash
npm run docs
```

That will spin up the docs server locally at `localhost:8000`. Changes will
**not** be hot-loaded from Stencil (it’ll act like a production build).

_Note: when adding a new `*.md` file in `/docs/docs`, it will automatically
hot reload, however it will break if you don’t add a `path` in
[frontmatter][frontmatter]._

## 🚀 Publishing to npm

To publish to npm, tag it in Git with a valid [npm-semver][npm-semver].

### Stable release

If you’re releasing a stable release after it’s been fully tested, create a
semver [Git tag][git-tag], starting with `v`:

```
v1.0.0
```

This will be accessible for download at `npm i --save @manifoldco/ui`.

### Unstable release

If you’re testing a release candidate, or something experimental, add a
hyphen (`-`) followed by a named flag, and end with `.` + digit. Here are
some examples:

```
v1.0.0-rc.0      # first release candidate
v1.0.0-rc.1      # second release candidate
v1.1.0-alpha.0   # buggy version, published for testing
```

Unlike stable releases, these won’t be downloaded unless someone specifically
requests the flag (e.g.: `npm i --save @manifoldco/ui@rc` or `npm i --save @manifoldco/ui@alpha`).

[git-tag]: https://help.github.com/en/articles/working-with-tags
[npm-semver]: https://docs.npmjs.com/misc/semver
[specs]: https://github.com/manifoldco/marketplace/tree/master/specs
[swagger-to-ts]: https://www.npmjs.com/package/@manifoldco/swagger-to-ts

## 💁 Tips

### Attributes vs Properties

An important concept to understand when working with web components is the
differences between an HTML attribute and a DOM node property. A simple
example would involve an input element:

```html
<input type="text" value="" />
```

Imagine a user typed something into that box. If we ran the following
functions in a browser console, we’d get the following:

```js
document.querySelector('[type=text]').value;
// "Sarah Anderson"
document.querySelector('[type=text]').getAttribute('value');
// ""
```

In the DOM, `value=""` didn’t update, but as the user typed, the node’s
`.value property updated to reflect the user’s status.

#### Applying it to Stencil

Stencil treats attributes & properties very differently, especially within
JSX. Consider the two **in JSX**:

```jsx
<user-card user-info={user} /> // 🚫
<user-card userInfo={user} /> // ✅
```

Of the two, the `kebab-case` one is an HTML attribute. As such, Stencil will
do its best to try and figure out what you meant, but this isn’t meant for
nested objects, and **it won’t receive updates.**

However, when dealing with HTML, it’s totally different—only attributes are
supported (this means only strings!):

```jsx
<user-card user-info={user} /> // ✅
<user-card userInfo={user} /> // 🚫
```

In this example, `userInfo` is actually converted to `userinfo` (HTML is
case-insensitive), so it’s a different prop. Also, if you want to set
non-strings, you’ll have to do so [via JS][stencil-properties].

**TL;DR use `camelCase` in JSX; `kebab-case` in HTML.**

[frontmatter]: https://jekyllrb.com/docs/front-matter/
[specs]: https://github.com/manifoldco/marketplace/tree/master/specs
[stencil-properties]: https://stenciljs.com/docs/properties
