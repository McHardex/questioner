/* eslint-disable consistent-return */

import db from '../startup/db/db';

const { questionDb, votesDb } = db;

const meetupId = 1;

class QuestionController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllQuestions(req, res) {
    res.status(200).send({
      status: 200,
      data: questionDb,
    });
  }

  static async createQuestion(req, res) {
    if (!req.body.title) return res.status(400).send({ message: 'title is required' });
    if (!req.body.body) return res.status(400).send({ message: 'body is required' });

    const question = {
      userId: 1,
      meetupId,
      createdOn: new Date(),
      title: req.body.title,
      body: req.body.body,
      votes: 0,
    };

    await questionDb.push(question);
    res.status(201).send({
      status: 201,
      data: [question],
    });
  }

  static async upvoteQuestion(req, res) {
    const specificQuestion = await questionDb[req.params.question_id];
    if (!specificQuestion) return res.status(422).send({ message: `no question with id of ${req.params.question_id} found` });

    const question = {
      meetupId: 1,
      title: specificQuestion.title,
      body: specificQuestion.body,
      votes: specificQuestion.votes += 1,
    };

    await votesDb.push(question);
    res.status(200).send({
      status: 200,
      data: [question],
    });
  }

  static async downvoteQuestion(req, res) {
    const specificQuestion = await questionDb[req.params.question_id];
    if (!specificQuestion) return res.status(422).send({ message: `no question with id of ${req.params.question_id} found` });

    const question = {
      meetupId: 1,
      title: specificQuestion.title,
      body: specificQuestion.body,
      votes: specificQuestion.votes -= 1,
    };

    await votesDb.push(question);
    res.status(200).send({
      status: 200,
      data: [question],
    });
  }
}

export default QuestionController;
