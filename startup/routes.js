const bodyParser = require('body-parser');
const meetup = require('../routes/meetup');
const rsvp = require('../routes/rsvp');
const question = require('../routes/question');

module.exports = (app) => {
  // parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api/v1', meetup);
  app.use('/api/v1', rsvp);
  app.use('/api/v1', question);
};
