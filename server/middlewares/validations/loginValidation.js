import Joi from 'joi';

const loginValidation = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
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

export default loginValidation;
