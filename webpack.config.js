const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/bootstrap.js',
	mode: 'development',
    devtool: 'inline-source-map',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname) + '/dist/',
		clean: false,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false,
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					keep_classnames: true,
				},
			}),
		]
	}
};