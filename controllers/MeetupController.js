/* eslint-disable consistent-return */

import meetupDb from '../models/meetupDb';

class MeetupController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllMeetups(req, res) {
    res.status(200).send({
      status: 200,
      data: meetupDb,
    });
  }

  static async upcomingMeetups(req, res) {
    const newArray = meetupDb.filter(result => new Date(result.happeningOn.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) > Date.now());

    res.status(200).send({
      status: 200,
      data: newArray,
    });
  }

  static async getSpecificMeetupRecord(req, res) {
    const meetup = meetupDb[req.params.id];

    res.status(200).send({
      status: 200,
      data: [meetup],
    });
  }

  static async createMeetup(req, res) {
    const meetup = {
      id: meetupDb.length,
      title: req.body.title,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
      tags: req.body.tags,
    };

    await meetupDb.push(meetup);
    res.status(201).send({
      status: 201,
      data: [meetup],
    });
  }
}

export default MeetupController;
