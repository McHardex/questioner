import * as db from '../startup/db/db';

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
      data: db.meetupDb,
    });
  }

  static getAllRsvps(req, res) {
    res.status(200).send({
      status: 200,
      data: db.rsvpDb,
    });
  }

  static getAllQuestions(req, res) {
    res.status(200).send({
      status: 200,
      data: db.questionDb,
    });
  }
}

export default getAllEndpoints;
