const { resolve } = require("path");
const  HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: "./src/js/index.js",
   output: {
     filename: "main.js",
     path: resolve(__dirname, "dist"),
   },
   module: {
     rules: [{
       test: /\.css$/,
       use: [
         "style-loader",
         "css-loader",
         MiniCssExtractPlugin.loader,
       ],
     }, {
       test: /\.(png|svg|jpg|gif|mp3|mpe?g)$/,
       use: [
         "file-loader"
       ]
     }]
   },
   plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    })
   ]
 }