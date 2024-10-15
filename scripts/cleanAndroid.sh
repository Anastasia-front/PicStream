#!/bin/sh

cd android
./gradlew clean
rm -rf build app/build .idea app/src/main/assets
cd -
