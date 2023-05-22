# Maintaining

## Releasing a New Version

### 1. Updating the version number.

1. Update `version` in [package.json](https://github.com/yorkie-team/yorkie-team.github.io/blob/main/package.json#L36).
2. Update `NEXT_PUBLIC_YORKIE_VERSION` and `NEXT_PUBLIC_YORKIE_JS_VERSION` in [.env](https://github.com/yorkie-team/yorkie-team.github.io/blob/34e382b81029c8cfb865bc549bdfe8a4cdd884b8/.env#L2-L3).
4. Create Pull Request and merge it into main.

### 2. Updating the documentation and examples.

1. Modify Yorkie [documentation](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docs) and add explanations if necessary.
2. Run `npm run fetch:examples` to update the code on the [examples page](https://yorkie.dev/examples).
3. Create Pull Request and merge it into main.
