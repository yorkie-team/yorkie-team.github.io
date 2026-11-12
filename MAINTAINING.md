# Maintaining

## Releasing a New Version

### Updating and Deploying homepage

1. Update the `@yorkie-js/sdk` dependency in [package.json](package.json) to the new JS SDK version.
2. Update the version variables in [.env](.env) for every SDK that has a new release:
   - `NEXT_PUBLIC_YORKIE_VERSION`: Yorkie server
   - `NEXT_PUBLIC_YORKIE_JS_VERSION` and `NEXT_PUBLIC_JS_SDK_URL`: JS SDK
   - `NEXT_PUBLIC_YORKIE_IOS_VERSION`: iOS SDK (a tag of [yorkie-ios-sdk](https://github.com/yorkie-team/yorkie-ios-sdk/tags), e.g. `0.7.26`)
   - `NEXT_PUBLIC_YORKIE_ANDROID_VERSION`: Android SDK (a tag of [yorkie-android-sdk](https://github.com/yorkie-team/yorkie-android-sdk/tags) without the `v` prefix, e.g. `0.7.25`)

   The docs render these through `{{YORKIE_VERSION}}`, `{{YORKIE_JS_VERSION}}`, `{{YORKIE_IOS_VERSION}}` and `{{YORKIE_ANDROID_VERSION}}`, and the fetch scripts use them to pick the SDK tag to fetch examples from.
3. Modify Yorkie [documentation](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docs) and add explanations as necessary.
4. Run `npm install` and `npm run fetch:examples` to update the code on the [examples page](https://yorkie.dev/examples). To refresh only one SDK, run `npm run fetch:js-examples`, `npm run fetch:ios-examples` or `npm run fetch:android-examples`.
5. Run `npm run build` and ensure there are no errors.
6. Create Pull Request and merge it into main.
