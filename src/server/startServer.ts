import path from "path"
import WebpackDevServer from "webpack-dev-server"
import { runWebpack } from "./runWebpack"

export function startServer(entry: string, port: number = 3000) {
  const dist = path.resolve(__dirname, "../../dist")

  const server = new WebpackDevServer(runWebpack(entry, dist), {
    contentBase: dist,
    port,
    stats: {
      all: false,
      colors: true,
      errors: true,
      errorDetails: true,
    },
  })

  server.listen(port, "localhost")
}
