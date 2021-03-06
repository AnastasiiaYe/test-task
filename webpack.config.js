const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: './dist'
    }, 

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                exclude: /node_modules/,
                use:['babel-loader', 'style-loader','css-loader', 'sass-loader']
            }
        ]
    }
}

