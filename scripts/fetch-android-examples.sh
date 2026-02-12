#!/usr/bin/env bash

export $(grep -v '^#' .env | xargs)
version=$NEXT_PUBLIC_YORKIE_ANDROID_VERSION

# Clean up temp directory if it exists
if [ -d "temp" ]; then
    echo "Cleaning up existing temp directory..."
    rm -rf temp
fi

git clone https://github.com/yorkie-team/yorkie-android-sdk.git temp
# cd temp
# git fetch origin refs/tags/v$version
# git checkout tags/v$version
# echo "Checked out to tag v$version."
# cd ..

for f in temp/examples/* ; do
    if [ -d "$f" ]; then
        exampleName="android-$(basename "$f")"
        find "$f" -name thumbnail* -print0 | while read -d $'\0' thumbnailFile
        do
            outputThumbnailPath="public/assets/images/examples/"
            thumbnailFileExtension="${thumbnailFile##*.}"
            thumbnailFileName="$outputThumbnailPath$exampleName.$thumbnailFileExtension"
            mkdir -p "$outputThumbnailPath"
            cp -R "$thumbnailFile" "$thumbnailFileName"
            echo "[COPY Thumbnail] $thumbnailFileName"
        done

        find "$f" -name demo* -print0 | while read -d $'\0' demoFile
        do
            outputDemoPath="public/assets/videos/examples/"
            demoFileExtension="${demoFile##*.}"
            demoFileName="$outputDemoPath$exampleName.$demoFileExtension"
            mkdir -p "$outputDemoPath"
            cp -R "$demoFile" "$demoFileName"
            echo "[COPY Demo] $demoFileName"
        done
    fi
done

node --no-warnings=ExperimentalWarning --loader ts-node/esm scripts/fetch-android-examples.mts
