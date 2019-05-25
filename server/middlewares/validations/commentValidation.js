import Joi from 'joi';

import validate from './validateInput';

const commentValid = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    comment: Joi.string().min(1).max(500).required(),
    question_id: Joi.number().required(),
  });

  Joi.validate(data, schema, (err) => {
    validate(err, res, next);
  });
};

export default commentValid;
