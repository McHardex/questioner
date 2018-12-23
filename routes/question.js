const express = require('express');

const router = express.Router();

const db = require('../startup/db/questionDb');
const votesDb = require('../startup/db/votes');

router.get('/questions', (req, res) => {
  res.status(200).send({
    status: 200,
    data: db,
  });
});

router.post('/questions', async (req, res) => {
  if (!req.body.title) return res.status(400).send({ message: 'title is required' });
  if (!req.body.body) return res.status(400).send({ message: 'body is required' });

  const question = {
    userId: 1,
    meetupId: 1,
    title: req.body.title,
    body: req.body.body,
  };

  await db.push(question);
  return res.status(201).send({
    status: 201,
    data: [question],
  });
});

router.patch('/questions/:question_id/upvote', async (req, res) => {
  const specificQuestion = await db[req.params.question_id];

  const question = {
    meetupId: 1,
    title: specificQuestion.title,
    body: specificQuestion.body,
    votes: votesDb.length + 1,
  };

  await votesDb.push(question);
  return res.status(200).send({
    status: 200,
    data: [question],
  });
});

module.exports = router;
