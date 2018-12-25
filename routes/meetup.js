import express from 'express';
import db from '../startup/db/db';

const router = express.Router();

router.get('/meetups', (req, res) => {
  res.status(200).send({
    status: 200,
    data: db.meetupDb,
  });
});

router.get('/meetups/upcoming', async (req, res) => {
  const newArray = await db.meetupDb.filter(result => result.happeningOn > Date.now());
  if (newArray === undefined || newArray.length === 0) return res.status(400).send({ message: 'there is no upcoming meetups' });

  return res.status(200).send({
    status: 200,
    data: newArray,
  });
});

router.get('/meetups/:id', async (req, res) => {
  const meetup = await db.meetupDb[req.params.id];
  if (!meetup) return res.status(400).send({ message: `Unable to fetch meetup with id of ${req.params.id}` });

  return res.status(200).send({
    status: 200,
    data: meetup,
  });
});

router.post('/meetups', async (req, res) => {
  if (!req.body.topic) return res.status(400).send({ message: 'topic is required' });
  if (!req.body.location) return res.status(400).send({ message: 'location is required' });
  if (!req.body.happeningOn) return res.status(400).send({ message: 'date happeningOn is required' });
  if (!req.body.tags) return res.status(400).send({ message: 'tags is required' });

  const meetup = {
    id: db.length,
    topic: req.body.topic,
    location: req.body.location,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };

  await db.meetupDb.push(meetup);
  return res.status(201).send({
    status: 201,
    data: [meetup],
  });
});

export default router;
