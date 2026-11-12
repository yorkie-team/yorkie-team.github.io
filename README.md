# Homepage

Homepage is a comprehensive resource for information about Yorkie. It includes detailed documentation and information about Yorkie and its features, capabilities, and usage.

## Developing Homepage

### Building Homepage

For building homepage, you'll first need Node.js 20 installed (see `.nvmrc`).

```
# install packages
npm install

# build
npm run build
```

### Running Homepage

In the project directory, you can run:

```
$ npm run dev
```

### Fetching styles from Yorkie UI

Yorkie UI ([yorkie-ui-old](https://github.com/yorkie-team/yorkie-ui-old)) is a repository that contains the styles of Yorkie. If you want to update the styles of the homepage. You can run the following command. Yorkie UI repository is private, so if you want to run this command, you need to be a member of the Yorkie UI repository.

```
$ npm run fetch:ui
```

### Fetching fileInfo of examples from Yorkie SDKs

The examples that are used in the homepage are managed in the Yorkie JS, iOS and Android SDK repositories. If you want to update examples of the homepage, you can run the following command.

```
$ npm run fetch:examples
```

This command checks out each SDK at the version set in `.env` (`NEXT_PUBLIC_YORKIE_JS_VERSION`, `NEXT_PUBLIC_YORKIE_IOS_VERSION` and `NEXT_PUBLIC_YORKIE_ANDROID_VERSION`), and copies the fileInfo of its examples to the `/examples` directory and their thumbnails and demo videos to `/public/assets`. To fetch from one SDK only, run `npm run fetch:js-examples`, `npm run fetch:ios-examples` or `npm run fetch:android-examples`.

### Building example applications

The example applications are built and served directly from the homepage. To build all examples:

```
$ npm run build:examples
```

This will:

1. Use yorkie-js-sdk's pnpm build system (from `/temp` directory)
2. Read API configuration from `.env` and `.env.production` environment variables
3. Build static examples using `pnpm build:examples`
4. Copy built files to `public/apps/`

**Environment Variables:**

- `NEXT_PUBLIC_API_ADDR`: Yorkie API server address (default: https://api.yorkie.dev)
- `NEXT_PUBLIC_EXAMPLES_API_KEY`: API key for examples (optional)

For full production build including examples:

```
$ npm run build:full
```

**Note:** `npm run build:examples` builds from the yorkie-js-sdk checkout in `/temp`, so run `npm run fetch:examples` (or `npm run fetch:js-examples`) before running it on its own. `npm run build:full` does both.

## Deploying Homepage

When PR is merged into main, it is automatically distributed by GitHub Actions.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for details on submitting patches and the contribution workflow.

## Documentation

- [MAINTAINING.md](MAINTAINING.md) — Release and maintenance procedures
- [CLAUDE.md](CLAUDE.md) — Agent instructions for AI-assisted development
