/* eslint-disable consistent-return */
import { Client } from 'pg';

import dotenv from 'dotenv';

import connectionString from '../config';

dotenv.config();

const client = new Client(connectionString);
client.connect();

class QuestionController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllQuestions(req, res) {
    client.query('SELECT * FROM asknow ORDER by id ASC', (error, results) => {
      if (results.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No meetup record found',
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static createQuestion(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1',
      [req.body.meetup_id],
      (error, results) => {
        if (results.rows === undefined || results.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'meetup does not exist',
          });
        }
        client.query('INSERT INTO asknow (createdby, title, body, meetup_id) VALUES ($1, $2, $3, $4) RETURNING *',
          [req.user, req.body.title, req.body.body, req.body.meetup_id],
          (err, response) => {
            if (err) return res.status(403).json({ status: 403, error: err });
            res.status(201).json({
              status: 201,
              data: [{
                createdby: response.rows[0].createdby,
                meetup_id: results.rows[0].id,
                title: response.rows[0].title,
                body: response.rows[0].body,
              }],
            });
          });
      });
  }

  static upvoteQuestion(req, res) {
    client.query('SELECT * FROM asknow WHERE id = $1', [req.params.question_id], (err, resp) => {
      if (err) res.status(403).json({ status: 403, error: err });
      client.query(`UPDATE asknow SET upvote = upvote + 1 WHERE id = ${req.params.question_id}`, (error, response) => {
        if (error || response.rowCount < 1) {
          res.status(404).json({
            status: 404,
            error: 'Unable to upvote! No question found',
          });
        } else {
          res.status(200).json({
            status: 200,
            data: [{
              title: resp.rows[0].title,
              body: resp.rows[0].body,
              upvote: resp.rows[0].upvote += 1,
            }],
          });
        }
      });
    });
  }

  static downvoteQuestion(req, res) {
    client.query('SELECT * FROM asknow WHERE id = $1', [req.params.question_id], (err, resp) => {
      if (err) res.status(403).json({ status: 403, error: err });
      client.query(`UPDATE asknow SET downvote = downvote + 1 WHERE id = ${req.params.question_id}`, (error, response) => {
        if (error || response.rowCount < 1) {
          res.status(404).json({
            status: 404,
            error: 'Unable to downvote! No question found',
          });
        } else {
          res.status(200).send({
            status: 200,
            data: [{
              title: resp.rows[0].title,
              body: resp.rows[0].body,
              downvote: resp.rows[0].downvote += 1
            }],
          });
        }
      });
    });
  }
}

export default QuestionController;
