#!/usr/bin/env bash

git clone https://github.com/yorkie-team/yorkie-ui.git temp
cd temp
npm install
npm run build-service

cd ..
cp -R public/assets/images/docs docs-images
rm -rf public/assets
mkdir -p public/assets
cp -R ./temp/dist/assets/fonts public/assets/fonts
cp -R ./temp/dist/assets/icons public/assets/icons
cp -R ./temp/dist/assets/images public/assets/images
rm styles/style.css
cp ./temp/dist/assets/styles/page/service.css styles/style.css
mv public/assets/images/favicon* public/ 
mv public/assets/images/og* public/
mv docs-images/* public/assets/images/docs
rm -rf temp
rm -rf docs-images