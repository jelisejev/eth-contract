#!/usr/bin/env bash

chokidar "**/*.sol" "test/*.js" "migrations/*.js" -c "solium --dir contracts || truffle compile && truffle test" --initial