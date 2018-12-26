import bodyParser from 'body-parser';
import meetup from '../routes/meetup';
import rsvp from '../routes/rsvp';
import question from '../routes/question';
import welcome from '../routes/welcome';

module.exports = (app) => {
  // parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', welcome);
  app.use('/api/v1', meetup);
  app.use('/api/v1', rsvp);
  app.use('/api/v1/', question);
};
