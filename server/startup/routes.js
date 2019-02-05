import bodyParser from 'body-parser';
import routes from '../routes/routes';
import invalidUrl from '../middlewares/invalidUrl';

module.exports = (app) => {
  // parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-auth-token, Content-Type, Accept');
    next();
  });
  app.use('/api/v1', routes);
  app.use(invalidUrl);
};
