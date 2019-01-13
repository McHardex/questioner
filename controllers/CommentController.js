/* eslint-disable consistent-return */

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DB_URL });

class CommentController {
  /**
   * @description - enables users comment on questions
   * @param {Object} req - api request
   * @param {Object} res - route response
   * @returns {json} question details and the comment
  */

  static comment(req, res) {
    pool.query('SELECT * FROM questions WHERE id = $1',
      [req.body.question_id],
      (error, results) => {
        if (results.rows === undefined || results.rows.length === 0) {
          return res.status(404).send({
            status: 404,
            error: 'question does not exist',
          });
        }
        pool.query('INSERT INTO comments (comment, question_id) VALUES ($1, $2) RETURNING *',
          [req.body.comment, req.body.question_id],
          (err, response) => {
            if (err) throw err;
            return res.status(201).send({
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
