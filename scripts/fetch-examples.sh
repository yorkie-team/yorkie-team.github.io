#!/usr/bin/env bash

git clone https://github.com/yorkie-team/yorkie-js-sdk.git temp
npm i -g ts-node
ts-node --esm scripts/fetchExamples.mts
rm -rf temp