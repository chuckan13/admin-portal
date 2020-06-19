const path = require('path');

module.exports = {
	entry: './src/main/js/app.js',
	devtool: 'sourcemaps',
	cache: true,
	mode: 'development',
	output: {
		path: __dirname,
		filename: './src/main/resources/static/built/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ]
						}
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							// './font/[hash].[ext]'
							// src/main/resources/static/fonts/
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [ 'file-loader?name=../img/[name].[ext]' ]
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			}
		]
	}
};
