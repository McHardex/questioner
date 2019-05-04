import Joi from 'joi';

import validate from './validateInput';

const createMeetupValidation = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().min(10).required(),
    location: Joi.string().min(3).required(),
    happeningOn: Joi.date().iso().required().label('date must be in this format: yyyy-mm-dd or yyyy/mm/dd'),
    tags: Joi.array().length(3).max(5).required(),
  });

  Joi.validate(data, schema, (err) => {
    validate(err, res, next);
  });
};

export default createMeetupValidation;
