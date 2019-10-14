import path from "path"
import WebpackDevServer from "webpack-dev-server"
import { runWebpack } from "./runWebpack"

const port = 3000

export function startServer(entry: string) {
  const dist = path.resolve(__dirname, "../../dist")

  const server = new WebpackDevServer(runWebpack(entry, dist), {
    contentBase: dist,
    port,
  })

  server.listen(port, "localhost")
}
