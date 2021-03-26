const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: "./src/js/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    })
    // new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
  ],
  // devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
