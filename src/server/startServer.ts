import express from "express"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"

import { createWebpackCompiler } from "./createWebpackCompiler"

export function startServer(entry: string, port: number = 3000) {
  const app = express()

  const compiler = createWebpackCompiler(entry)

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: "/",
      stats: "errors-warnings",
    }),
  )
  app.use(webpackHotMiddleware(compiler))

  app.listen(port)
}
