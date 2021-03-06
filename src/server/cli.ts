#!/usr/bin/env node

import fs from "fs"
import path from "path"
import isValidPath from "is-valid-path"

import { startServer } from "./startServer"

console.log()

function getPathFromArgs(filePath: string) {
  if (!isValidPath(filePath)) {
    console.log("Please provide a valid entry file")
    process.exit(1)
  }

  const entry = path.join(process.cwd(), filePath)

  if (!fs.existsSync(entry)) {
    console.log(`Could not find entry file "${filePath}"`)
    process.exit(1)
  }

  return entry
}

function getDefaultPath() {
  const entry = path.join(process.cwd(), "index.js")

  if (!fs.existsSync(entry)) {
    console.log("Could not find an entry file in your working directory")
    console.log('Please make sure to name the default file "index.js"')
    process.exit(1)
  }

  return entry
}

startServer(
  process.argv.length > 2 ? getPathFromArgs(process.argv[2]) : getDefaultPath(),
)
