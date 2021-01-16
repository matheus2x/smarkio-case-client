const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DuplicatesPlugin } = require("inspectpack/plugin");

module.exports = {
	mode: "production",
	entry: ["./src/js/index.js"],
	output: {
		filename: "main.bundle.js",
		path: resolve(__dirname, "dist"),
	},
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
				test: /\.(png|svg|jpe?g|gif|mp3|mpe?g)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "static",
							publicPath: "static",
							emitFile: true,
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
		new DuplicatesPlugin({
			emitErrors: false,
			emitHandler: undefined,
			verbose: false,
		}),
	],
};
