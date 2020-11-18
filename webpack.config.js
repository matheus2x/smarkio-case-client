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
       test: /\.(png|svg|jpe?g|gif|mp3|mpe?g)$/,
       loader: "file-loader",
       options: {
         name: "[name].[ext]"
       }
     }, {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader",
         options: {
           presets: ["@babel/preset-env"]
         }
        }
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