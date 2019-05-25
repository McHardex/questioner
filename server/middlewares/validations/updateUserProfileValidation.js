import Joi from 'joi';

import validate from './validateInput';

const updateUserProfileValidation = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(30),
    lastname: Joi.string().min(3).max(30),
    othername: Joi.string().min(3).max(30),
    username: Joi.string().alphanum().min(3).max(30),
    phoneNumber: Joi.string().min(11),
  });

  Joi.validate(data, schema, (err) => {
    validate(err, res, next);
  });
};

export default updateUserProfileValidation;
