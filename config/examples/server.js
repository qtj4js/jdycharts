const _ = require('lodash');
const express = require('express');
const history = require('connect-history-api-fallback');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const path = require("path");
const app = express();

const env = _.get(process.env, 'NODE_ENV', 'development');

app.use(history());

const options = {
    port: 5002
};

if (env === 'development') {
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler));
} else {
    const distPath = path.resolve(__dirname, '../../website');
    app.use(express.static(distPath));
}

app.listen(options.port, () => {
    console.log(`dev server listening on http://localhost:${options.port}`);
});
