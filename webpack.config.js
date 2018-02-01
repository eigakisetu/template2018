const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require("autoprefixer");
const precss = require("precss");

const pugGenerator = function (path) {
	return new HtmlWebpackPlugin(
		{
			template: './resources/views/' + path + '.pug',
			filename: './' + path + '.html',
			inject: true
		}
	)
};

module.exports = [{
	devServer: {
		contentBase: 'public',
		port: 3000
	},
	entry: './resources/assets/js/app.js',
	output: {
		path: path.join(__dirname, 'public/'),
		filename: './assets/js/bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}],
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new CopyWebpackPlugin([//,icons,images
			{
				from: './resources/assets/icons',
				to: './assets/icons'
			},
			{
				from: './resources/assets/images',
				to: './assets/images',
			}
		], {
			ignore: [{
				glob: './resources/assets/_**/*', dot: false
			}],
		}),
		pugGenerator('index'),
		pugGenerator('login/index'),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {baseDir: ['public']}
		})
	],
}, {
	entry: {
		style: path.join(__dirname, "resources/assets/scss/style.scss")
	},
	output: {
		path: path.join(__dirname, 'public/assets/css'),
		filename: '[name].css'
	},
	module: {
		rules: [
			{
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: false
							}
						},
						"postcss-loader",
						"sass-loader"
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
	]
}];
