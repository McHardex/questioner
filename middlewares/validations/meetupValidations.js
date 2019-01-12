/* eslint-disable consistent-return */

import meetupDb from '../../models/meetupDb';

const isValidDate = (dateString) => {
  const regEx = /^\d{2}[-/]\d{2}[-/]\d{4}$/;
  return dateString.match(regEx) != null;
};

export function createMeetup(req, res, next) {
  if (!req.body.title) return res.status(400).send({ status: 400, error: 'title is required' });
  if (req.body.title.trim().length < 5) return res.status(400).send({ status: 400, error: 'title length must be greater than 5' });

  if (!req.body.location) return res.status(400).send({ status: 400, error: 'location is required' });
  if (req.body.location.trim().length < 3) return res.status(400).send({ status: 400, error: 'location length must be greater than 3' });

  if (!req.body.happeningOn) return res.status(400).send({ status: 400, error: 'date is required' });
  if (!isValidDate(req.body.happeningOn)) return res.status(400).send({ status: 400, error: 'happeningOn date must be in this format: mm-dd-yyy or mm/dd/yy' });

  if (!req.body.tags) return res.status(400).send({ status: 400, error: 'tags is required' });
  if (req.body.tags.length < 3) return res.status(400).send({ status: 400, error: 'Please add a minimum of three(3) tags' });

  const meetup = meetupDb.find(result => result.title === req.body.title);
  if (meetup) return res.status(409).send({ status: 409, error: 'A meetup with this title already exists. Please input another title' });

  next();
}

export function upcomingMeetups(req, res, next) {
  const newArray = meetupDb.filter(result => new Date(result.happeningOn.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) > Date.now());
  if (newArray === undefined || newArray.length === 0) return res.status(404).send({ status: 404, error: 'there are no upcoming meetups' });

  next();
}

export function specificMeetup(req, res, next) {
  const meetup = meetupDb[req.params.id];
  if (!meetup) return res.status(400).send({ status: 400, error: `Unable to fetch meetup with id of ${req.params.id}` });

  next();
}
