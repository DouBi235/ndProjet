var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var multiparty=require("connect-multiparty");
// var favicon=require('serve-favicon');
var bodyParser=require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var manageRouter = require('./routes/manage.js');

var app = express();
require('./db/db')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multiparty({uploadDir:'./public/images/photo'}))
// app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"html"
}))
/*访问路由前验证*/
app.use(function(req,res,next){
    if(req.url=="/"){
        if(session.userInfo){
            app.locals.userNick=session.userInfo.userNick;
            app.locals.userId=session.userInfo.userId
            next();
        }else{
            app.locals.userNick='';
            app.locals.userId=''
            next();
        }
    }else{
        if(req.url.indexOf("/users")!=-1){
            if(session.userInfo){
                next()
            }else{
                res.render('error')
            }
        }else if(req.url.indexOf('/manage')!=-1){
            if(session.manageInfo){
                next()
            }else{
                res.render("error")
            }
        }else{
            next()
        }
    }
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manage', manageRouter);

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
