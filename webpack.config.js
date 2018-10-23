const path = require('path');

const APP_PATH = path.join(__dirname, "public");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: APP_PATH,
		filename: "bundle.js"
	},
	module: {
		rules: [{
			loader: "babel-loader",
			test: /\.js$/,
			exclude: /node_modules/
		}, {
			use: [
				"style-loader",
				"css-loader",
				"sass-loader"
			],
			test: /\.s?css$/,
		}]
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: APP_PATH
	}
};