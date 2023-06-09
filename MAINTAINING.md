# Maintaining

## Releasing a New Version

### Updating and Deploying homepage

1. Update `version` in [package.json](https://github.com/yorkie-team/yorkie-team.github.io/blob/main/package.json#L36).
2. Update `NEXT_PUBLIC_YORKIE_VERSION`, `NEXT_PUBLIC_YORKIE_JS_VERSION`, and `NEXT_PUBLIC_JS_SDK_URL` in [.env](https://github.com/yorkie-team/yorkie-team.github.io/blob/34e382b81029c8cfb865bc549bdfe8a4cdd884b8/.env).
3. Modify Yorkie [documentation](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docs) and add explanations as necessary.
4. Run `npm install` and `npm run fetch:examples` to update the code on the [examples page](https://yorkie.dev/examples).
5. Create Pull Request and merge it into main.
