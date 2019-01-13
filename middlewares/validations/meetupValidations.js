/* eslint-disable consistent-return */

import meetupDb from '../../models/meetupDb';

const isValidDate = (dateString) => {
  const regEx = /^\d{2}[-/]\d{2}[-/]\d{4}$/;
  return dateString.match(regEx) != null;
};

export function createMeetup(req, res, next) {
  if (!req.body.topic) return res.status(400).send({ status: 400, error: 'topic is required' });
  if (req.body.topic.trim().length < 5) return res.status(400).send({ status: 400, error: 'topic length must be greater than 5' });

  if (!req.body.location) return res.status(400).send({ status: 400, error: 'location is required' });
  if (req.body.location.trim().length < 3) return res.status(400).send({ status: 400, error: 'location length must be greater than 3' });

  if (!req.body.happeningOn) return res.status(400).send({ status: 400, error: 'date is required' });
  if (!isValidDate(req.body.happeningOn)) return res.status(400).send({ status: 400, error: 'happeningOn date must be in this format: mm-dd-yyy or mm/dd/yy' });

  if (!req.body.tags) return res.status(400).send({ status: 400, error: 'tags is required' });
  if (req.body.tags.length < 3) return res.status(400).send({ status: 400, error: 'Please add a minimum of three(3) tags' });

  next();
}

export function specificMeetup(req, res, next) {
  const meetup = meetupDb[req.params.id];
  if (!meetup) return res.status(400).send({ status: 400, error: `Unable to fetch meetup with id of ${req.params.id}` });

  next();
}
