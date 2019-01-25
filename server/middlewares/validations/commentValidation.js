/* eslint-disable consistent-return */

const commentValid = (req, res, next) => {
  if (!req.body.comment) return res.status(404).send({ status: 404, error: 'comment is required' });
  if (req.body.comment.trim().length < 2) return res.status(404).send({ status: 404, error: 'comment is required' });
  if (!req.body.question_id) return res.status(404).send({ status: 404, error: 'question id is required' });

  next();
};

export default commentValid;
