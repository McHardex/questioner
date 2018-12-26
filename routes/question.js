/* eslint-disable consistent-return */

import express from 'express';
import db from '../startup/db/db';
import getEndpointControllers from '../controller/getAllEndpoint';

const router = express.Router();
const meetupId = 1;

router.get('/questions', getEndpointControllers.getAllQuestions);

router.post('/questions', async (req, res) => {
  if (!req.body.title) return res.status(400).send({ message: 'title is required' });
  if (!req.body.body) return res.status(400).send({ message: 'body is required' });

  const question = {
    userId: 1,
    meetupId,
    createdOn: new Date(),
    title: req.body.title,
    body: req.body.body,
    votes: 0,
  };

  await db.questionDb.push(question);
  res.status(201).send({
    status: 201,
    data: [question],
  });
});

router.patch('/questions/:question_id/upvote', getEndpointControllers.upvote);

router.patch('/questions/:question_id/downvote', getEndpointControllers.downvote);

export default router;
