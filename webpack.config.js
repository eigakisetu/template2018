const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: "[name].css",
});

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
	entry: './resources/assets/js/app.js',
	output: {
		path: path.join(__dirname, 'public/'),
		filename: './assets/js/bundle.js',
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
	],
}, {//css
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
