// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  mode: "development",
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 8080,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: "asset/resource", generator: { filename: "assets/[name][ext]" } },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "body" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/main.css", to: "main.css" },
        { from: "src/assets", to: "assets", noErrorOnMissing: true },
      ],
    }),
  ],
};
