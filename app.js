var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var baseResponse = require('./custommodules/BaseResponse').BaseResponse;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wechatGatewayRouter = require('./routes/wechatGateway');
var wechatRouter = require('./routes/wechat');
var alipayRouter = require('./routes/alipay');
var wechatOpenGatewayRouter = require('./routes/wechatOpenGateway');
var accessBusinessRouter = require('./routes/accessBusiness');
var microReportRouter = require("./routes/MicroReportBusiness");
var microReportUserRouter = require("./routes/MicroReportUser");
var weChatOpenRouter = require('./routes/weChatOpen');
var validate = require('./custommodules/validationHandler');
require("./autoSchedule/autoTask");
//var log = require("./custommodules/log");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//log.use(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session
app.use(session({
  name: "openSSID",
  secret: "opensecret",
  store: new FileStore(),
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 10 * 60 * 1000 }
}));


app.use('/Home', indexRouter);
app.use('/users', validate.BaseValidate, usersRouter);
app.use('/MicroReport/weChat', wechatRouter);
app.use('/MicroReport/weChat/WeChatGateway', wechatGatewayRouter);

app.use('/weChatOpen', weChatOpenRouter);
app.use('/weChatOpen/gateway', wechatOpenGatewayRouter);
app.use('/alipay', alipayRouter);
app.use('/accessBusiness', validate.AccessValidate, accessBusinessRouter);
app.use('/MicroReport/api/v1/MallPush', validate.AccessValidate, microReportRouter);
app.use('/MicroReport/api/v1/MallUser', validate.AccessValidate, microReportUserRouter);


app.use('/', function (req, res, next) {
  if (req.path == "/") {

    res.redirect("/Home");
  }
  next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //next(createError(404));
  baseResponse.ErrorCode = 404;
  baseResponse.Message = "No Found";
  return res.status(404).jsonp(baseResponse);
  //next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  baseResponse.ErrorCode = (err.status || 500);
  baseResponse.Message = err.message;
  return res.status(err.status || 200).jsonp(baseResponse);
  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
});


module.exports = app;
