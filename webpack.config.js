const webpack = require('webpack');
const path = require('path');

const config = {
    entry: path.resolve(__dirname, 'src') + '/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
        ]
    },
    devServer: {
        contentBase: 'dist',
        port: 3000
    },
    devtool: 'eval'
}

module.exports = config;