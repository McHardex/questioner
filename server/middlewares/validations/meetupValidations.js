/* eslint-disable consistent-return */
import Joi from 'joi';

const createMeetupValidation = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().min(10).required(),
    location: Joi.string().min(3).required(),
    happeningOn: Joi.date().iso().required().label('date must be in this format: yyyy-mm-dd or yyyy/mm/dd'),
    tags: Joi.array().length(3).required(),
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

export default createMeetupValidation;
