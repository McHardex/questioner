/* eslint-disable consistent-return */

import Helper from '../../controllers/Helpers';

function signupValidation(req, res, next) {
  if (!req.body.password) {
    res.status(400).send({
      status: 400,
      error: 'Password is required',
    });
  }

  if (req.body.password.trim().length < 6) {
    res.status(400).send({
      status: 400,
      error: 'Password length must be greater than 5',
    });
  }

  if (!Helper.isValidEmail(req.body.email)) {
    res.status(400).send({
      status: 400,
      error: 'Please enter a valid email address',
    });
  }

  if (!req.body.email) {
    res.status(400).send({
      status: 400,
      error: 'Email is required',
    });
  }

  if (!req.body.firstname || req.body.firstname.trim().length < 2) {
    res.status(400).send({
      status: 400,
      error: 'Firstname is required',
    });
  }

  if (!req.body.lastname || req.body.lastname.trim().length < 2) {
    res.status(400).send({
      status: 400,
      error: 'Lastname is required',
    });
  }

  if (!req.body.othername || req.body.othername.trim().length < 2) {
    res.status(400).send({
      status: 400,
      error: 'Othername is required',
    });
  }

  if (!req.body.phoneNumber) {
    res.status(400).send({
      status: 400,
      error: 'Phone number is required',
    });
  }

  if (req.body.phoneNumber.trim().length < 11) {
    res.status(400).send({
      status: 400,
      error: 'phoneNumber length must be greater than 10',
    });
  }

  if (!req.body.username || req.body.username.trim().length < 2) {
    res.status(400).send({
      status: 400,
      error: 'Username is required',
    });
  }

  next();
}

export default signupValidation;
