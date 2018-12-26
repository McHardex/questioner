import db from '../startup/db/db';

const {
  meetupDb, rsvpDb, questionDb, votesDb,
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

  static upvote(req, res) {
    const specificQuestion = questionDb[req.params.question_id];

    const question = {
      meetupId: 1,
      title: specificQuestion.title,
      body: specificQuestion.body,
      votes: specificQuestion.votes += 1,
    };

    votesDb.push(question);
    res.status(200).send({
      status: 200,
      data: [question],
    });
  }

  static downvote(req, res) {
    const specificQuestion = questionDb[req.params.question_id];

    const question = {
      meetupId: 1,
      title: specificQuestion.title,
      body: specificQuestion.body,
      votes: specificQuestion.votes -= 1,
    };

    votesDb.push(question);
    res.status(200).send({
      status: 200,
      data: [question],
    });
  }
}

export default getAllEndpoints;
