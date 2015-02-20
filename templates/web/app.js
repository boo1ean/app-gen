var express = require('express');

var config = require('../config');
var log = require('../framework/log');

var configureMiddlewares = require('./middlewares');
var configureRoutes = require('./routes');

var app = express();

configureMiddlewares(app);
configureRoutes(app);

app.listen(config.apps.{{{ name }}}.port);

log.info('{{{ name }}} started at', config.apps.{{{ name }}}.port, 'in', config.env, 'environment');

require('./worker');
