const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require('path');
const { mainModule } = require('process');

module.exports = {
    entry: './src/client/src/index.jsx',
    output: { path: path.resolve(__dirname, './src/client/dist'), filename: 'main.js', publicPath: '/', },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/public/index.html',
            filename: 'index.html'
        }),
        new NodePolyfillPlugin(),
    ],
    resolve:{
        fallback:{
            path:false,
        },
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ]
    },
    mode: 'development',
};