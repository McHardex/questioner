/* eslint-disable consistent-return */

import db from '../../startup/db/db';

const { meetupDb } = db;

function createRsvpValidation(req, res, next) {
  const meetup = meetupDb[req.params.meetup_id];
  if (!meetup) return res.status(404).send({ status: 404, error: 'meetup does not exist' });
  if (!req.body.status) return res.status(400).send({ status: 400, error: 'Input your status. Let us know if you will be coming' });

  next();
}

export default createRsvpValidation;
