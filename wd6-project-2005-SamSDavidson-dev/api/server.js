// logger
const log = require('debug')('api:logging');

//app
const app = require('./app');

// set up port
const port = process.env.PORT || 5000;

// run API server
app.listen(port, () => log(`API on ${port}`));