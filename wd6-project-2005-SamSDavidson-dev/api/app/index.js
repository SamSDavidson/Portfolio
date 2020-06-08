// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');
const cors = require('cors');

const path = require('path');


// routes
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const tagRouter = require('./routes/tags');
const userRouter = require('./routes/users')

// create an express app
const app = express();

app.use(express.static(path.join(__dirname, '../../reactjs/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../reactjs/build', 'index.html'));
 });


//middleware
app.use(express.json());
app.use(morganDebug('api:request', 'dev'));
app.use(cors);

app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/tags', tagRouter);
app.use('/users', userRouter)

app.use((err, req, res, next) => {
  error('ERROR FOUND:', err)
  res.sendStatus(500);
});

//error handling
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.status(err.code || 500).json({
    message: error.message,
    error,
  })
});

// export the express app
module.exports = app;