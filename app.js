const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const JsonParser = require('jsonparse');
// const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');

// const indexRouter = require('./routes/index');
// const downloadRouter = require('./routes/download');
// const uploadRouter = require('./routes/upload');
const generalRouter = require('./routes/general-router');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(logger('dev'));
// app.set('port', process.env.PORT || 8080);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(formidableMiddleware());
// app.use('/', indexRouter);
// app.use('/upload', uploadRouter);
// app.use('/download', downloadRouter);
// app.use('/users', usersRouter) ;
app.use('/upload', generalRouter);
// res.setHeader('Access-Control-Allow-Origin', '*');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({error: error});
});

module.exports = app;


