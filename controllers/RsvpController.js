/* eslint-disable consistent-return */

import meetupDb from '../models/meetupDb';

import rsvpDb from '../models/rsvpDb';

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
    const meetup = meetupDb[req.params.meetup_id];

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
