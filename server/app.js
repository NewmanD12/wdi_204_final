//instantiate standard libraries
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require("dotenv").config()

const { mongooseConnect } = require('./mongoose.js')
mongooseConnect()

// const issuesRouter = require('./routes/issues')
const usersRouter = require('./routes/users')
const projectsRouter = require('./routes/projects')

const app = express();


// view engine setup
// sets application settings. (things we can access across the application)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//associating the libraries with the app
// adding middleware 
//(adding libraries that we can use throughout our application)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.options("*", cors());

//for hosting static files: css, html, images etc. 
app.use(express.static(path.join(__dirname, 'public'))); 


app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
// app.use('/issues', issuesRouter)

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

const port = process.env.PORT || 8000

app.listen(port, () => {
console.log(`Jira-Clone app listening on port ${port}`)
})

module.exports = app;