const express = require('express');

const db = require('../startup/db');

const router = express.Router();

router.get('/meetups', (req, res) => {
  res.status(200).send({
    status: 200,
    data: db,
  });
});

router.get('/meetups/:id', (req, res) => {
  const meetup = db[req.params.id];
  if (!meetup) return res.status(400).send({ message: `Unable to fetch meetup with id of ${req.params.id}`});
  res.status(200).send({
    status: 200,
    data: meetup,
  });
});

router.post('/meetups', (req, res) => {
  if (!req.body.topic) {
    res.status(400).send({
      success: false,
      message: 'topic is required',
    });
  } else if (!req.body.location) {
    res.status(400).send({
      success: false,
      message: 'location is required',
    });
  } else if (!req.body.happeningOn) {
    res.status(400).send({
      success: false,
      message: 'date happeningOn is required',
    });
  } else if (!req.body.tags) {
    res.status(400).send({
      success: false,
      message: 'tags is required',
    });
  }

  const meetup = {
    id: db.length + 1,
    topic: req.body.topic,
    location: req.body.location,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };

  db.push(meetup);
  return res.status(201).send({
    status: 201,
    data: [meetup],
  });
});

module.exports = router;
