const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePath = path.resolve(__dirname, '../../');

module.exports = {
    // 输出目录
    output: {
        filename: '[name].js',
        path: path.join(basePath, 'website'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js','.jsx', '.ts', '.tsx']
    },
    // 配置loader
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    'css-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: path.join(basePath, 'examples/assets/favicon.ico'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        })
    ]
}
