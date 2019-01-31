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

  // (SELECT question_id, string_agg(comment, '...<br /> ') AS comment
  // FROM comments GROUP BY question_id)

  static getAllComments(req, res) {
    client.query(`SELECT createdby, title, upvote, downvote, meetup_id, a.id, COALESCE(string_agg(comment, '...<br />'), 'Be the first to comment') AS comment
      FROM comments c
      FULL JOIN asknow a ON a.id = c.question_id
      GROUP BY (a.createdby, a.title, a.upvote, a.downvote, a.meetup_id, a.id)`, (error, results) => {
      if (error) {
        return res.status(404).json({
          status: 404,
          error,
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static getSpecificUserComment(req, res) {
    client.query(`SELECT * from comments WHERE user_id = $1`, [req.params.user_id], (error, results) => {
      if (error) {
        return res.status(404).json({
          status: 404,
          error,
        });
      }
      if (results.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'user does not exist'
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static comment(req, res) {
    client.query('SELECT * FROM asknow WHERE id = $1',
      [req.body.question_id],
      (error, results) => {
        if (error) {
          res.status(409).json({
            status: 409,
            error,
          });
        }
        client.query(`INSERT INTO comments (user_id, comment, question_id)
        VALUES ($1, $2, $3) RETURNING *`,
        [req.user, req.body.comment, req.body.question_id],
        (err, response) => {
          if (err) {
            res.status(404).json({
              status: 404,
              error: 'question does not exist',
            });
          } else {
            res.status(201).json({
              status: 201,
              data: [{
                user_id: response.rows[0].user_id,
                question_id: req.body.question_id,
                title: results.rows[0].title,
                body: results.rows[0].body,
                comment: response.rows[0].comment,
              }],
            });
          }
        });
      });
  }
}

export default CommentController;
