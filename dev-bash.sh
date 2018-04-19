#!/usr/bin/env bash

docker-compose build ethcontract
docker-compose run --entrypoint /bin/bash ethcontract