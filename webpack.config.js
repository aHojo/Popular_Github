const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath:'/'
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: "babel-loader"},
      {test: /\.css$/, use: ["style-loader", "css-loader"]},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  mode: process.env.NODE_ENV == "production" ? "production" : "development"
};