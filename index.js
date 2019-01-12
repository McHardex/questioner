const express = require('express');

// set up the express app
const app = express();

require('./startup/routes')(app);
require('./startup/db/db');

const port = process.env.PORT || 2000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`questioner listening on port ${port}`);
});

module.exports = server;
