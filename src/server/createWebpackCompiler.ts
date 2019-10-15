import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import path from "path"

const publicDir = path.resolve(__dirname, "../../public")
const distDir = path.resolve(__dirname, "../../dist")

export const createWebpackCompiler = (entry: string, port: number) =>
  webpack({
    entry: {
      app: ["webpack-hot-middleware/client?reload=true&timeout=1000", entry],
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(publicDir, "main.css"),
          to: path.join(distDir, "main.css"),
        },
      ]),
      new HtmlWebpackPlugin({
        template: path.join(publicDir, "index.html"),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: distDir,
    },
  })
