# Embeddable Marketplace

This is the embeddable marketplace. It uses [Stencil](https://stenciljs.com/) to build a lightweight, framework-agnostic, marketetplace with web components that can be embedded in other websites.

## Local Setup

To run this project locally, clone this repo, navigate to the project root, and run:

```bash
npm install
```

and run:

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
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
