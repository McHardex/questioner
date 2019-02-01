/* eslint-disable consistent-return */

import Helper from '../../controllers/helpers/Helpers';

const signupValidation = (req, res, next) => {
  if (!Helper.isValidEmail(req.body.email.trim())) {
    return res.status(400).send({
      status: 400,
      error: 'Please enter a valid email address',
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      status: 400,
      error: 'Email is required',
    });
  }

  if (!req.body.firstname) {
    return res.status(400).send({
      status: 400,
      error: 'Firstname is required',
    });
  }

  if (!req.body.lastname || req.body.lastname.trim() < 2) {
    return res.status(400).send({
      status: 400,
      error: 'Lastname is required',
    });
  }

  if (!req.body.othername || req.body.othername.trim() < 2) {
    return res.status(400).send({
      status: 400,
      error: 'Othername is required',
    });
  }

  if (!req.body.phoneNumber || req.body.phoneNumber.trim() < 2) {
    return res.status(400).send({
      status: 400,
      error: 'Phone number is required',
    });
  }

  if (!req.body.username || req.body.phoneNumber.trim() < 2) {
    return res.status(400).send({
      status: 400,
      error: 'Username is required',
    });
  }

  if (!req.body.password || req.body.phoneNumber.trim() < 2) {
    return res.status(400).send({
      status: 400,
      error: 'Password is required',
    });
  }

  next();
};

export default signupValidation;
