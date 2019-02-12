import Joi from 'joi';

const signupValidation = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(30)
      .required(),
    lastname: Joi.string().min(3).max(30)
      .required(),
    othername: Joi.string().min(3).max(30)
      .required(),
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    phoneNumber: Joi.string().min(11)
      .required(),
    isAdmin: Joi.boolean(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  });

  Joi.validate(data, schema, (err) => {
    if (err) {
      res.status(422).json({
        status: '422',
        error: err.details[0].message.split('"').join(''),
      });
    } else {
      next();
    }
  });
};

export default signupValidation;
