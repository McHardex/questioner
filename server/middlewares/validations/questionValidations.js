import Joi from 'joi';

const createQuestion = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    title: Joi.string().min(10).required(),
    meetup_id: Joi.number().required(),
    body: Joi.string().min(20).max(100).required(),
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

export default createQuestion;
