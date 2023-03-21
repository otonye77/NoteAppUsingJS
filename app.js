var createError = require('http-errors');
var express = require('express');
var path = require('path');
const hbs = require("hbs");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { hasSubscribers } = require('diagnostics_channel');

var app = express();


// view engine setup
const publicDirectoryPath = path.join(__dirname, "../week-6-node-task-poda-otonye77/public")
const viewsPath = path.join(__dirname, "../week-6-node-task-poda-otonye77/templates/views")
const partialPath = path.join(__dirname, "../week-6-node-task-poda-otonye77/templates/partials")

// app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialPath)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicDirectoryPath))

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(7000, () => {
  console.log("Server is listening on port 7000");
})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
