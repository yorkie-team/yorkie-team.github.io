# Homepage

Homepage is a comprehensive resource for information about Yorkie. It includes detailed documentation and information about Yorkie and its features, capabilities, and usage.

## Developing Homepage

### Building Homepage

For building homepage, You'll first need Node.js installed(Node.js version 16+ and npm version 7.10+ are required).

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

Yorkie UI is a repository that contains the styles of Yorkie. If you want to update the styles of the homepage. You can run the following command. Yorkie UI repository is private, so if you want to run this command, you need to be a member of the Yorkie UI repository.

```
$ npm run fetch:ui
```

### Fetching fileInfo of examples from Yorkie JS SDK

The examples that are used in the homepage are managed in the Yorkie JS SDK repository. If you want to update examples of the homepage, you can run the following command.

```
$ npm run fetch:examples
```

This command will fetch the fileInfo of examples from JS SDK repository and copy them to the `/examples` directory.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<details>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

</details>

## Deploying Homepage

When PR is merged into main, it is automatically distributed by GitHub Actions.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for details on submitting patches and the contribution workflow.
