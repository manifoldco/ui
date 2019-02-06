# Development

To run this project locally, clone this repo, navigate to the project root, and run:

```bash
npm install
```

and run:

```bash
npm run start
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

## Generating Docs

To move all the `readme.md` files into `src/index.html`, run the following:

```bash
npm run generate:docs
```

This will replace

```html
<!-- BEGIN README manifold-marketplace -->
<!-- END README -->
```

With the contents of `src/components/manifold-marketplace/readme.md`.

### Adding new components

The docs live in `src/index.html` (the very file you load to develop!).

Adding docs is as easy as adding a comment:

```html
<!-- BEGIN README my-component -->
<!-- END README -->
```

Running `npm run generate:docs` afterward will automatically insert the
contents of `src/components/my-component/readme.md` between the `BEGIN` and
`END` comments.

##### ⚠️ Warning

Editing anything between `BEGIN README …` and `END README` will be blown away
by `generate:docs`.

As nice as it’d be to hide the contents, and only show comments, currently
that’s [not possible with the Stencil dev
server](https://github.com/ionic-team/stencil/issues/1361) (but maybe it will
be in future releases!).

### Watching

Alternately, you may run `npm run generate:docs:watch` to do this in the
background as you edit the READMEs.

## Publishing

To publish to npm, the following commands are supported:

| Command                 | Description                                        |
| :---------------------- | :------------------------------------------------- |
| `npm run publish:rc`    | Publish a release candidate to npm (testing, etc.) |
| `npm run publish:patch` | Publish a patch version                            |
| `npm run publish:minor` | Publish a minor version                            |
| `npm run publish:major` | Publish a major version                            |
