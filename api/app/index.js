// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');
const cors = require('cors');

const path = require('path');


const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter);


app.use((err, req, res, next) => {
  error('ERROR FOUND:', err)
  res.sendStatus(500);
});
// create an express app
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
 });


//middleware
app.use(express.json());
app.use(morganDebug('api:request', 'dev'));
app.use(cors);

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