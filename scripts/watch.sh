#!/usr/bin/env bash

chokidar "**/*.sol" "test/*.js" -c "solium --dir contracts || truffle compile && truffle test" --initial