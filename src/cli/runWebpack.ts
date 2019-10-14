import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import path from "path"

const publicDir = path.resolve(__dirname, "../../public")

export const runWebpack = (entry: string, dist: string) =>
  webpack({
    entry,
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
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader",
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
          to: path.join(dist, "main.css"),
        },
      ]),
      new HtmlWebpackPlugin({
        template: path.join(publicDir, "index.html"),
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: dist,
    },
  })
