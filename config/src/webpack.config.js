const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const basePath = path.resolve(__dirname, '../../');

module.exports = {
    entry: {
        jdy_chart: [path.join(basePath, 'src/index')]
    },
    // 输出目录
    output: {
        filename: '[name].js',
        path: path.join(basePath, 'dist'),
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        contentBase: './dist',
        disableHostCheck: true
    },
    // 配置loader
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /.jsx?$/,
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
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    optimization: {
        usedExports: true,
        sideEffects:true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            })
        ]
    },
}
