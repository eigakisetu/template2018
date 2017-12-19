const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common[0], {
	plugins: [
		new UglifyJSPlugin()
	]
});


