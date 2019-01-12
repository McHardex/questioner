/* eslint-disable consistent-return */

import questionDb from '../../models/questionDb';

export function createQuestion(req, res, next) {
  if (!req.body.title) return res.status(400).send({ status: 400, error: 'title is required' });
  if (!req.body.body) return res.status(400).send({ status: 400, error: 'body is required' });
  if (req.body.title.trim().length < 10) return res.status(400).send({ status: 400, error: 'title length must be greater than 10' });
  if (req.body.body.trim().length < 30) return res.status(400).send({ status: 400, error: 'body length must be greater than 30' });

  next();
}

export function upvoteQuestion(req, res, next) {
  const specificQuestion = questionDb[req.params.question_id];
  if (!specificQuestion) return res.status(422).send({ status: 422, error: `no question with id of ${req.params.question_id} found` });

  next();
}

export function downvoteQuestion(req, res, next) {
  const specificQuestion = questionDb[req.params.question_id];
  if (!specificQuestion) return res.status(422).send({ status: 422, error: `no question with id of ${req.params.question_id} found` });

  next();
}
