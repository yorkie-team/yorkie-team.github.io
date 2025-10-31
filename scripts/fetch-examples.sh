#!/usr/bin/env bash

export $(grep -v '^#' .env | xargs)
version=$NEXT_PUBLIC_YORKIE_JS_VERSION

# Clean up temp directory if it exists
if [ -d "temp" ]; then
    echo "Cleaning up existing temp directory..."
    rm -rf temp
fi

git clone https://github.com/yorkie-team/yorkie-js-sdk.git temp
cd temp
git fetch origin refs/tags/v$version
git checkout tags/v$version
echo "Checked out to tag v$version."
cd ..

for f in temp/examples/* ; do
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

node --no-warnings=ExperimentalWarning --loader ts-node/esm scripts/fetch-examples.mts
