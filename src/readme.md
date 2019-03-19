# Development

To run this project locally, clone this repo, navigate to the project root, and run:

```bash
npm install
```

and run:

```bash
npm run dev
```

_Note: you may also want to run `npm run format:css:watch` in a separate
process, to automatically format CSS as you save._

## Testing

To run the unit tests once, run:

```
npm run test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```

## Editing documentation

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

## Publishing to npm

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
