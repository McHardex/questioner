/* eslint-disable import/named */

import { client } from '../config';

class CommentController {
  /**
   * @description - enables users comment on questions
   * @param {Object} req - api request
   * @param {Object} res - route response
   * @returns {json} question details and the comment
  */

  static getAllComments(req, res) {
    client.query(`SELECT createdby, title, votes, meetup_id, a.id,  AS comment
      FROM comments c
      LEFT OUTER JOIN asknow a ON a.id = c.question_id
      GROUP BY (a.createdby, a.title, a.votes, a.meetup_id, a.id)`, (error, results) => {
      if (error) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
      return results;
    });
  }

  static getSpecificUserComment(req, res) {
    client.query('SELECT * from comments WHERE user_id = $1', [req.params.user_id], (error, results) => {
      if (error) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      if (results.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'user does not exist',
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
      return results;
    });
  }

  static comment(req, res) {
    client.query('SELECT * FROM asknow WHERE id = $1',
      [req.body.question_id],
      (error, results) => {
        if (error) {
          res.status(403).json({
            status: 403,
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
              error: 'No question with the given id found',
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
