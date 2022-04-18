const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  target: "node",
  stats: "detailed",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new NodemonPlugin()],
  externals: {
    express: "express",
  },
};
