const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//Set up default mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://admin:ncbcyag123@ds111648.mlab.com:11648/ncbc-young-adult';
mongoose.connect(mongoDB)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

const member = require('./server/routes/member');
app.use('/member', member);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
  db.collection('members').find().toArray((err, res) => {
    console.log(res);
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;