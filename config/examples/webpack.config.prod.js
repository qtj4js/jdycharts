const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const basePath = path.resolve(__dirname, '../../');

const prodConfig = merge(commonConfig, {
    mode: 'production',
    // 应用入口
    entry: {
        app: ['@babel/polyfill', path.join(basePath, 'examples/index')]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
        ]
    }
});

module.exports = prodConfig;
