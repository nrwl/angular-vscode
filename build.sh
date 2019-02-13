#!/usr/bin/env bash

rm -rf dist
tsc
rsync -a --exclude=*.ts src/ dist/src/
cp collection.json dist
cp README.md dist
cp LICENSE dist
cp package.json dist
