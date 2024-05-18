# Maintaining yorkie-ui

## Releasing a New Version

### 1. Update the version number.

- Update `version` in [package.json](https://github.com/yorkie-team/yorkie-ui/blob/main/package.json#L3).

### 2. Create Pull Request and merge it into main.

### 3. Publish a new release.

Create [a new release](https://github.com/yorkie-team/yorkie-ui/releases/new) by attaching the changelog by clicking Generate release notes button.

Then [GitHub action](https://github.com/yorkie-team/yorkie-ui/blob/main/.github/workflows/npm-publish.yml) will publish Yorkie UI to [npm](https://www.npmjs.com/package/yorkie-ui).
