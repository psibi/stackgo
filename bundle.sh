#!/usr/bin/env bash
# Script for bundling a firefox and chrome zip plugin

# Chrome bundling
rm -rf ./chrome
mkdir chrome
cp manifest.json stackage.js ./chrome
cp -r icons ./chrome
# cd chrome
# zip -r ../chrome.zip *
# cd ..

#Firefox bundling
rm -rf ./firefox
mkdir firefox
cp manifest.json stackage.js ./firefox
cp -r icons ./firefox
cp -r settings ./firefox
cd firefox
zip -r ../firefox.zip *
cd ..
