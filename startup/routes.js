import bodyParser from 'body-parser';
import routes from '../routes/routes';
// import meetup from '../routes/meetup';
// import rsvp from '../routes/rsvp';
// import question from '../routes/question';
// import welcome from '../routes/welcome';
import invalidUrl from '../middlewares/invalidUrl';

module.exports = (app) => {
  // parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api/v1', routes);
  app.use(invalidUrl);
};
