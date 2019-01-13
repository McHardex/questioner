/* eslint-disable consistent-return */

import questionDb from '../models/questionDb';

import votesDb from '../models/votesDb';

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DB_URL });

class QuestionController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllQuestions(req, res) {
    pool.query('SELECT * FROM questions ORDER by id ASC', (error, results) => {
      if (error) throw error;
      return res.status(200).send({
        status: 200,
        data: results.rows,
      });
    });
  }

  static async createQuestion(req, res) {
    pool.query('SELECT * FROM meetups WHERE id = $1',
      [req.body.meetup_id],
      (error, results) => {
        if (results.rows === undefined || results.rows.length === 0) {
          return res.status(404).send({
            status: 404,
            error: 'meetup does not exist',
          });
        }

        pool.query('INSERT INTO questions (title, body, meetup_id) VALUES ($1, $2, $3) RETURNING *',
          [req.body.title, req.body.body, req.body.meetup_id],
          (err, response) => {
            if (err) throw err;
            return res.status(201).send({
              status: 201,
              data: [{
                createdBy: req.user.id,
                meetup_id: results.rows[0].id,
                title: response.rows[0].title,
                body: response.rows[0].body,
              }],
            });
          });
      });
  }

  static async upvoteQuestion(req, res) {
    const specificQuestion = questionDb[req.params.question_id];

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
    const specificQuestion = questionDb[req.params.question_id];

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
