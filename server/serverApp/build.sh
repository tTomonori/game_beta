#!/bin/bash
appname="TreadJokerServer"
electron-packager ./ $appname --platform=darwin --icon=icon_s.icns
rm -r $appname-darwin-x64/$appname.app/Contents/Resources/app/node_modules
cp -r node_modules $appname-darwin-x64/$appname.app/Contents/Resources/app/node_modules
