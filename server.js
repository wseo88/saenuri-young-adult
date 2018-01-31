const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

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
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const member = require('./server/routes/member');
const auth = require('./server/routes/auth');
const users = require('./server/routes/users');

app.use('/member', member);
app.use('/auth', auth);
app.use('/users', users);

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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