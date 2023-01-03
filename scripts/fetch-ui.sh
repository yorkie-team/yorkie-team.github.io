#!/usr/bin/env bash

git clone https://github.com/yorkie-team/yorkie-ui.git temp
cd temp
npm install
npm run build-service

cd ..
mkdir -p temp-images
cp -R public/assets/images/docs temp-images/docs
cp -R public/assets/images/examples temp-images/examples
rm -rf public/assets
mkdir -p public/assets
cp -R ./temp/dist/assets/fonts public/assets/fonts
cp -R ./temp/dist/assets/icons public/assets/icons
cp -R ./temp/dist/assets/images public/assets/images
rm styles/style.css
cp ./temp/dist/assets/styles/page/service.css styles/style.css
mv public/assets/images/favicon* public/ 
mv public/assets/images/og* public/
mv temp-images/* public/assets/images
rm -rf temp
rm -rf temp-images