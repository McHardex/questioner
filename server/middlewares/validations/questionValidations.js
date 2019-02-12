import Joi from 'joi';

import validate from './validateInput';

const createQuestion = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    title: Joi.string().min(10).required(),
    meetup_id: Joi.number().required(),
    body: Joi.string().min(20).max(100).required(),
  });

  Joi.validate(data, schema, (err) => {
    validate(err, res, next);
  });
};

export default createQuestion;
