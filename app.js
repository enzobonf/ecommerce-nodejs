var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const redis   = require("redis");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();

const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');

var carrinhoRouter = require('./routes/carrinho');

var app = express();

require('./inc/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client,
  }),
  secret: '3nz02002',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){

  res.locals.login = req.isAuthenticated();
  next();

});

require('./routes/index')(app);

/* app.use(indexRouter);
app.use(carrinhoRouter); */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
