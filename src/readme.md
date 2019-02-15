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

```
npm run test.watch
```

## Publishing

To publish to npm, the following commands are supported:

| Command                 | Description                                        |
| :---------------------- | :------------------------------------------------- |
| `npm run publish:rc`    | Publish a release candidate to npm (testing, etc.) |
| `npm run publish:patch` | Publish a patch version                            |
| `npm run publish:minor` | Publish a minor version                            |
| `npm run publish:major` | Publish a major version                            |
