#!/usr/bin/env node

const { findIndexFile } = require("./lib/cli/findIndexFile")
const { startServer } = require("./lib/cli/startServer")

const fileName = findIndexFile()

if (!fileName) {
  console.log("\nCould not find an entry file in your working directory")
  console.log('Please make sure to call the file "index.js" or "index.ts"')
  process.exit(1)
}

startServer(fileName)
