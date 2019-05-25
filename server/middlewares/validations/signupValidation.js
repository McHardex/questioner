import Joi from 'joi';

import validate from './validateInput';

const signupValidation = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(30),
    lastname: Joi.string().min(3).max(30),
    othername: Joi.string().min(3).max(30),
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    phoneNumber: Joi.string().min(11),
    isAdmin: Joi.boolean(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match',
          },
        },
      }),
  });

  Joi.validate(data, schema, (err) => {
    validate(err, res, next);
  });
};

export default signupValidation;
