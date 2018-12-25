import express from 'express';
import db from '../startup/db/db';

const router = express.Router();

router.get('/rsvps', (req, res) => {
  res.status(200).send({
    status: 200,
    data: db.rsvpDb,
  });
});

router.post('/meetups/:meetup_id/rsvps', async (req, res) => {
  const meetup = await db.meetupDb[req.params.meetup_id];
  if (!meetup) return res.status(404).send({ message: 'meetup does not exist' });

  if (!req.body.status) return res.status(400).send({ message: 'Please let us know if you will be coming' });

  const rsvp = {
    meetup_id: req.params.meetup_id,
    topic: meetup.title,
    status: req.body.status,
  };

  await db.rsvpDb.push(rsvp);
  return res.status(201).send({
    status: 201,
    data: [rsvp],
  });
});

export default router;
