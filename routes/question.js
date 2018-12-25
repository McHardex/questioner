import express from 'express';
import db from '../startup/db/db';

const router = express.Router();

router.get('/questions', (req, res) => {
  res.status(200).send({
    status: 200,
    data: db.questionDb,
  });
});

router.post('/questions', async (req, res) => {
  if (!req.body.title) return res.status(400).send({ message: 'title is required' });
  if (!req.body.body) return res.status(400).send({ message: 'body is required' });

  const question = {
    userId: 1,
    meetupId: 1,
    createdOn: new Date(),
    title: req.body.title,
    body: req.body.body,
    votes: 0,
  };

  await db.questionDb.push(question);
  return res.status(201).send({
    status: 201,
    data: [question],
  });
});

router.patch('/questions/:question_id/upvote', async (req, res) => {
  const specificQuestion = await db.questionDb[req.params.question_id];

  const question = {
    meetupId: 1,
    title: specificQuestion.title,
    body: specificQuestion.body,
    votes: specificQuestion.votes += 1,
  };

  await db.votesDb.push(question);
  return res.status(200).send({
    status: 200,
    data: [question],
  });
});

router.patch('/questions/:question_id/downvote', async (req, res) => {
  const specificQuestion = await db.questionDb[req.params.question_id];

  const question = {
    meetupId: 1,
    title: specificQuestion.title,
    body: specificQuestion.body,
    votes: specificQuestion.votes -= 1,
  };

  await db.votesDb.push(question);
  return res.status(200).send({
    status: 200,
    data: [question],
  });
});

export default router;
