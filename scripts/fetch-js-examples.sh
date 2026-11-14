#!/usr/bin/env bash

export $(grep -v '^#' .env | xargs)
version=$NEXT_PUBLIC_YORKIE_JS_VERSION

# Clone outside this repository. Examples type-check their imports, and from
# inside this tree TypeScript would climb into this site's node_modules and
# load its React types next to the examples' own. Keep the path in sync with
# EXAMPLES_PATH in fetch-js-examples.mts and YORKIE_SDK_PATH in
# build-js-examples.mts.
sdkDir="${TMPDIR:-/tmp}"
sdkDir="${sdkDir%/}/yorkie-js-sdk"
if [ -d "$sdkDir" ]; then
    echo "Cleaning up existing $sdkDir..."
    rm -rf "$sdkDir"
fi

git clone https://github.com/yorkie-team/yorkie-js-sdk.git "$sdkDir"
cd "$sdkDir"
git fetch origin refs/tags/v$version
# Examples come from the release tag. YORKIE_JS_EXAMPLES_REF can pin a later
# commit to ship example changes before the next release; once the tag
# contains that commit, the tag wins again, so a forgotten pin cannot hold
# the examples back.
ref="tags/v$version"
if [ -n "$YORKIE_JS_EXAMPLES_REF" ]; then
    if git merge-base --is-ancestor "$YORKIE_JS_EXAMPLES_REF" "tags/v$version"; then
        echo "v$version already contains $YORKIE_JS_EXAMPLES_REF; using the tag."
    else
        ref="$YORKIE_JS_EXAMPLES_REF"
    fi
fi
git checkout "$ref" || exit 1
echo "Checked out $ref."
cd - > /dev/null

for f in "$sdkDir"/examples/* ; do
    if [ -d "$f" ]; then
        exampleName="$(basename "$f")"
        find "$f" -name thumbnail* -print0 | while read -d $'\0' file
        do
            outputPath="public/assets/images/examples/"
            fileExtension="${file##*.}"
            fileName="$outputPath$exampleName.$fileExtension"
            mkdir -p "$outputPath"
            cp -R "$file" "$fileName"
            echo "[COPY Thumbnail] $fileName"
        done
    fi
done

node --no-warnings=ExperimentalWarning --loader ts-node/esm scripts/fetch-js-examples.mts
