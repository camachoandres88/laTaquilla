var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module)
var config  = require('./libs/config');
var passport = require('passport');
//initialize mongoose schemas
require('./models/users');
require('./models/orders');
require('./models/events');

var oauth2 = require('./libs/auth/oauth2');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var orders = require('./routes/orders');
var events = require('./routes/events');

var mongoose = require('mongoose');                         //add for Mongo support
//mongoose.connect(config.get('mongoose:uri'));
mongoose.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

require('./libs/auth/auth');

app.use('/', routes);
app.use('/users', users);
app.use('/api', api)
app.use('/api/orders', orders)
app.use('/api/events', events)
app.use('/api/oauth/token', oauth2.token);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  if (app.get('env') === 'development') {
    log.debug('Not found URL: %s',req.url);
  }
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(req, res, next){
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({ 
      error: 'Not found' 
    });
    return;
});

// error handlers
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({ 
      error: err.message 
    });
    return;
});


module.exports = app;
