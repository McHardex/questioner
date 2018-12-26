import db from '../startup/db/db';

const {
  meetupDb, rsvpDb, questionDb,
} = db;

class getAllEndpoints {
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

  static getAllRsvps(req, res) {
    res.status(200).send({
      status: 200,
      data: rsvpDb,
    });
  }

  static getAllQuestions(req, res) {
    res.status(200).send({
      status: 200,
      data: questionDb,
    });
  }
}

export default getAllEndpoints;
