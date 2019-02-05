import express from 'express';
import routes from '../routes/routes';
import invalidUrl from '../middlewares/invalidUrl';

module.exports = (app) => {
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-auth-token, Content-Type, Accept');
    next();
  });
  app.use('/api/v1', routes);
  app.use(invalidUrl);
};
