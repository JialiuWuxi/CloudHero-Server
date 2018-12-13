var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var indexRouter = require('./routes/index');
var cloudheroesRouter = require('./routes/cloudheroes');
var commounicationsRouter = require('./routes/commounications');
var ptcsRouter = require('./routes/PTCs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/', indexRouter);
app.use('/cloudheroes', cloudheroesRouter);
app.use('/commounications', commounicationsRouter);
app.use('/PTCs', ptcsRouter);


module.exports = app;
