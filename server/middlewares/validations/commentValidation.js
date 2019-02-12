import Joi from 'joi';

const commentValid = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    comment: Joi.string().min(1).max(100).required(),
    question_id: Joi.number().required(),
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

export default commentValid;
