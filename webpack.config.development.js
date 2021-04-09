const path = require('path')
const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = WebpackMerge.merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
        port: 3002,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})