#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const { startServer } = require("./lib/cli/startServer")

const entry = path.join(process.cwd(), "index.js")

if (!fs.existsSync(entry)) {
  console.log("\nCould not find an entry file in your working directory")
  console.log('Please make sure to call the file "index.js" or "index.ts"')
  process.exit(1)
}

startServer(entry)
