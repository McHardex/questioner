/* eslint-disable consistent-return */
const createQuestion = (req, res, next) => {
  if (!req.body.title) return res.status(400).send({ status: 400, error: 'title is required' });
  if (!req.body.meetup_id) return res.status(400).send({ status: 400, error: 'meetup id is required' });
  if (!req.body.body) return res.status(400).send({ status: 400, error: 'body is required' });
  if (req.body.title.trim().length < 10) return res.status(400).send({ status: 400, error: 'title length must be greater than 10' });
  if (req.body.body.trim().length < 30) return res.status(400).send({ status: 400, error: 'body length must be greater than 30' });

  next();
};

export default createQuestion;
