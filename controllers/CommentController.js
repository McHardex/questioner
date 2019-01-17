/* eslint-disable consistent-return */

import { Client } from 'pg';

import dotenv from 'dotenv';

import connectionString from '../config';

dotenv.config();

const client = new Client(connectionString);
client.connect();

class CommentController {
  /**
   * @description - enables users comment on questions
   * @param {Object} req - api request
   * @param {Object} res - route response
   * @returns {json} question details and the comment
  */

  static comment(req, res) {
    client.query('SELECT * FROM asknow WHERE id = $1',
      [req.body.question_id],
      (error, results) => {
        if (results.rows === undefined || results.rows.length === 0) {
          res.status(404).json({
            status: 404,
            error: 'question does not exist',
          });
        }
        client.query('INSERT INTO asknow (comment, question_id) VALUES ($1, $2) RETURNING *',
          [req.body.comment, req.body.question_id],
          (err, response) => {
            if (err) throw err;
            return res.status(201).json({
              status: 201,
              data: [{
                question_id: results.rows[0].id,
                title: results.rows[0].title,
                body: results.rows[0].body,
                comment: response.rows[0].comment,
              }],
            });
          });
      });
  }
}

export default CommentController;
