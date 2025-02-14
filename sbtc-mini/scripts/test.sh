#!/bin/sh
mkdir -p .test
mkdir -p .coverage
rm -r .test/*
clarinet run --allow-write --allow-read ext/generate-tests.ts
clarinet run --allow-write --allow-read ext/generate-flow-tests.ts
clarinet test --coverage .coverage/lcov.info .test
