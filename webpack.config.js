const { resolve } = require("path");
const  HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["whatwg-fetch",  "./src/js/index.js"],
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader , "css-loader" ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|mp3|mpe?g)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  }
}
