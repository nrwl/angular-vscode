#!/usr/bin/env bash

./build.sh
npm adduser
npm publish dist --access public
