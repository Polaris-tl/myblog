const path = require('path')
const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = WebpackMerge.merge(baseConfig, {
    mode: 'production',

})