# 🔨 Development

```bash
npm install
npm run dev
```

This will start Storybook at `localhost:6060`.

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

## 🖋️ Editing documentation

Documentation for each component lives in its corresponding `readme.md` file.
All pertinent info should go in there.

To update the site with the newest changes from the `readme.md` files, run:

```bash
npm run generate:docs
```

This will replace

```html
<!-- BEGIN README my-component -->
<!-- END README -->
```

…with the contents of `src/components/my-component/readme.md` (or warn you if
it couldn’t locate that file). If there’s already HTML between those
comments, it will still update it to the newest version of the README.

### Adding a new component to the docs

Adding the appropriate `<!-- BEGIN README my-component --><!-- END README -->`
comment will link the `src/index.html` file with the corresponding README
whenever `npm run generate:docs` is run.

##### ⚠️ Warning

Editing anything between `BEGIN README …` and `END README` will be blown away
by `generate:docs`.

### Watch for README changes

To watch for changes in the background to all README files, run:

```bash
npm run generate:docs:watch
```

## Generating TypeScript defs from Swagger specs

The canonical specs for our APIs [live here][specs]. In this repo, those YAML
files **should be manually** copied to `specs/`, in case of any changes.

To update the TypeScript defs, run:

```bash
npm run generate:specs
```

This will generate new definitions to `types/`. This is done using our own
library, [@manifoldco/swagger-to-ts][swagger-to-ts], to generate Types. If
that breaks (very likely), bug @dangodev.

Currently we’re only using `spec/catalog/v1.yaml`, but we may need other
endpoint specs as this grows.

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
non-strings, you’ll have to do so [via
JS](https://stenciljs.com/docs/properties).

**TL;DR use `camelCase` in JSX; `kebab-case` in HTML.**

[specs]: https://github.com/manifoldco/marketplace/tree/master/specs
