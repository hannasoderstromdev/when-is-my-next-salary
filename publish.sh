#!/bin/bash
# This script patches the npm version and then publishes it to NPM
npm run build && npm version patch && npm publish