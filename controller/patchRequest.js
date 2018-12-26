import db from '../startup/db/db';

const {
  questionDb, votesDb,
} = db;

class patch {
  /**
   * @description - Get patch req
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */

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

export default patch;
