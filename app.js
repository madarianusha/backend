var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db=require("./routes/db");
db();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientRouter=require('./routes/patient');
var registrationRouter=require('./routes/registration');
var patientnameRouter=require('./routes/patientname');
var patientdiseaseRouter=require('./routes/patientdisease');
var expenseRouter=require('./routes/expense');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patient',patientRouter);
app.use('/login',registrationRouter);
app.use('/patientname',patientnameRouter);
app.use('/patientdisease',patientdiseaseRouter);
app.use('/expense',expenseRouter);



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
