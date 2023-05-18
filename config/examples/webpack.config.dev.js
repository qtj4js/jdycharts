const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const basePath = path.resolve(__dirname, '../../');

const devConfig = merge(commonConfig, {
    mode: 'development',
    // 应用入口
    entry: {
        app: ['@babel/polyfill', path.join(basePath, 'examples/index'), 'webpack-hot-middleware/client?reload=true']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        disableHostCheck: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = devConfig;
