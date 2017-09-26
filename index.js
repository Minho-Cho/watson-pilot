'use strict';

const express = require('express'); // eslint-disable-line node/no-missing-require
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
const webService = require('./src/lib/webServices')(app);
const conversation = require('./src/lib/conversation')(app);
const mpAnalysis = require('./src/lib/mpAnalysis')(app);
const cancelAnalysis = require('./src/lib/cancelAnalysis')(app);

const common = require('./src/lib/common')(app);

// bundle the code
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

// optional: load environment properties from a .env file
dotenv.load({silent: true});

// DB setting
mongoose.connect(process.env.MONGODB, { useMongoClient: true }); // 1
var db = mongoose.connection;
db.once("openUri", function() {
    console.log("DB connected");
});
db.on("error", function(err) {
    console.log("DB ERROR : ", err);
});

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/' // Same as `output.publicPath` in most cases.
}));

app.use(express.static('public/'));

const port = process.env.PORT || 3000;
process.env.PATH += process.env.MECAB_PATH;

app.listen(port, function() {
    console.log('Watson server running at http://localhost:%s/', port);
});
