/* eslint-disable consistent-return */

import Helper from '../../controllers/helpers/Helpers';

const loginValidation = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).send({
      status: 400,
      error: 'Please ensure to fill all input field',
    });
  }

  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({
      status: 400,
      error: 'Please enter a valid email address',
    });
  }
  next();
};

export default loginValidation;
