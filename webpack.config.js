const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      chunks: ['app'],
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    })
    // new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
  // devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
