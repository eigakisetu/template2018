const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
	filename: "[name].css",
});

module.exports = [{
	entry: './resources/assets/js/app.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public/assets/js')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}],
		}],
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		// console.log（）などのconsole.*系の記述を取り除いて出力する
		// 		drop_console: true
		// 	},
		// }),
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new CopyWebpackPlugin([
			{
				from: './resources/assets/icons',
				to: '../icons'
			},
			{
				from: './resources/assets/images',
				to: '../images',
			}
		], {
			ignore: [{
				glob: './resources/assets/_**/*', dot: false
			}],
		})
	],
}, {
	entry: {
		style: './resources/assets/scss/style.scss',
	},
	output: {
		path: path.join(__dirname, 'public/assets/css'),
		filename: '[name].css'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: extractSass.extract({
				use: [{
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}],
			})
		}]
	},
	plugins: [
		extractSass
	]
}];
