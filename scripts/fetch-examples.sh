#!/usr/bin/env bash

git clone https://github.com/yorkie-team/yorkie-js-sdk.git temp

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

npm i -g ts-node
ts-node --esm scripts/fetchExamples.mts
rm -rf temp