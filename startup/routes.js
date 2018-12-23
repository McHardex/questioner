const bodyParser = require('body-parser');
const router = require('../routes/meetup');

module.exports = (app) => {
  // parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api/v1', router);
};
