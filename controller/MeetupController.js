/* eslint-disable consistent-return */

import db from '../startup/db/db';

const { meetupDb } = db;

const isValidDate = (dateString) => {
  const regEx = /^\d{2}-\d{2}-\d{4}$/;
  return dateString.match(regEx) != null;
};

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
    const newArray = await meetupDb.filter(result => new Date(result.happeningOn.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) > Date.now());
    if (newArray === undefined || newArray.length === 0) return res.status(404).send({ message: 'there are no upcoming meetups' });

    res.status(200).send({
      status: 200,
      data: newArray,
    });
  }

  static async getSpecificMeetupRecord(req, res) {
    const meetup = await meetupDb[req.params.id];
    if (!meetup) return res.status(400).send({ message: `Unable to fetch meetup with id of ${req.params.id}` });

    res.status(200).send({
      status: 200,
      data: meetup,
    });
  }

  static async createMeetup(req, res) {
    if (!req.body.title) return res.status(400).send({ message: 'title is required' });
    if (req.body.title.trim().length < 5) return res.status(400).send({ message: 'title length must be greater than 5' });

    if (!req.body.location) return res.status(400).send({ message: 'location is required' });
    if (req.body.location.trim().length < 3) return res.status(400).send({ message: 'location length must be greater than 3' });

    if (!req.body.happeningOn) return res.status(400).send({ message: 'date happeningOn is required' });
    if (!isValidDate(req.body.happeningOn)) return res.status(400).send({ message: 'the date must be in this format: mm-dd-yyy' });

    if (!req.body.tags) return res.status(400).send({ message: 'tags is required' });
    if (req.body.tags.length < 3) return res.status(400).send({ message: 'tags length must be greater than 3' });


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
