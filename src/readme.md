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

As nice as it’d be to hide the contents, and only show comments, currently
that’s [not possible with the Stencil dev
server](https://github.com/ionic-team/stencil/issues/1361) (but maybe it will
be in future releases!).

### Watch for README changes

To watch for changes in the background to all README files, run:

```bash
npm run generate:docs:watch
```

## Publishing

To publish to npm, the following commands are supported:

| Command                 | Description                                        |
| :---------------------- | :------------------------------------------------- |
| `npm run publish:rc`    | Publish a release candidate to npm (testing, etc.) |
| `npm run publish:patch` | Publish a patch version                            |
| `npm run publish:minor` | Publish a minor version                            |
| `npm run publish:major` | Publish a major version                            |
