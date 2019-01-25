import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes/routes';
import invalidUrl from '../middlewares/invalidUrl';

module.exports = (app) => {
  // parse incoming requests data
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api/v1', routes);
  app.use(invalidUrl);
};
