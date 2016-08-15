const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');

// app setup
app.use(morgan('combined'));
app.use(bodyparser.json({'type': '*/*'}));
router(app);

// server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);

module.exports = server;
