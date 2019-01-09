/* eslint-disable consistent-return */

import db from '../startup/db/db';

const { rsvpDb, meetupDb } = db;

class RsvpController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */

  static getAllRsvps(req, res) {
    res.status(200).send({
      status: 200,
      data: rsvpDb,
    });
  }

  static async createRsvp(req, res) {
    const meetup = await meetupDb[req.params.meetup_id];
    if (!meetup) return res.status(404).send({ message: 'meetup does not exist' });

    if (!req.body.status) return res.status(400).send({ message: 'Please let us know if you will be coming' });

    const rsvp = {
      meetup_id: req.params.meetup_id,
      topic: meetup.title,
      status: req.body.status,
    };

    await rsvpDb.push(rsvp);
    res.status(201).send({
      status: 201,
      data: [rsvp],
    });
  }
}

export default RsvpController;
