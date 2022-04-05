#!/usr/bin/bash

docker build -t soersoft/nestdonate:overlay -f Dockerfile.prod . && docker push soersoft/nestdonate:overlay
