/* eslint-disable consistent-return */

import db from '../startup/db/db';

const { meetupDb } = db;

const isValidDate = (dateString) => {
  const regEx = /^\d{2}-\d{2}-\d{4}$/;
  return dateString.match(regEx) != null;
};

function validateCreateMeetup(req, res, next) {
  if (!req.body.title) return res.status(400).send({ message: 'title is required' });
  if (req.body.title.trim().length < 5) return res.status(400).send({ message: 'title length must be greater than 5' });

  if (!req.body.location) return res.status(400).send({ message: 'location is required' });
  if (req.body.location.trim().length < 3) return res.status(400).send({ message: 'location length must be greater than 3' });

  if (!req.body.happeningOn) return res.status(400).send({ message: 'date happeningOn is required' });
  if (!isValidDate(req.body.happeningOn)) return res.status(400).send({ message: 'the date must be in this format: mm-dd-yyy' });

  if (!req.body.tags) return res.status(400).send({ message: 'tags is required' });
  if (req.body.tags.length < 3) return res.status(400).send({ message: 'Please add a minimum of three(3) tags' });

  const meetup = meetupDb.find(result => result.title === req.body.title);
  if (meetup) return res.status(409).send({ message: 'A meetup with this title already exists. Please input another title' });

  next();
}

export default validateCreateMeetup;
