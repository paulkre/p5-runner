import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"

export const createWebpackCompiler = (entry: string) =>
  webpack({
    entry: {
      app: [
        "@babel/polyfill",
        "webpack-hot-middleware/client?reload=true&timeout=1000",
        entry,
      ],
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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../../public/index.html"),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../../dist"),
    },
  })
