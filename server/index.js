const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./router');

// use config based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.' + env);

// db setup
mongoose.connect('mongodb://' + config.mongo.uri + '/' + config.mongo.db);

// app setup
app.use(morgan('combined'));
app.use(bodyparser.json({'type': '*/*'}));
router(app);

// server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);

module.exports = server;
