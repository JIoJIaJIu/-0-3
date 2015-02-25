/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents main application file.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

var express = require('express'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    bodyParser = require('body-parser');

var GiftCardController = require('./controllers/GiftCard');
var BusinessController = require('./controllers/Business');

// Configure the logger for `logserver`
winston.loggers.add('logger', {
    console: {
        level: 'debug',
        timestamp: true,
        handleExceptions: true,
        json: true
    }
});

var logger = winston.loggers.get("logger");

// Mock the user for authorization
var users = [{
    id: 1,
    username: 'bob',
    token: '123456789',
    email: 'bob@example.com'
}, {
    id: 2,
    username: 'joe',
    token: 'abcdefghi',
    email: 'joe@example.com'
}];


function findByToken(token, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.token === token) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


var app = express();
var router = require('./middlewares/router'),
    tokenParser = require('./middlewares/tokenParser'),
    formParser = require('./middlewares/formParser'),
    responser = require('./middlewares/responser'),
    errorHandler = require('./middlewares/errorHandler'),
    config = require('config');

app.use(bodyParser.json());
app.use(expressWinston.logger({
    winstonInstance: logger
}));
var options = {
  uploadDir: path.join(process.cwd(), config.TEMP_DIRECTROY)
};
app.use(formParser(options));
app.use(tokenParser());
app.use(router(config));
app.use(errorHandler());
app.use(responser());

// Initial DB for testing
require('./test_files/initialDB.js')(true);

// Start the server
app.listen(config.WEB_SERVER_PORT);
winston.info('Express server listening on port ' + config.WEB_SERVER_PORT);
