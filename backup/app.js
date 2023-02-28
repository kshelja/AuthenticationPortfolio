var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const db = require('./connection');
const postModel = require('./postModel');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


app.post('/testing', async(req,res)=>{
  const {title, content} = req.body;
  console.log(title);
  console.log(content);
  try {
    const newPost = await postModel.create({title,content});
    res.json(newPost)
  } catch (error) {
    res.status(500).send(error)
  }
});

// get http://localhost:3000/testing
app.get('/testing', async(req,res)=>{
  // const {title, content} = req.body;
  try {
    const posts = await postModel.find();
    res.json(posts)
  } catch (error) {
    res.status(500).send(error)
  }
});

// get http://localhost:3000/testing/63fd0183fe8da67070218896
app.get('/testing/:id', async(req,res)=>{
  const {id} = req.params;
  try {
    const post = await postModel.findById(id);
    res.json(post)
  } catch (error) {
    res.status(500).send(error)
  }
});


// // put http://localhost:3000/testing/63fd0183fe8da67070218896
// app.put('/testing/:id', async(req,res)=>{
//   const {id} = req.params;
//   const {title, content} = req.body;
//   try {
//     const post = await postModel.findByIdAndDelete(id,{title, content});
//     res.json(post)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// });


// put http://localhost:3000/testing/63fd0183fe8da67070218896
app.put('/testing/:id', async(req,res)=>{
  const {id} = req.params;
  const {title, content} = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(id,{title, content});
    res.json(post)
  } catch (error) {
    res.status(500).send(error)
  }
});


// put http://localhost:3000/testing/63fd0183fe8da67070218896
app.put('/testing/:id', async(req,res)=>{
  const {id} = req.params;
  try {
    const post = await postModel.findById(id);
    await post.remove();
    res.json('Deleted Successfully')
  } catch (error) {
    res.status(500).send(error)
  }
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
