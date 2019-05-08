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

The docs are powered by gatsby. To see what they look like locally, run:

```bash
npm run docs
```

That will spin up the docs server locally at `localhost:8000`. Changes will
be hotloaded.

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
